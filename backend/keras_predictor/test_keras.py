'''
Contains tests for Keras implementations
'''
import tensorflow as tf
import keras_predictor
from skimage.io import imread

def test_image_predict():
	"""
	Tests image classifier based on dummy data, downloaded from url.
	TODO implement pytest assertion.
	"""

	response = {
		"projectName": "Project 1",
      	"itemDataType": "image",
    	"layout": {
			"inputType": "checkbox",
			"description": "Label what you see in the picture",
			"labelData": ["Dog", "Cat", "Rabbit", "Bird"],
    	},
    	"data": [
      {
        "taskId": 1,
        "taskData":
          "https://cf.ltkcdn.net/dogs/images/std/248348-676x450-standing-pomeranian-dog.jpg"
      },
      {
        "taskId": 2,
        "taskData":
          "https://upload.wikimedia.org/wikipedia/commons/4/46/A_white_Pomeranian_enjoying_a_treat.JPG",
      },
    	],
  	}

	for index, item in enumerate(response['data']):
		img = imread(item['taskData'])
		response['data'][index]['taskData'] = img

	return keras_predictor.get_suggestion(response)

if __name__ == "__main__":
	print(test_image_predict())