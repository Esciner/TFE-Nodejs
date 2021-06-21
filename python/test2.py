# USAGE
# python classify.py --sujet dataset/images/xxx.png --images dataset/images --masks dataset/masks

# import the necessary packages
from __future__ import print_function
from pyimagesearch.rgbhistogram import RGBHistogram
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import numpy as np
import argparse
import glob
import cv2
import mahotas

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-s", "--sujet", required = True,
	help = "path to the sujet image")
ap.add_argument("-i", "--images", required = True,
	help = "path to the image dataset")
ap.add_argument("-m", "--masks", required = True,
	help = "path to the image masks")
args = vars(ap.parse_args())

# grab the image and mask paths
sujetPath = args["sujet"]
#sujetMaskPath = args["sujetMask"]
imagePaths = sorted(glob.glob(args["images"] + "/*.png"))
maskPaths = sorted(glob.glob(args["masks"] + "/*.png"))

# initialize the list of data and class label targets
data = []
target = []

# initialize the image descriptor
desc = RGBHistogram([8, 8, 8])

# loop over the image and mask paths
for (imagePath, maskPath) in zip(imagePaths, maskPaths):
	# load the image and mask
	image = cv2.imread(imagePath)
	mask = cv2.imread(maskPath)
	mask = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)
	#print(imagePath)
	#print(maskPath)

	# describe the image
	features = desc.describe(image, mask)

	# update the list of data and targets
	data.append(features)
	target.append(imagePath.split("_")[-2])

# grab the unique target names and encode the labels
targetNames = np.unique(target)
le = LabelEncoder()
target = le.fit_transform(target)

# construct the training and testing splits
(trainData, testData, trainTarget, testTarget) = train_test_split(data, target,
	test_size = 0.3, random_state = 42)

# train the classifier
model = RandomForestClassifier(n_estimators = 25, random_state = 84)
model.fit(trainData, trainTarget)

# load the image and mask
image = cv2.imread(sujetPath)
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(image, (5, 5), 0)
T = mahotas.thresholding.otsu(blurred)
thresh = image.copy()
thresh[thresh > T] = 255
thresh[thresh < 255] = 0

# describe the image
features = desc.describe(cv2.imread(sujetPath), thresh)

# predict what type of flower the image is
flower = le.inverse_transform(model.predict([features]))[0]
#print("I think this flower is a {}".format(flower.upper()))
print(flower)