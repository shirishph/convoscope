from emotion_predictor import EmotionPredictor

model = EmotionPredictor(classification='plutchik', setting='mc', use_unison_model=True)

print("************")
predictions = model.predict_classes(["I like to play cricket"])
print(predictions.iloc[0]['Tweet'], '\t', predictions.iloc[0]['Emotion'])
