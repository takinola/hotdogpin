# Payment Intents Exercise

## Dependencies
- nodejs v13+

## Get started
1. Clone repository
2. Navigate to directory and run `npm install` to install node module dependencies
3. Create `environments.json` file inside `env` folder (format should be `{secret: <stripe API secret key>}`)
4. Use a service like ngrok.io to create a public url to expose the node http server.  By default, the server listens to port 2000
5. Navigate to the directory of the app and start the service with `node app` command on the CLI.  There will be a notification of 'Express server listening on port XXXX' if the service is running correctly
6. In browser, navigate to the '/hotdog' path to view the purchase screen


## Notes
- For simplicity, the payment form assumes the following details about the card user (name: Coe Vide)
- Successful payments are logged to `/logs/payment_log`

## Stripe Dashboard
- Set credentials to use Test data (if using test data)
- Set destination of webhook for payment_intent.succeeded to /payment_success