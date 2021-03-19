<?php

  $lon1 = $_GET[minLon];
  $lon2 = $_GET[maxLon];
  
  $minLon = min($lon1, $lon2);
  $maxLon = max($lon1, $lon2);

  $lat1 = $_GET[minLat];
  $lat2 = $_GET[maxLat];

  $minLat = min($lat1, $lat2);
  $maxLat = max($lat1, $lat2);

  //print "MinLon=" . $minLon . ", MaxLon=" . $maxLon . ", MinLat=" . $minLat . ", MaxLat=" . $maxLat;

  // For the moment, just get bus line count...

  $db_host = "localhost";
  $db_name = "osm_db";
  $db_user = "osm_reader";
  $db_password = "";

  // Establish DB connection...
      
  $db_connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);

  if (!$db_connection) {

    print "ERROR: DB connect(): " .  mysqli_connect_errno() . " (" . mysqli_connect_error() . ")";

    return;
  }

  $result = mysqli_query($db_connection, "SELECT COUNT(*) FROM osm_db.bus_lines;");

  if (!$result) {

    print "ERROR: Could not run query: " . mysqli_error($db_connection);
    
    mysqli_close($db_connection);

    return;
  }
  
  $row = mysqli_fetch_row($result);
  
  $bus_line_count = $row[0];

  //echo "Bus line count: " . $bus_line_count . "<br>" . PHP_EOL;

  mysqli_close($db_connection);
  
  print "BUS_LINES(" . $bus_line_count . ") <" . "164554,164561" . ">";
?>
