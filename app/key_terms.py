from app import app
import requests
from datetime import datetime, timedelta
from flask import render_template, redirect, session



@app.route('/terms/<news_id>', methods=['GET'])
def tokenise_terms:
    news = session[news_id]

    #delete!
    tokens = input.split(' ')
    size = len(tokens)
    json = {'size': size}
    for index in range(size):
        json.update({index: tokens[index]})


    #code to call tokenise web service
    print(json)
    return render_template('key_terms.html', key_terms=json)

   #print(news.json()["articles"])

