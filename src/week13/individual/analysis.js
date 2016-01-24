function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where was the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the density of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  var samples = []
  _.forEach(items, function(d){
    _.forEach(d.Samples, function(f){
      if (parseInt(f) > 0){
        samples.push(f)
      }
    })
  })
  return "There are " + _.uniq(samples).length + " unique samples: " + _.uniq(samples).join(', ')
}

function func2(){
  var timediff = []
  var pairs = _.pairs(items)
  for(var i = 0; i<items.length-1; i++){
    var one = pairs[i][1].Ping_time.split(':')
    var two = pairs[i+1][1].Ping_time.split(':')
    if(parseInt(two[2]) > parseInt(one[2])){
      var diff = parseInt(two[2]) - parseInt(one[2])
      timediff.push(diff)
    }
  }
  return _.sum(timediff) / timediff.length + ' seconds.'
}

function func3(){
  var filtered = _.filter(items, function(d){
    return d.Ping_time == '09:57:18'
  })
  var sample  = filtered[0].Samples
  var good = 0
  _.forEach(sample, function(d){
    if(parseInt(d) == 7){
      good++
    }
  })
  return good
}

function func4(){
  var groups = _.groupBy(items, 'Ping_time')
  var map = _.mapValues(groups, function(d){
    good = 0
    _.forEach(d[0].Samples, function(f){
      if(parseInt(f) == 3){
        good++
      }
    })
    return good
  })
  var pairs = _.pairs(map)
  var sorted = _.sortBy(pairs, function(d){
    return d[1]
  }).reverse()
  return "The ping with the most samples of 3 was " + _.first(sorted)[0] + ' with ' + _.first(sorted)[1] + ' samples of 3 total.'
}

function func5(){
  var filtered = _.filter(items, function(d){
    var count = 0 
    _.forEach(d.Samples, function(f){
      if(f > 0){
        count++
      }
    })
    return (count == 0)
  })
  return filtered.length
}

function func6(){
  var samples = []
  _.forEach(items, function(d){
    _.forEach(d.Samples, function(f){
      if (parseInt(f) > 0){
        samples.push(f)
      }
    })
  })
  samples = _.uniq(samples)
  var maxsamp = ''
  var maxcount = 0
  for(var i = 0; i<samples.length; i++){
    var count = 0
    _.forEach(items, function(d){
      _.forEach(d.Samples, function(f){
        if(f == samples[i]){
          count++
        }
      })
    })
    if (count > maxcount){
      maxsamp = samples[i]
      maxcount = count
    } 
  }
  return maxsamp
}

function func7(){

  // this sample code shows how to display a map and put a marker to visualize
  // the location of the first item (i.e., measurement data)
  // you need to adapt this code to answer the question
  var nyc = ['40.7127', '-74.0059']
  var coordnyc = {'latitude': nyc[0], 'longitude': nyc[1]}
  var distances = []
  _.forEach(items, function(d){
    var coord = {'latitude': d.Latitude, 'longitude': d.Longitude}
    var dist = geolib.getDistance(coordnyc, coord)
    distances.push(dist)
  })
  var max = _.max(distances)
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)
  var time = ''
  _.forEach(items, function(d){
    var coord1 = {'latitude': d.Latitude, 'longitude': d.Longitude}
    if(geolib.getDistance(coordnyc, coord1) == max){ 
      time = d.Ping_time
      var coord2 = [d.Latitude, d.Longitude]
      var circle = L.circle(coord2, 500, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
      }).addTo(map)
    }
  })
  return time + " with a distance of " + max + ' meters.'
}

function func8(){
  var first = items[150]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 12)
  var pairs= _.pairs(items)
  for(var i =0; i < items.length-1; i++){
    var coord1 = [pairs[i][1].Latitude, pairs[i][1].Longitude]
    var circle = L.circle(coord1, 2, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
    // var coord2 = [pairs[i+1][1].Latitude, pairs[i+1][1].Longitude] //not nessacary as long as polyline doesn't work
    // var circle2 = L.circle(coord2, 2, {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5
    // }).addTo(map);
    // var latlngs = [coord1, coord2]
    // console.log(latlngs)
    // var polyline = L.polyline(latlngs, {color: 'yellow'}).addTo(map); //polyline doesn't work for some reason
  }
}

function func9(){
  var maxsamp = func6()
  var first = items[150]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 12)
  _.forEach(items, function(d){
    if(_.includes(d.Samples, maxsamp)){
      var coord = [d.Latitude, d.Longitude]
      var circle = L.circle(coord, 2, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);
    }
  })
}

function func10(){
  var first = items[0]
  var valid = []
  _.forEach(items, function(d){
    var count2 = 0
    _.forEach(d.Samples, function(f){
      if(parseInt(f) > 0){
        count2++
      }
    })
    valid.push(count2)
  })
  var max = _.max(valid)
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(1000) // set the map to the desired height
  var map = createMap(el, pos, 18)
  _.forEach(items, function(d){
    var coord = [d.Latitude, d.Longitude]
    var count = 0
    _.forEach(d.Samples, function(f){
      if(parseInt(f) > 0){
        count++
      }
    })
    count = _.round(count/max, 2)
    if(count > 0){
      var circle = L.circle(coord, 2, {
        color: 'red',
        fillColor: 'red',
        fillOpacity: count
      }).addTo(map);
    }
  })
}

function func11(){
  var first = items[150]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 12)
  _.forEach(items, function(d){
    if(_.includes(d.Samples, '3.000000') || _.includes(d.Samples, '1.000000') || _.includes(d.Samples, '32.000000') || _.includes(d.Samples, '45.000000') || _.includes(d.Samples, '10.000000') || _.includes(d.Samples, '4.000000') || _.includes(d.Samples, '37.000000') || _.includes(d.Samples, '53.000000') || _.includes(d.Samples, '8.000000') || _.includes(d.Samples, '33.000000')  || _.includes(d.Samples, '30.000000')){
      var coord = [d.Latitude, d.Longitude]
      var circle = L.circle(coord, 2, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);
    }
  })
}

function func12(){
  var first = items[150]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 12)
  _.forEach(items, function(d){
    if(_.includes(d.Samples, '7.000000') || _.includes(d.Samples, '13.000000') || _.includes(d.Samples, '45.000000') || _.includes(d.Samples, '42.000000') || _.includes(d.Samples, '49.000000') || _.includes(d.Samples, '40.000000') || _.includes(d.Samples, '10.000000') || _.includes(d.Samples, '36.000000') || _.includes(d.Samples, '37.000000') || _.includes(d.Samples, '53.000000')  || _.includes(d.Samples, '8.000000') || _.includes(d.Samples, '20.000000')){
      var coord = [d.Latitude, d.Longitude]
      var circle = L.circle(coord, 2, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);
    }
  })
}
