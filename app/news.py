from app import app
import requests
from datetime import datetime, timedelta
from flask import render_template, redirect, session

@app.route('/', methods=['GET'])
def get_topics():

    url = ('https://topic-builder.herokuapp.com/topic')
    topics = requests.get(url)
    print(topics.json())
    return render_template('dropdown.html', allTopics=topics.json())

@app.route('/news/<key_term>/<topic_id>', methods=['GET'])
def get_news(key_term, topic_id):

    date_formatted = (datetime.today() - timedelta(days=1)).strftime("%Y-%m-%d") #Get yesterdays date

    if (len(key_term.split('%20')) > 1): #if multi word term then prepare as such
        query = 'q=' + '"' + key_term + '"'
    else:
        query = 'q=' + key_term

    if session.get('topic_id'):
        session.pop('topic_id')

    session['topic_id'] = topic_id
    url = ('http://newsapi.org/v2/everything?'+ query + '&from=' + date_formatted + '&sortBy=popularity' + '&apiKey=9118e3daa3884321ae89c75d7e5ade07')
    news = requests.get(url)

    print('topic: ' + session['topic_id'])
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

@app.route('/addterm/<key_term>', methods=['GET'])
def add_term(key_term):
    url = ('https://topic-builder.herokuapp.com/createKeyterm?name=' + key_term + '&topic_id=' + session['topic_id'])
    print(url)
    response = requests.post(url)
    print('response: ')
    print(response)
    return redirect('/')

