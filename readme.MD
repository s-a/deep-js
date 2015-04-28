# deep-js
[![Build Status](http://img.shields.io/travis/s-a/deep-js.svg?style=flat-square)](https://travis-ci.org/s-a/deep-js)
[![Codacy Badge](https://www.codacy.com/project/badge/1ffcf7a0ed0341d8b21bb6c17655c013)](https://www.codacy.com/app/stephanahlf/deep-js)
[![Coverage Status](https://coveralls.io/repos/s-a/deep-js/badge.svg?branch=master)](https://coveralls.io/r/s-a/deep-js?branch=master)
[![NPM Version](http://img.shields.io/npm/v/deep-js.svg?style=flat-square)](https://www.npmjs.org/package/deep-js)
[![Dependencies](https://img.shields.io/david/s-a/deep-js.svg)](#)
[![Development Dependencies](https://img.shields.io/david/dev/s-a/deep-js.svg)](#)

## About
A commandline app documenting Javascript  
// work is heavy @ progress ( feel free to contribute! )


## Todo
 - filter and order output for rendering
 - pipe multiple JavaScript files for document output
 - identify and order namespaces
 - resolve this within functions

## Installation

 - ```npm install -g deep-js```

## Options

 - h, --help            output usage information
 - V, --version         output the version number
 - f, --file <Sting>    JavaScript file to parse
 - d, --describe <items> comma seperated list of JavaScript names that should be described
 - o, --output <Sting>  Documentation output file

## Examples
 - ```deep --file=use-case-main.js --describe=* --output=lib-doc/use-case-main.js.MD``` will create [/lib-doc/use-case-main.js.MD](/lib-doc/use-case-main.js.MD)

## Develpment setup
  - ```npm install -g mocha```
  - ```npm install -g coveralls```

## Contributing

 - Fork it!
 - Create your feature branch: `git checkout -b my-new-feature`
 - Add a test for each new code
 - Check the coverage ```npm run cover-html``` will produce a file called ```coverage.html```
 - Add add your new code
 - Run the tests: `npm test`
 - Commit your changes: `git commit -am 'Add some feature'`
 - Push to the branch: `git push origin my-new-feature`
 - Submit a pull request :D


## License

### The MIT License (MIT)
Copyright (C) 2015 Stephan Ahlf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### GPLv3

Copyright (C) 2015  Stephan Ahlf

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.