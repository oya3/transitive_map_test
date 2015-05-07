var DATA = {
  "routes": [{
    "agency_id": "agency_id",
    "route_id": "ROUTE_ID",
    "route_short_name": "route_short_name",
    "route_long_name": "route_long_name",
    "route_type": 1,
    "route_color": "ff0000"
  }],
  
  "stops": [{
    "stop_id": "111",
    "stop_name": "111stop_name_111",
    "stop_lat": 38.916552,
    "stop_lon": -76.915104
  }, {
    "stop_id": "222",
    "stop_name": "222stop_name_222",
    "stop_lat": 38.926552,
    "stop_lon": -76.925104
//    "stop_lat": 38.889571,
//    "stop_lon": -76.913313
  }, {
    "stop_id": "333",
    "stop_name": "333stop_name_333",
    "stop_lat": 38.936552,
    "stop_lon": -76.935104
//    "stop_lat": 38.933994,
//    "stop_lon": -76.890005
  }],
  
  "patterns": [{
    "pattern_id": "pattern_id",
    "stops": [{
      "stop_id": "111"
    }, {
      "stop_id": "222"
    }, {
      "stop_id": "333"
    }],
    "pattern_name": "pattern_name_444",
    "route_id": "ROUTE_ID"
  }],
  
  // "places": [{
  //   "place_id": "from",
  //   "place_name": "place_name_from",
  //   "place_lat": 38.894624,
  //   "place_lon": -77.074159
  // }, {
  //   "place_id": "to",
  //   "place_name": "place_name_to",
  //   "place_lat": 38.89788,
  //   "place_lon": -77.00597
  // }],
  
  "journeys": [{
    "journey_id": "555",
    "journey_name": "journey_name_555",
    "segments": [{
      "type": "TRANSIT",
      "pattern_id": "pattern_id",
      "from_stop_index": 1,
      "to_stop_index": 2
    }]
  }]
};
