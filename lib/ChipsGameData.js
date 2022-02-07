'use strict';

var imports = require('soop').imports();

/**
 * Module dependencies.
 */

var bitcore = require('bitcore'),
  Rpc = imports.rpc || require('./Rpc'),
  util = bitcore.util,
  networks = bitcore.networks,
  levelup = require('levelup'),
  async = require('async'),
  config = require('../config/config'),
  assert = require('assert'),
  Script = bitcore.Script,
  bitcoreUtil = bitcore.util,
  fs = require('fs'),
  buffertools = require('buffertools');

var logger = require('./logger').logger;

var ChipsGameDataDb = function() {
  ChipsGameDataDb.super(this, arguments);
  this.network = config.network === 'testnet' ? networks.testnet : networks.livenet;
  this.gameData = {};
};

ChipsGameDataDb.prototype.sync = function(page, cb) {
  logger.debug('game data');

  var out = [];

  try {
    var gd = JSON.parse(fs.readFileSync('./gamedata.json'));
    logger.debug('total CHIPS game data objects', Object.keys(gd).length);

    var gdKeys = Object.keys(gd);

    for (var i = 0; i < gdKeys.length; i++) {
      gd[gdKeys[i]].txid = gdKeys[i];
      out.push(gd[gdKeys[i]]);
    }
  } catch (e) {}

  this.gameData = out;
}

module.exports = require('soop')(ChipsGameDataDb);
