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
## Update of error file...

function updateErrorFile() {

    logInfo 'Update error file: '$1

    # First, download OSM PBF source file...

    srcFile='http://download.geofabrik.de/europe/spain-latest.osm.pbf'
    dstFile='./data/spain-'$1'.osm.pbf'

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
## Start of Looper...

logInfo 'Starting Looper...'

while true
do
	logInfo 'Checking for error file...'

    currentDate=`date +%Y.%m.%d`
    
    errorFileName='./data/errors_'$currentDate'.geojson'

    logInfo 'Error file Name <'$errorFileName'>...'

    if [ -f "$errorFileName" ];
    then
        logInfo "Error file already exists"
    else
        logInfo "Error file does not exist"

        # Update error file...
        updateErrorFile $currentDate
    fi

	logInfo 'Finished!! Sleeping for 6 hours...'
	sleep 6h
    logInfo 'Woke up from sleep...'
	
done



