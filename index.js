'use strict';

var S = require('string'),
syllablistic = require('syllablistic'),
_ = require('underscore');


// split text and turn into haiku, three lines of 5-7-5
// if minumum requirements are not met by input, return empty string

module.exports = function(source){

  if(S(source).isEmpty()) throw new Error('Empty input string');

  // not a great regex, could use some work
  var components = _.chain(source.split(/[\.\,\;\r\n]/g))
    .map(function(s){
      return S(s).trim().s;
    })
    .map(function(s){ 
      return {
	text : s,
	count : syllablistic.text(s)
      }
    })
    .groupBy(function(s){ return s.count })
    .value();

  _.each([5,7], function(i){
    if(!(i in components)) throw new Error('No ' + i + ' syllable elements available');
  });

  var fives = _.chain(components[5]).shuffle().pluck('text').value();
  var sevens = _.chain(components[7]).shuffle().pluck('text').value();

  return function(){
    var haiku = [];
    haiku.push(_.sample(fives));
    haiku.push(_.sample(sevens));
    haiku.push(_.sample(fives));
    return haiku.join('\n');
  }
}


