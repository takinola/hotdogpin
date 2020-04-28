# Payment Intents Exercise

## Dependencies
- nodejs v13+

## Get started

### In Stripe Dashboard
1. Switch API into test mode
2. Copy API publishable and secret keys
3. Set webhook trigger for `payment_intent.succeeded` to destination `/payment_success`

### In CLI
1. Clone repository
2. Navigate to main directory and run `npm install` to install node module dependencies
3. Navigate to `env` folder and create `environments.json` file (format should be `{secret: <stripe API secret key>}`)
4. Navigate to the main directory and start the service with `node app` command.  There will be a notification of `Express server listening on port XXXX` if the service is running correctly

### In Ngrok.io (or similar service)
1. Create a public url to expose the node http server.  By default, the server listens to port 2000


### In Browser
1. Navigate to the `/hotdog` path to view the purchase screen

## Notes
- For simplicity, the payment form assumes the following details about the card user (name: Coe Vide)
- Successful payments are logged to `/logs/payment_log`