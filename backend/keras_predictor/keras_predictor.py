'''
For image: EfficientNetB4 with noisy-student weights
For Text: TODO Find pre-built sentiment analysis model
'''
import tensorflow as tf
import efficientnet.keras as efn
import numpy as np

def get_suggestion(response):
	"""
	Appends an ml suggestion to the response based on itemDataType.
	Currently supports image only.

	Args:
		response (dict): Query response to send to API.
	"""
	label_type = response['itemDataType']
	if label_type == 'image':
		response = __image_classifier(response)
	elif label_type == 'text':
		response = __text_sentiment(response)
	else:
		return
	
	return response

def __image_classifier(response):
	"""
	Generates an EfficientNetB4 model and classifies images.

	Args:
		response (dict): Query response to send to API. Should be of itemDataType image.
	"""
	IMG_SIZE = 380

	# Create model
	model = efn.EfficientNetB4(weights='noisy-student')

	# Process images
	for index, item in enumerate(response['data']):
		image = item['taskData']
		image = efn.center_crop_and_resize(image=image, image_size=IMG_SIZE)
		image = efn.preprocess_input(image)
		img_array = tf.keras.preprocessing.image.img_to_array(image)
		img_array = tf.expand_dims(img_array, 0)
	
		# Predict
		prediction = model.predict(img_array)
		prediction = tf.keras.applications.imagenet_utils.decode_predictions(prediction)

		# Append prediction to response
		response['data'][index]['ml_suggest'] = prediction[0][0][1]

	return response

def __text_sentiment(response):
	"""
	WIP text sentiment analysis model.

	Args:
		response (dict): Query response to send to API. Should be of itemDataType text.
	"""

	return response
