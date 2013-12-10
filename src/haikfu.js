var S = require('string'),
syllablistic = require('syllablistic'),
_ = require('underscore');


// split text and turn into haiku, three lines of 5-7-5
// if minumum requirements are not met by input, return empty string
function text(input){

  if(S(input).isEmpty()) return '';

  var text = S(input).collapseWhitespace().s.trim();


  // not a great regex, could use some work
  var components = _.chain(text.split(/[\.\,\;\r\n]/))
    .map(function(s){ return S(s).stripPunctuation().s.trim(); })
    .groupBy(function(s){ return syllablistic.text(s); })
    .value();

  _.each([5,7], function(i){
    if(!(i in components)) throw new Error('No ' + i + ' syllable elements available');
  });


  var fives = _.shuffle(components[5]);
  var sevens = _.shuffle(components[7]);

  var haiku = [];
  haiku.push(fives.pop());
  haiku.push(sevens.pop());
  if(fives.length === 0) haiku.push(haiku[0]);
  else haiku.push(fives.pop());

  return haiku.join('\n');
  
/*
.filter(function(e){
      return ((e.count === 5) || (e.count === 7));
    })
*/
  
};


module.exports = {
  text : text
};


