'use strict';

var haikfu = require('..'),
should = require('should');


var samples = [
'this line has five sounds. this line should have seven sounds. this line is five too',
'this line has five sounds, this line should have seven sounds. this line is five too',
'this line has five sounds; this line should have seven sounds. this line is five too',
['this line has five sounds','this line should have seven sounds','this line is five too'].join('\n')
];

describe('.text function exists', function(){
  haikfu.should.have.property('text');
});


describe('.text function works on samples', function(){
  samples.forEach(function(sample){
    var result = haikfu.text(sample).split('\n');
    result.should.have.length(3);
    result[0].should.match(/five/);
    result[1].should.match(/seven/);
    result[2].should.match(/five/);
  });
});

describe('.text function throws error on empty input', function(){
  (function(){
    haikfu.text('');
  }).should.throwError(/^Empty.*/);
});

describe('.text function throws error on insufficient input', function(){
  (function(){
    haikfu.text('this line has four; this line should have seven sounds. this line bad too');
  }).should.throwError(/^No 5.*/);

  (function(){
    haikfu.text('this line has five sounds; this line should have eight or nine sounds. this line is five too');
  }).should.throwError(/^No 7.*/);
});

describe('.text function repeats on single five', function(){
  var result = haikfu.text('this line has five sounds. this line should have seven sounds. this line is four').split('\n');
  result.should.have.length(3);
  result[0].should.equal('this line has five sounds');
  result[1].should.equal('this line should have seven sounds');
  result[2].should.equal('this line has five sounds');
});

