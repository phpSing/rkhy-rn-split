#!/bin/bash

if [ ! -d 'androidBundleSplit' ]; then 
 mkdir androidBundleSplit
fi

if [ ! -d 'iosBundleSplit' ]; then
  mkdir iosBundleSplit
fi

node ./split-src/index.js --platform ios --output iosBundleSplit --config ./.splitconfig --dev false
node ./split-src/index.android.js --platform android --output androidBundleSplit --config ./.splitconfig --dev false