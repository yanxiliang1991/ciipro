# -*- coding: utf-8 -*-
"""
Created on Sat Apr 25 10:39:01 2015

@author: danrusso
"""

from routes import User
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

#users = User.query.all()
#admin = User.query.filter_by(username='admin').first()


def passwordRetrieval(user_email):
    user = User.query.filter_by(email=user_email).first()
    user_pw = user.password
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Password Retrieval from CIIPro"
    msg['From'] = "ciipro.mail@gmail.com"
    password = "Rutgers14"
    username = "ciipro.mail"
    msg['To'] = str(user_email)
    text = "Your password for CIIPro is %s" % str(user_pw)
    html = """\
    <html>
    <head></head>
    <body>
    <p>
    Your password for CIIPro is %s
    </p>
    </body>
    </html>
    """ % str(user_pw)
    
    m_text1 = MIMEText(text, 'plain')
    m_text2 = MIMEText(html, 'html')
    
    msg.attach(m_text1)
    msg.attach(m_text2)
    
    s = smtplib.SMTP('smtp.gmail.com:587')
    s.ehlo()
    s.starttls()
    s.login(username, password)
    s.sendmail("ciipro.mail@gmail.com", str(user_email), msg.as_string())
    s.quit()

def usernameRetrieval(user_email):
    user = User.query.filter_by(email=user_email).first()
    username = user.username
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Username Retrieval from CIIPro"
    msg['From'] = "ciipro.mail@gmail.com"
    password = "Rutgers14"
    username = "ciipro.mail"
    msg['To'] = str(user_email)
    text = "Your username for CIIPro is %s" % str(username)
    html = """\
    <html>
    <head></head>
    <body>
    <p>
    Your username for CIIPro is %s
    </p>
    </body>
    </html>
    """ % str(username)
    
    m_text1 = MIMEText(text, 'plain')
    m_text2 = MIMEText(html, 'html')
    
    msg.attach(m_text1)
    msg.attach(m_text2)
    
    s = smtplib.SMTP('smtp.gmail.com:587')
    s.ehlo()
    s.starttls()
    s.login(username, password)
    s.sendmail("ciipro.mail@gmail.com", str(user_email), msg.as_string())
    s.quit()
    
