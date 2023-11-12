from flask import Flask, render_template, jsonify, request
from random import randrange
from dotenv import load_dotenv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os

load_dotenv()

appPassword = os.environ.get("APP_PASS")
emailString = os.environ.get("EMAIL")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/endpoint', methods=['POST'])
def handle_request():
    try:
        data = request.get_json()
        senders = list(data.keys())
        recievers = senders.copy()
        shuffle(recievers)

        giftPairs = makePairs(senders, recievers, data)
        for sender in giftPairs:
            sendMail(giftPairs[sender], sender, data[sender])

        
        result = {"message": "JSON received", "data": data}
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
def makePairs(senders, recievers, data):
    giftPairs = {}
    for i, sender in enumerate(senders):
        giftPairs[sender] = (recievers[i], data[recievers[i]])
    
    return giftPairs

def shuffle(items):
    i = len(items)
    while i > 1:
        i = i - 1
        j = randrange(i)
        items[j], items[i] = items[i], items[j]

def sendMail(giftPair, sender, senderEmail):
    recieverName = giftPair[0]
    recieverEmail = giftPair[1]

    
    message = MIMEMultipart()
    message["To"] = senderEmail
    message["From"] = emailString
    message["Subject"] = 'Secret Santa'

    title = '<b> Secret Santa! </b>'
    messageText = MIMEText(f'''Hello {sender}! You will be giving your gift to {recieverName}!''','html')
    message.attach(messageText)

    mailServer = smtplib.SMTP('smtp.gmail.com:587')
    mailServer.ehlo('Gmail')
    mailServer.starttls()
    mailServer.login(emailString, appPassword)

    fromaddr = emailString
    toaddrs  = senderEmail

    mailServer.sendmail(fromaddr,toaddrs,message.as_string())
    mailServer.quit()

if __name__ == "__main__":
    app.run(debug = True)