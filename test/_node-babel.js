'use strict';

global.expect = require('expect.js');

require('./_helper');

require('regenerator/runtime');

global.System = require('../lib/index-babel').System;
global.Reflect = require('../lib/index-babel').Reflect;

require('./system.normalize.spec');
require('./system.spec');

require('./custom-loader');
require('./custom-loader.spec');
