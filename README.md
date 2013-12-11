haikfu
======

Haiku generating node module

[![Build Status](https://travis-ci.org/tleen/haikfu.png?branch=master)](https://travis-ci.org/tleen/haikfu)


## Usage

```javascript

var haikfu = require('haikfu');

// the .text() function accepts text input and tries to create a haiku from the contents
// errors will be thrown if input is insufficient for the task 
var haiku = haikfu.text('this line has five sounds; this line should have seven sounds. this line is five too.');
console.log(haiku);

// this line is five too
// this line should have seven sounds
// this line has five sounds

// - or -

// this line has five sounds
// this line should have seven sounds
// this line is five too

```
