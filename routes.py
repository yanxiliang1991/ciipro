# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template, flash, session, \
    redirect, url_for, g, send_file, request
from flask_login import login_user, logout_user, current_user, login_required, LoginManager
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sql import passwordRetrieval, usernameRetrieval, passwordReset, send_feedback_email
from CIIProTools import *
from ciipro_config import CIIProConfig
import json
from BioSimLib import *
#import urllib
import zipfile
import sqlalchemy.ext

# TODO: go through each module and identifiy and take out passwords, security crucial information

# These variables are configured in CIIProConfig
# TODO: put all this in a true config file
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = CIIProConfig.UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.secret_key = CIIProConfig.APP_SECRET_KEY
app.config['RECAPTCHA_PRIVATE_KEY'] = CIIProConfig.RECAPTCHA_PRIVATE_KEY



db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


class User(db.Model):
    tablename__ = "users"
    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(20), unique=True, index=True)
    pw_hash = db.Column('password', db.String(10))
    email = db.Column('email', db.String(50), unique=True, index=True)
    
    def __init__(self, username, password, email):
        self.username = username
        self.set_password(password)
        self.email = email
        
    def set_password(self, password):
        self.pw_hash = generate_password_hash(password, method='pbkdf2:sha1', 
                                              salt_length=8)
        
    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)
        
    def is_authenticated(self):
        return True
        
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False
        
    def get_id(self):
        return str(self.id)
        
    def __repr__(self):
        return '<User %r>' % (self.username)
        
############# flask_login ###################
#
# these methods pertain to the flask_login
# functionality
#

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

@app.before_request
def before_request():
    g.user = current_user
    #g.datasets = [ds for ds in os.listdir(session['cmp_fldr'])]
    #g.testsets = [ts for ts in os.listdir(session['tst_fldr'])]

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    username = request.form['username'].strip()
    password = request.form['password'].strip()
    registered_user = User.query.filter_by(username=username).first()

    if registered_user is None:
        flash('Username does not exist', 'danger')
        return redirect(url_for('login'))

    if registered_user.check_password(password) == False:
        flash('Password does not match user', 'danger')
        return redirect(url_for(''))

    login_user(registered_user)
    load_user_session()

    username = g.user.username
    load_user_session()
    flash('Logged in successfully', 'info')
    return redirect(request.args.get('next') or url_for('home'))


@app.route('/logout')
@login_required
def logout():
    """ Logs out user and returns them to the homepage.

    """

    session.pop('compound_file', None)
    logout_user()
    flash('Logged out successfully')
    return redirect(url_for('home'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    """ Registers a new user.  checkRecaptcha() must return True to register user.
        Upon successful registration, creates root directory. And four subdirectory folders:

            Username
               ├───compounds
               ├───biosims
               ├───profiles
               └───converter
    """
    if request.method == 'GET':
        return render_template('register.html')

    try:
        user = User(request.form['username'], request.form['password'], request.form['email'])
    except sqlalchemy.exc.IntegrityError as e:
        flash('Sorry, either user exists with that username or email.', 'danger')
    recaptcha = request.form['g-recaptcha-response']
    if checkRecaptcha(recaptcha, CIIProConfig.SECRET_KEY):
        db.session.add(user)
        db.session.commit()
        directory = CIIProConfig.UPLOAD_FOLDER + '/' + str(user.username)
        if not os.path.exists(directory):
            os.makedirs(directory)
            sub_folders = ["compounds", "biosims", "profiles", "converter", "test_sets", "NNs"]
            for sf in sub_folders:
                sub_directory = directory + '/' + sf
                os.makedirs(sub_directory)
        flash('User successfully registered')
    else:
        flash('Registration failed', 'danger')
    return redirect(url_for('login'))


############# Page Renderers ###################
#
# these methods just render static pages on
# the ciipro site

@app.route('/') 
def home():
    return render_template('home.html')

@app.route('/tutorial')
def tutorial():
    return render_template('tutorial.html')

@app.route('/sendbiopro')
def sendbiopro():
    return render_template('StatsGlossary.html')

@app.route('/sendbiosim')
def sendbiosim():
    return send_file('tutorial_samples/BioSim.txt', as_attachment=True)

@app.route('/sendbioconf')
def sendbiosimconf():
    return send_file('tutorial_samples/BioSim_Conf.txt', as_attachment=True)

@app.route('/sendbionn')
def sendbionn():
    return send_file('tutorial_samples/Bioneighbor.txt', as_attachment=True)

@app.route('/sendactivity')
def sendactivity():
    return send_file('tutorial_samples/Activity.txt', as_attachment=True)

@app.route('/sendbiopred')
def sendbiopred():
    return send_file('tutorial_samples/BioPred.txt', as_attachment=True)

@app.route('/statsglossary')
def statsglossary():
    return render_template('statsglossary.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

def checkRecaptcha(response, secretkey):
    """ Checks the response to the recaptcha entry on the login page. Returns True if response == recaptcha diplayed
        on the website.
    
    response (str): User supplied recaptcha key.
    secretkey (str): Secret key for the site supplied by Google.
    """
    url = 'https://www.google.com/recaptcha/api/siteverify?'      
    url = url + 'secret=' + secretkey
    url = url + '&response=' + response
    try:
        jsonobj = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
        if jsonobj['success']:
            return True
        else:
            return False
    except Exception as e:
        print(e)

        return False
      

@app.route('/passwordrecovery', methods=['GET', 'POST']) 
def passrecov():
    """ Checks to see if an email is associated with a user to recover password.  If so, returns emailsent.html.
  
    """
    if request.method == 'GET':
        return render_template('passwordrecovery.html')
    
    if request.method == 'POST':
        email = request.form['email']
        response = passwordRetrieval(email, User, db)
        if response == "No email":
            error = "No user associated with that email, please register"
            return render_template('passwordrecovery.html')
        else:
            return render_template('emailsent.html')

@app.route('/usernamerecovery', methods=['GET', 'POST']) 
def usernamerecov():
    """ Checks to see if an email is associated with a user to recover username.  If so, returns emailsent.html.
  
    """
    if request.method == 'GET':
        return render_template('usernamerecovery.html')
    if request.method == 'POST':
        email = request.form['email']
        response = usernameRetrieval(email, User, db)
        if response == "No email":
            error = "No user associated with that email, please register"
            return render_template('passwordrecovery.html', error=error)
        else:
            return render_template('emailsent.html')            

@app.route('/passreset', methods=['GET', 'POST'])
def passreset():
    if request.method == 'GET':
        return render_template('passreset.html')
    
    if request.method == 'POST':
        username = request.form['username']
        temp_password = request.form['temp_password']
        new_password = request.form['new_password']
        conf_password = request.form['conf_password']
        
        if new_password != conf_password:
            flash('New Password and confirmation don\'t match', 'danger')
            return render_template('passreset.html')
        
        response = passwordReset(username, temp_password, new_password, User, db)
        if response == 'Password succesfully changed':
            registered_user = User.query.filter_by(username=username).first()
            login_user(registered_user)
            flash(response, 'info')
            return render_template('home.html')
        
        return render_template('passreset.html')
   
        

@app.route('/datasets', methods=['GET', 'POST'])
@login_required
def datasets():
    return render_template('datasets.html', datasets=session['datasets'], testsets=session['testsets'],
                          username=g.username)
                           
                           
@app.route('/uploaddataset', methods=['POST', 'GET'])
@login_required
def uploaddataset():

    # requests
    input_type = request.form['input_type']
    file = request.files['compound_file']
    model_type = request.form['model_type']
    
    if file and allowed_file(file.filename):
        compound_filename = secure_filename(file.filename)
        if model_type == "training":
            file_directory_path = session['cmp_fldr']
        else:
            file_directory_path = session['tst_fldr']
            if not os.path.exists(session['nn_fldr'] + '/' + compound_filename[:-4]):
                os.mkdir(session['nn_fldr'] + '/' + compound_filename[:-4])

        # reload datasets
        load_user_session()
            
            
        file.save(os.path.join(file_directory_path, compound_filename))
        convert_file(os.path.join(file_directory_path, compound_filename), input_type)
        os.remove(os.path.join(file_directory_path, compound_filename))        

        return redirect(url_for('datasets'))  
    else:
        error = "Please attach file"
        return render_template('datasets.html', datasets=session['datasets'],
                               testsets=session['testsets'], username=g.username, error=error)
     

@app.route('/deletetestset', methods=['POST'])
@login_required
def deletetestset():
    testset_filename = str(request.form['testset_filename'])
    os.remove(session['tst_fldr'] + '/' + testset_filename)
    return redirect(url_for('datasets'))  
                            
@app.route('/deletedataset', methods=['POST', 'GET'])
@login_required
def deletedataset():
    compound_filename = str(request.form['compound_filename'])
    os.remove(session['cmp_fldr'] + '/' + compound_filename)
    return render_template('datasets.html', datasets=session['datasets'], testsets=session['testsets'],
                            username=g.user.username)

@app.route('/CIIProfiler') 
@login_required
def CIIProfiler():
    datasets = [dataset for dataset in os.listdir(session['cmp_fldr']) if dataset[-4:] == '.txt']
    return render_template('CIIProfiler.html', username=g.username, datasets=datasets)


@app.route('/CIIPPredictor') 
@login_required
def CIIPPredictor():
    """ Displays CIIPBioNN page with all available profiles in users' profile folder.
    
    """

    USER_PROFILES_FOLDER = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username + '/profiles'
    USER_TEST_SETS_FOLDER = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username + '/test_sets'
    profiles = [profile for profile in os.listdir(USER_PROFILES_FOLDER)]
    testsets = [testset for testset in os.listdir(USER_TEST_SETS_FOLDER) if testset[-4:] == '.txt']
    return render_template('CIIPPredictor.html', profiles=profiles, 
                           username=g.user.username, testsets=testsets)	


# TODO Create a save button to save optimized profile, allow for name
@app.route('/optimizeprofile')
@login_required
def optimizeprofile():
    """ Renderts optimize bioprofile
    """
    profile = bioprofile_to_pandas(session['cur_prof_dir'])
    stats_df = pd.read_csv(session['cur_assay_dir'], sep='\t', index_col=0)
    stats = dataTable_bokeh(stats_df)
    hm = bokehHeatmap(profile)


    return render_template('optimizeprofile.html',
                           hm=hm,
                           stats=stats,
                           aids=profile.columns.tolist()
                           )

def allowed_file(filename): #method that checks to see if upload file is allowed
    return '.' in filename and filename.rsplit('.', 1)[1] in CIIProConfig.ALLOWED_EXTENSIONS

@app.route('/optimizeassays', methods=['POST'])
@login_required
def removeassays():
    remove_or_keep = request.form['Remove_or_Keep']
    assays = list(map(int, request.form.getlist('aids')))
    profile = bioprofile_to_pandas(session['cur_prof_dir'])
    if remove_or_keep == 'Remove':
        profile.drop(assays, axis=1, inplace=True)
    else:
        profile = profile[assays]

    new_name = session['cur_prof_dir'].replace('.txt',
                                               '_optimized.txt')

    profile.to_csv(new_name, sep='\t')
    profile.to_csv(new_name.replace('biosims', 'profiles'), sep='\t')

    session['cur_prof_dir'] = new_name
    return redirect(url_for('optimizeprofile'))

@app.route('/ciiprofile',  methods=['POST'])
@login_required
def CIIProfile():
    """ Creates a bioprofile from a users selected dataset.  If the bioprofile is not too large, will create a 
        heatmap to display on the website.  
    
        Requests:
            compound_filename (str): Selected dataset from radio button.  
            noOfActives (str): String number of minumum actives per assays from pull down.
            profile_filename (str): Name of profile that will be generated. From text field. 
            sort_by: Column to sort in vitro, in vivo correlations by
                
    """
    USER_COMPOUNDS_FOLDER = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username + '/compounds'

    if request.method == 'POST':
        USER_FOLDER = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username
        compound_filename = request.form['compound_filename']
        compound_filename = str(compound_filename)
        compound_file_directory = USER_FOLDER + '/compounds/' + compound_filename	
        noOfActives = request.form['noOfActives']
        noOfActives = str(noOfActives)
        noOfActives = noOfActives.strip().split()
        
        if not noOfActives:
            noOfActives = ['5']

        df = pickle_to_pandas(compound_file_directory[:-11])
        session['cur_comp_dir'] = compound_file_directory

        profile_filename = USER_FOLDER + '/profiles/' + compound_filename[:-4] + '_BioProfile_{0}.txt'.format(noOfActives[0])
        if os.path.isfile(profile_filename):
            profile = bioprofile_to_pandas(profile_filename)
        else:
            profile = makeBioprofile(df, actives_cutoff=int(noOfActives[0]))
            profile.to_csv(profile_filename, sep='\t')
            profile.to_csv(profile_filename.replace('profiles', 'biosims'), sep='\t')

        datasets = [dataset for dataset in os.listdir(USER_COMPOUNDS_FOLDER) if dataset[-4:] == '.txt']
        stats_df = getIVIC(df['Activity'], profile)

        stats_df.to_csv(profile_filename.replace('_BioProfile', '_assay_stats').replace('profiles', 'biosims'), sep='\t')
        writer = getExcel(profile_filename.replace('profiles', 'biosims').replace('.txt', '.xlsx'))
        profile.to_excel(writer, 'Bioprofile')
        stats_df.to_excel(writer, 'In vitro-in vivo correlations')
        writer.save()
        session['cur_prof_dir'] = profile_filename.replace('profiles', 'biosims')
        session['cur_assay_dir'] = session['cur_prof_dir'].replace('_BioProfile', '_assay_stats')
        flash('Success! A profile was created consisting '
              'of {0} compounds and {1} bioassays'.format(profile.shape[0], profile.shape[1]), 'info')
        return render_template('CIIProfiler.html', stats=~stats_df.empty, datasets=datasets)


    
@app.route('/CIIPPredict', methods=['POST'])
@login_required
def CIIPPredict():
    """ Creates a biosimilarity and biological nearest neighbors from a user selected profile. 
        If an activity file is uploaded, will calculate and display in vitro, in vivo correlations as well as the 
        results of leave one out predictions of the test set.  
        
        Form Requests: 
            profile_filename: The name of the profile to use for biosimilarity and biological NNs.  From radio buttons.
            cutoff: Biosimilarity cutoff to use for NN calculation.  From text field.
            confidence: Minimum confidence score to use for NN calculation.  From text field.
            submit: Type of submit button, either Delete or Submit
    """

    if request.method == 'POST':
        if request.form['Submit'] == 'Delete':
            USER_FOLDER = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username
            USER_PROFILES_FOLDER = USER_FOLDER +'/profiles'
            profile_filename = request.form['profile_filename']
            os.remove(USER_PROFILES_FOLDER + '/' + profile_filename)
            return redirect(url_for('CIIPPredictor'))    
        elif request.form['Submit'] == 'Submit':
            USER_FOLDER = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username
            USER_PROFILES_FOLDER = USER_FOLDER +'/profiles'
            USER_COMPOUNDS_FOLDER = USER_FOLDER +'/compounds'
            USER_BIOSIMS_FOLDER =  USER_FOLDER +'/biosims'
            USER_TEST_SET_FOLDER = USER_FOLDER +'/test_sets'
            USER_NN_FOLDER = USER_FOLDER + '/NNs'

            profile_filename = request.form['profile_filename']
            profile_filename = str(profile_filename)
            profile_directory = USER_PROFILES_FOLDER + '/' + profile_filename

            compound_filename = request.form['compound_filename']
            compound_filename = str(compound_filename)
            compound_directory = USER_TEST_SET_FOLDER + '/' + compound_filename

            cutoff = request.form['cutoff']
            cutoff = str(cutoff)
            cutoff = cutoff.strip().split()
            if not cutoff:
                cutoff = [0.5]
        
            confidence = request.form['conf']
            confidence = str(confidence)
            confidence = confidence.strip().split()
            if not confidence:
                confidence = [4]
            
            confidence[0] = float(confidence[0])*0
        
            nns = request.form['nns']

            training_filename = profile_filename.split('_BioProfile')[0] + '.txt'

            bioprofile = bioprofile_to_pandas(profile_directory)
            test = pickle_to_pandas(compound_directory[:-11])
            # if os.path.isfile(USER_BIOSIMS_FOLDER + '/' +
            #                           profile_filename.replace('_BioProfile', '_BioSim_{0}_{1}_{2}'.format(cutoff[0],
            #                                                                                                confidence[0], nns))):
            #     biosims = pd.read_csv(profile_filename.replace('_BioProfile', '_BioSim_{0}_{1}_{2}'.format(cutoff[0], confidence[0], nns)), sep='\t', index_col=0)

            biosims, conf = get_BioSim(bioprofile, test)
            biosims.to_csv(USER_BIOSIMS_FOLDER + '/' +  profile_filename.replace('_BioProfile', '_BioSim_{0}_{1}_{2}'.format(cutoff[0], confidence[0], nns)), sep='\t')
            conf.to_csv(USER_BIOSIMS_FOLDER + '/' +  profile_filename.replace('_BioProfile', '_Conf_{0}_{1}_{2}'.format(cutoff[0], confidence[0], nns)), sep='\t')
            # writer = getExcel(USER_BIOSIMS_FOLDER + '/' +  profile_filename.replace('_BioProfile.txt', '_BioSim_Conf.xlsx'))
            # biosims.to_excel(writer, 'Biosimilarity')
            # conf.to_excel(writer, 'Confidence Scores')
            # writer.save()
            # get smiles
            smi_test = smi_series(compound_directory[:-11])
            smi_train = smi_series(USER_COMPOUNDS_FOLDER + '/' + training_filename[:-11])

            # remove compounds no in bioprofile
            s_train = smi_train.loc[smi_train.index.intersection(bioprofile.index)]
        
            train_fp = getFPs(s_train)
            test_fp = getFPs(smi_test)
            tan = getChemSimilarity(train_fp, test_fp)
            NNs = createNN(biosims, conf, bio_sim=float(cutoff[0]), conf_cutoff=float(confidence[0]))
            print(NNs)
            for nn in NNs:
                if not NNs[nn].empty:
                    s = get_chemNN(nn, tan, nns=len(NNs[nn].BioNN))
                    NNs[nn] = add_ChemNN(NNs[nn], s)
        
            cids = []
            preds = []
            acts = []
            NN_bool = []
            testsets = [testset for testset in os.listdir(USER_TEST_SET_FOLDER)]
            train_act = act_series(USER_COMPOUNDS_FOLDER + '/' + training_filename[:-11])
            for nn in NNs:
                if not NNs[nn].empty:
                    NN_bool.append(True)
                    NNs[nn] = add_BioNN_act(NNs[nn], train_act)
                    NNs[nn] = add_ChemNN_act(NNs[nn], train_act)
                    pred = make_BioNN_pred(NNs[nn], int(nns))
                    cids.append(str(nn))
                    if pred < 0.5:
                        preds.append(str(0))
                    elif pred > 0.5:
                        preds.append(str(1))
                    else:
                        preds.append(str(0.5))
                    if 'Activity' in test.columns:
                        acts.append(str(test.loc[nn, 'Activity']))
                    else:
                        acts.append('N/A')
                else:
                    cids.append(str(nn))
                    NN_bool.append(False)
                    preds.append('N/A')
                    if 'Activity' in test.columns:
                        acts.append(str(test.loc[nn, 'Activity']))
                    else:
                        acts.append('N/A')
            len_cids = len(cids)
            profiles = [profile for profile in os.listdir(USER_PROFILES_FOLDER)]
            for nn in NNs:
                if not NNs[nn].empty:
                    NNs[nn].to_csv(USER_NN_FOLDER + '/' + compound_filename.replace('_CIIPro.txt', '') + '/' + str(nn) + '.csv')

            session['nns'] = int(nns)
            session['test_set'] = compound_filename.replace('_CIIPro.txt', '')
            session['cur_biosim_dir'] = USER_BIOSIMS_FOLDER + '/' +  profile_filename.replace('_BioProfile.txt', '')
            session['max_conf'] = len(bioprofile.columns)            
            return render_template('CIIPPredictor.html', cids=cids,
                               preds=preds, acts=acts, len_cids=len_cids, profiles=profiles, testsets=testsets, 
                               NN_bool=NN_bool)  



@app.route('/similarity<cid>', methods=['GET', 'POST'])
@login_required
def similarity(cid):

    df = nn_to_pandas(session['nn_fldr'] + '/' + session['test_set'] + '/' + str(cid) + '.csv')
    sim_graph_pic = sim_graph(int(cid), df, int(session['nns']), int(session['max_conf']))
    return render_template('similarity.html', sim_graph=sim_graph_pic)


@app.route('/CIIProTools', methods=['GET', 'POST']) 
@login_required
def CIIProTools():

    return render_template('CIIProTools.html',
                           datasets=session['datasets'],
                           username=g.user.username)	


@app.route('/submitfeedback', methods=['POST'])
def submitfeedback():
    import sys
    email = request.form['email']
    feedback = request.form['feedback']
    send_feedback_email(email, feedback)
    flash('Feedback sent', 'info')
    return render_template('feedback.html')



@app.route('/activitycliffs', methods=['GET', 'POST']) 
@login_required
def activitycliffs():
    """ Method Identifies Activity Cliffs in training set

    """
    compound_filename = request.form['compound_filename']
    compound_filename = str(compound_filename)
    compound_directory = session['cmp_fldr'] + '/' + compound_filename
    
    df = activity_cliffs(compound_directory)
    df.index.name = 'Target_CID'
        
    writer = pd.ExcelWriter(compound_directory.replace('compounds', 'NNs').replace('.txt', '.xlsx'))
    df.to_excel(writer, sheet_name='Activity Cliffs')
    writer.save()
    session['cur_ciff_dir'] = compound_directory.replace('compounds', 'NNs').replace('.txt', '.xlsx')
        
    return render_template('CIIProTools.html', datasets=session['datasets'],
                           username=g.user.username, ac=df.to_html())	

                               
def zipBiosimFiles(USER_BIOSIMS_FOLDER, filename):
    """ Zips biosimilarity, confidence, and biological nearest neighbor files.
    """
    os.chdir(USER_BIOSIMS_FOLDER)
    z = zipfile.ZipFile(filename + '_BioSimilarity.zip', 'w')
    z.write(filename + '_BioSim.txt')
    z.write(filename + '_Bioneighbor.txt')
    z.write(filename + '_BioSim_Conf.txt')
    z.close()


def zipPredictionsFiles(biosims_dir):
    """ Zips biosimilarity, confidence, biological nearest neighbor, and bioprediction files.
    """
    dir_L = biosims_dir.split('/')
    dir_ = '/'.join(dir_L[:-1])
    os.chdir(dir_)
    z = zipfile.ZipFile(dir_L[-1] + '_biosims.zip', 'w')
    z.write(dir_L[-1] + '_BioSim.txt')
    z.write(dir_L[-1] + '_Conf.txt')
    z.write(dir_L[-1] + '_BioSim_Conf.xlsx')
    z.close()
    
def zipbioprofile(prof_dir):
    """ Zips bioprofile and in vitro, in vivo correlation files.
    """
    dir_L = prof_dir.split('/')
    dir_ = '/'.join(dir_L[:-1])
    os.chdir(dir_)
    z = zipfile.ZipFile(dir_L[-1].replace('.txt', '.zip'), 'w')
    z.write(dir_L[-1])
    z.write(dir_L[-1].replace('_BioProfile','_assay_stats'))
    z.write(dir_L[-1].replace('.txt', '.xlsx'))
    z.close()
    
@app.route('/sendbiosims')
@login_required
def sendbiosims():
    zipPredictionsFiles(session['cur_biosim_dir'])
    return send_file(session['cur_biosim_dir'] + '_biosims.zip', as_attachment=True)
 
@app.route('/sendbioprofile')
@login_required
def sendbioprofile():
    zipbioprofile(session['cur_prof_dir'])
    return send_file(session['cur_prof_dir'].replace('.txt', '.zip'), as_attachment=True)

@app.route('/sendactcliff')
@login_required
def sendactcliff():
    return send_file(session['cur_ciff_dir'], as_attachment=True)

@app.route('/sendtutorial')
def trainingsettutorial():
    return send_file('resources/ER_tutorial.zip')
  
def load_user_session():
    session['usr_fldr'] = CIIProConfig.UPLOAD_FOLDER + '/' + g.user.username
    session['cmp_fldr'] = session['usr_fldr'] + '/compounds'
    session['tst_fldr'] = session['usr_fldr'] + '/test_sets'
    session['nn_fldr'] = session['usr_fldr'] + '/NNs'
    session['datasets'] = [ds for ds in os.listdir(session['cmp_fldr'])]
    session['testsets'] = [ds for ds in os.listdir(session['tst_fldr'])]

"""
    Custom error pages

"""

@app.errorhandler(500)
def internalServiceError(e):
    return render_template('500.html'), 500


if __name__ == "__main__":

    import argparse
    parser = argparse.ArgumentParser(description='Runs Web application with options for debugging')
    parser.add_argument('-d', '--debug', action='store_true',
                        dest='debug_mode', default=False,
                        help='run in Werkzeug debug mode')
    parser.add_argument('-p', '--pydebug', action='store_true',
                        dest='debug_pycharm', default=False,
                        help='for use with PyCharm debugger')

    cmd_args = parser.parse_args()
    app_options = dict()

    app_options["debug"] = cmd_args.debug_mode or cmd_args.debug_pycharm
    if cmd_args.debug_pycharm:
        app_options["use_debugger"] = False
        app_options["use_reloader"] = False

    app.run(**app_options)