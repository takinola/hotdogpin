'use strict';

const fs = require('fs')
, path = require('path')
;

exports.initialize = initialize;

function initialize(app) {
  return new Promise((resolve, reject)=>{
    return resolve();
  })
}

exports.getStripeSecret = getStripeSecret;

function getStripeSecret() {
  const pathToEnvironmentFile = path.join(__dirname, '..', 'env', 'environment.json');
  const encoding = 'utf-8';
  const secret = fs.readFileSync(pathToEnvironmentFile, encoding);
  return secret;
}