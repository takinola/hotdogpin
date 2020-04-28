'use strict';

const path = require('path')
  , express = require('express')
  , hotdog = require('../lib/hotdog.js')
  ;

module.exports = function(app){

  app.get('/hotdog', (req, res)=>{
    let stripeSecret = hotdog.getStripeSecret();
    if(!stripeSecret){
      return res.send('please create an environment.json file with your Stripe credentials')
    }

    stripeSecret = JSON.parse(stripeSecret).secret;
    const stripe= require('stripe')(stripeSecret);

    stripe.paymentIntents.create({
      amount: 1999,
      currency: 'usd',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
    })
    .then((paymentIntent)=>{
      res.render('shopfront', {secret: paymentIntent.client_secret})
    })
    .catch((err)=>{
console.log('err: ', err)
      res.send(err)
    })
  })

  app.get('/notfound', (req, res)=>{
    res.sendStatus(404);
  })
}