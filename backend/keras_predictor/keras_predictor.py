'''
For image: EfficientNetB4 with noisy-student weights
For Text: TODO Find pre-built sentiment analysis model
'''
import tensorflow as tf
import efficientnet.keras as efn
import numpy as np
import re

IMG_SIZE = 380

# Create model and keep it loaded
model = efn.EfficientNetB4(weights='noisy-student')
cache = dict()		# image base 64: prediction

def get_suggestion(response):
	"""
	Appends an ml suggestion to the response based on itemDataType.
	Currently supports image only.

	Args:
		response (dict): Query response to send to API.
	"""

	label_type = response['itemDataType']
	if label_type.lower() == 'image':
		response = __image_classifier(response)
	# elif label_type.lower() == 'text':
	# 	response = __text_sentiment(response)
	else:
		return response
	
	return response

def __image_classifier(response):
	"""
	Generates an EfficientNetB4 model and classifies images.

	Args:
		response (dict): Query response to send to API. Should be of itemDataType image.
	"""
	# Process images
	for index, item in enumerate(response['data']):
		image_base64 = item['itemData']
		if image_base64 in cache:
			print(cache[image_base64])
			response['data'][index]['ml_suggest'] = cache[image_base64][0][0][1]
		else:
			print(response['data'][index]['filename'])

			image = __image_decoder(image_base64)
			image = efn.center_crop_and_resize(image=image, image_size=IMG_SIZE)
			image = efn.preprocess_input(image)
			img_array = tf.keras.preprocessing.image.img_to_array(image)
			img_array = tf.expand_dims(img_array, 0)

			# Predict
			prediction = model.predict(img_array)
			prediction = tf.keras.applications.imagenet_utils.decode_predictions(prediction)

			# Append prediction to response
			print(prediction)
			response['data'][index]['ml_suggest'] = prediction[0][0][1]
			cache[image_base64] = prediction

		print(response['data'][index]['ml_suggest'])

	return response

# def __text_sentiment(response):
# 	"""
# 	WIP text sentiment analysis model.

# 	Args:
# 		response (dict): Query response to send to API. Should be of itemDataType text.
# 	"""

# 	return response

def __image_decoder(base64_str):
	"""
	Decodes a base64 encoded image into a usable image file for EfficientNet

	Args:
		base64_str (string): base64 encoded image file
	"""
	# Remove header string
	str_match = re.match(r"data:image/\w\w*;base64,(.*)", base64_str)
	base64_str = str_match.group(1)

	# Convert string to web-safe
	base64_str = re.sub(r"/", "_", base64_str)
	base64_str = re.sub(r"\+", "-", base64_str)

	image_bytes = tf.io.decode_base64(base64_str)
	image = tf.io.decode_image(image_bytes, channels=3, expand_animations=False)

	return image