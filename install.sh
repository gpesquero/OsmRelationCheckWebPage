#!/bin/bash

# Variables...
WEB_PAGE_NAME='OsmRelationCheckWebPage'
BASE_DST_DIR=/var/www/html
BASE_LIBS_SRC_DIR="libs"
OL_VERSION=6.4.3
OL_LIB_FILE_LIST="ol.css ol.css.map ol.js ol.js.map";
BASE_IMG_SRC_DIR="img"
IMG_FILE_LIST="bus_stop.png \
               globeicon.png"
DEV_FILE_LIST="base_layers.js \
               bus_lines.js \
               cookies.js \
               fetchBusLines.php \
               index.html \
               main.js \
               styles.css \
               vector_layer_admin.js \
               vector_layer_boundary.js \
               vector_layer_bus.js \
               vector_layer_hiking.js \
               vector_layer_styles.js \
               vector_layers.js";

# Starting...
echo "## $WEB_PAGE_NAME Install Script....";

# Check if script is being run as root
if [[ $(id -u) -ne 0 ]];
then
  echo "Please run as root";
  echo "Quitting....";
  exit 1;
fi

# Check if base dir exists...
if [[ ! -d $BASE_DST_DIR ]];
then
  echo "Creating base dir: <$BASE_DST_DIR>";
  mkdir $BASE_DST_DIR
fi

# Check if base IMG dir exists...
BASE_IMG_DST_DIR="$BASE_DST_DIR/$BASE_IMG_SRC_DIR"

if [[ ! -d $BASE_IMG_DST_DIR ]];
then
  echo "Creating base IMG dir: <$BASE_IMG_DST_DIR>";
  mkdir $BASE_IMG_DST_DIR
fi

# Check if base LIB dir exists...
BASE_LIBS_DST_DIR="$BASE_DST_DIR/$BASE_LIBS_SRC_DIR"

if [[ ! -d $BASE_LIBS_DST_DIR ]];
then
  echo "Creating base libs dir: <$BASE_LIBS_DST_DIR>";
  mkdir $BASE_LIBS_DST_DIR
fi

# Copy of OpenLayers library...
OL_LIB_SRC_DIR="$BASE_LIBS_SRC_DIR/ol-v$OL_VERSION-dist";
OL_LIB_DST_DIR="$BASE_DST_DIR/$OL_LIB_SRC_DIR";

if [[ ! -d $OL_LIB_DST_DIR ]];
then
  echo "Creating OpenLayers lib dir: <$OL_LIB_DST_DIR>";
  mkdir $OL_LIB_DST_DIR
fi

for FILE in $OL_LIB_FILE_LIST;
do
  if [[ ! -e $OL_LIB_DST_DIR/$FILE ]];
  then
    cp $OL_LIB_SRC_DIR/$FILE $OL_LIB_DST_DIR/$FILE
  fi
done;

# Copy of IMG files...
for FILE in $IMG_FILE_LIST;
do
  echo "Copying file $FILE...";
  cp $BASE_IMG_SRC_DIR/$FILE $BASE_IMG_DST_DIR
done;

# Copy of development files...
for FILE in $DEV_FILE_LIST;
do
  echo "Copying file $FILE...";
  cp $FILE $BASE_DST_DIR
done;

echo "Finished!!";
