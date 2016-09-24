# This file contains the WSGI configuration required to serve up your
# web application at http://<your-username>.pythonanywhere.com/
# It works by setting the variable 'application' to a WSGI handler of some
# description.
#
# The below has been auto-generated for your Flask project
import sys, logging

# active virtual environment as per Flask docs

activate_this = '/g1/software/python/install/Anaconda3-2.1.0__Python_3.4/envs/ciipro-rdkit-env/bin/activate_this.py'
# execfile(activate_this, dict(__file__=activate_this))

with open(activate_this) as f:
    code = compile(f.read(), activate_this, 'exec')
    exec(code, dict(__file__=activate_this))

# add your project directory to the sys.path
# project_home = u'/g1/home/danrusso/ciipro/live'
logging.basicConfig(stream = sys.stderr)
project_home = u'/var/www_ciipro/live'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# import flask app but need to call it "application" for WSGI to work
from routes import app as application
