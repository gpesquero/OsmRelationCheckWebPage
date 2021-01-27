#!/bin/bash

##########################################################
## Log functions...

function log() {

    logDate=`date +%Y-%m-%d`
    logTime=`date +%H-%M-%S`

    echo $logDate $logTime "$1" "$2"
}

function logInfo() {
    log '(INFO)' "$1"
}

function logWarning() {
    log '(((WARNING)))' "$1"
}

function logError() {
    log '(((ERROR)))' "$1"
}

##########################################################
## Manage Data directories...

function manageDataDir() {

    logInfo 'Managing data directory: ./data/'$country'-'$currentDate'...'

    # Delete all country files and directories...

    cmdDeleteFiles="rm -rf ./data/"$country"*"

    logInfo "Deleting files: $cmdDeleteFiles"

    ### $cmdDeleteFiles

    # Create directory country-date

    cmdCreateDir="mkdir ./data/$country-$currentDate"

    logInfo "Creating file: $cmdCreateDir"

    $cmdCreateDir
}

##########################################################
## Download PBF file...

function downloadPbfFile() {

    logInfo 'Downloading Pbf file: '$country'-'$currentDate

    # First, download OSM PBF source file...

    srcFile='http://download.geofabrik.de/europe/'$country'-latest.osm.pbf'
    dstFile='./data/'$country'-'$currentDate'/'$country'.osm.pbf'

    #logInfo 'srcFile: '$srcFile
    #logInfo 'dstFile: '$dstFile

    if [ -f "$dstFile" ];
    then
        logInfo "PBF file <'$dstFile'> already exists"
    else

        logInfo "Downloading PBF file <'$srcFile'>..."

        wget -O $dstFile $srcFile

        if [ $? -eq 0 ]
        then
            logInfo "wget command OK"
        else
            logError "wget command failed!!"
        fi
    fi
}

##########################################################
## Create OSM Database...

function createOsmDatabase() {

    logInfo 'Checking for OSM Database...'

    databaseFileName='./data/'$country'-'$currentDate'/'$country'.db'

    if [ -f "$databaseFileName" ];
    then
        logInfo "OSM database <'$databaseFileName'> already exists"
    else

        logInfo 'Creating OSM Database: '$country'-'$currentDate

        java -jar ./jars/CreateOsmDatabases.jar './data/'$country'-'$currentDate
    fi
}

##########################################################
## Process OSM Database...

function processOsmDatabase() {

    logInfo 'Process OSM Database...'

    xmlFileName='./data/'$1
    
    if [ -f "$xmlFileName" ];
    then
        logInfo "XML file <'$xmlFileName'> exists"

        java -jar ./jars/ProcessOsmDatabase.jar $xmlFileName --dataDir=$country'-'$currentDate
    else

        logError "XML file <'$xmlFileName'> does not exist"
    fi
}

##########################################################
## Copy GeoJson Files...

function copyGeoJsonFiles() {

    logInfo 'Copying GeoJson Files...'

    cp ./data/$country'-'$currentDate/*.geojson /var/www/html/data
}

##########################################################
## Start of Looper...

logInfo 'Starting Looper...'

while true
do
	logInfo 'Checking for data files...'

    country='spain'
    currentDate=`date +%Y.%m.%d`
    
    dataFileName='./data/'$country'-'$currentDate'/errors_high.geojson'

    logInfo 'Data file Name <'$dataFileName'>...'

    if [ -f "$dataFileName" ];
    then
        logInfo "Data file already exists"
    else
        logInfo "Data file does not exist"

        # Manage data directories
        manageDataDir

        # Download PBF file...
        downloadPbfFile

        # Create OSM database...
        createOsmDatabase

        # Process OSM database (Buses Spain)...
        processOsmDatabase 'check_bus_spain.xml'

        # Process OSM database (Administrative Boundaries Spain)...
        processOsmDatabase 'check_admin_spain.xml'

        # Process OSM database (Hiking Spain)...
        processOsmDatabase 'check_hiking_spain.xml'

        # Copy GeoJSON files...
        copyGeoJsonFiles
    fi

	logInfo 'Finished!! Sleeping for 6 hours...'
	sleep 6h
    logInfo 'Woke up from sleep...'
	
done



