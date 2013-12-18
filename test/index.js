'use strict';

var haikfu = require('..'),
should = require('should');


var samples = [
'this line has five sounds. this line should have seven sounds. this line is five too',
'this line has five sounds, this line should have seven sounds. this line is five too',
'this line has five sounds; this line should have seven sounds. this line is five too',
['this line has five sounds','this line should have seven sounds','this line is five too'].join('\n')
];

describe('Library loads', function(){
  it('Should have a .text function', function(){
    haikfu.should.have.property('text');
  });
});


describe('.text function works on samples', function(){
  samples.forEach(function(sample){
    var result = haikfu.text(sample).split('\n');

    it('Should have sample size of 3', function(){
      result.should.have.length(3);
    });

    it('Should match the pattern of 5-7-5', function(){
      result[0].should.match(/five/);
      result[1].should.match(/seven/);
      result[2].should.match(/five/);
    });
  });
});

describe('bad input throws errors', function(){
  it('.text function should throw error on empty input', function(){
    (function(){
      haikfu.text('');
    }).should.throwError(/^Empty.*/);
  });

  it('.text function should throw error on insufficient 5 syllable input', function(){
    (function(){
      haikfu.text('this line has four; this line should have seven sounds. this line bad too');
    }).should.throwError(/^No 5.*/);
  });

  it('.text function should throw error on insufficient 7 syllable input', function(){
    (function(){
      haikfu.text('this line has five sounds; this line should have eight or nine sounds. this line is five too');
    }).should.throwError(/^No 7.*/);
  });

});

describe('.text function handles low variety input', function(){
  var result = haikfu.text('this line has five sounds. this line should have seven sounds. this line is four').split('\n');

  it('should have three lines', function(){
    result.should.have.length(3);
  });

  it('should repeat on single five syllable input', function(){
    result[0].should.equal('this line has five sounds');
    result[1].should.equal('this line should have seven sounds');
    result[2].should.equal('this line has five sounds');
  });
});

