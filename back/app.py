import enum
import json
from flask import Flask, jsonify
from flask_cors import CORS
from emotion_predictor import EmotionPredictor
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)
model = EmotionPredictor(classification='plutchik', setting='mc', use_unison_model=True)

class Emotions(enum.Enum): 
    Fear = 0
    Anger = 1
    Disgust = 2
    Sadness = 3
    Anticipation = 4
    Surprise = 5
    Trust = 6
    Joy = 7


@app.route('/fetch_convo')
def fetch_convo():
    with open('convos.json') as json_file:
        convos = json.load(json_file)
    
    prepped = []
    SIAnalyser = SentimentIntensityAnalyzer()

    for convo in convos:
        sentiment_dict = SIAnalyser.polarity_scores(convo["user"])
        uscore = sentiment_dict['compound']

        sentiment_dict = SIAnalyser.polarity_scores(convo["bot"])
        bscore = sentiment_dict['compound']

        predictions = model.predict_classes([convo["user"]])
        userEmoKind = predictions.iloc[0]['Emotion']

        predictions = model.predict_classes([convo["bot"]])
        botEmoKind = predictions.iloc[0]['Emotion']

        prepped.append({
            "user": convo["user"],
            "bot": convo["bot"],
            "userStatementScore": uscore,
            "botStatementScore": bscore,
            "userEmoKind": userEmoKind,
            "botEmoKind": botEmoKind,
            "userEmoValue": Emotions[userEmoKind].value,
            "botEmoValue": Emotions[botEmoKind].value,
        })

    # for prep in prepped:
    #     print(prep)

    return jsonify(prepped), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9090)