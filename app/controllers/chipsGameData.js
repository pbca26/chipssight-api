'use strict';

/**
 * Module dependencies.
 */
var common = require('./common');
var async = require('async');
var gameDataDb = require('../../lib/ChipsGameDataDb').default();
var logger = require('../../lib/logger').logger;

/**
 * Show block
 */
exports.list = function(req, res) {
  var page = Number(req.query.page) || 0;
  var pageLength = 10;
  var txLength = gameDataDb.gameData.length;
  var pagesTotal = Math.ceil(txLength / pageLength);
  var txs, dataSet;
  
  if (page) {
    if (page > pagesTotal || page < 1) {
      res.jsonp({
        err: 'wrong page number',
        code: -777,
      });
    } else {
      var start = page * pageLength;
      var end = (page + 1) * pageLength;
      txs = gameDataDb.gameData.slice(start, end);

      dataSet = {
        init: start,
        end: end,
      }
    }
  } else {
    txs = gameDataDb.gameData.slice(0, pageLength);
  }

  res.jsonp({
    txs: txs,
    dataSet: dataSet,
    pagesTotal: pagesTotal,
  });
};
