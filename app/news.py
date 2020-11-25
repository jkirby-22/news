from app import app
import requests
from datetime import datetime, timedelta
from flask import render_template, redirect, session


@app.route('/news/<key_term>', methods=['GET'])
def get_news(key_term):

    date_formatted = (datetime.today() - timedelta(days=1)).strftime("%Y-%m-%d") #Get yesterdays date

    if (len(key_term.split('%20')) > 1): #if multi word term then prepare as such
        query = 'q=' + '"' + key_term + '"'
    else:
        query = 'q=' + key_term

    url = ('http://newsapi.org/v2/everything?'+ query + '&from=' + date_formatted + '&sortBy=popularity' + '&apiKey=9118e3daa3884321ae89c75d7e5ade07')
    news = requests.get(url)

    #for key in session.keys():
        #session.pop(key)
    #session.clear()
    #count = 0
    #for item in news.json()["articles"]:
        #session[str(count)] = item["title"] + " " + item["description"]
        #print(session[count])
        #count += 1
    return render_template('news.html', articles=news.json()["articles"])
   #print(news.json()["articles"])

