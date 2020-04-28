'use strict';

let express = require('express')
  , path = require('path')
  , fs = require('fs')
  , hotdog = require('../lib/hotdog')
  ;

module.exports = function(app){

  app.post('/payment_success', (req, res)=>{
    const pathToLogFile = path.join(__dirname, '..', 'logs', 'payment_log');
    const paymentLog = fs.createWriteStream(pathToLogFile, {flags: 'a'})
    .on('error', (err)=>{
      console.log('error opening/appending to payment log - ', err.message)
    })

    const data = req.body.data.object.charges.data;
    let record = '';
    data.forEach((dataObject)=>{
      record += `customer: ${dataObject.billing_details.name}; amount: ${dataObject.amount}; currency: ${dataObject.currency}; time: ${new Date().toString()}\n\r`
    })

    paymentLog.write(record)

    res.sendStatus(200);
  })
}