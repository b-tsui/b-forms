# B-forms
B-forms is a form generation app that allows your create better forms! Create, share and analyze your forms with b-forms.

Check us out here: [B-forms](https://www.bforms.dev)

To log-in as a user, you can either use your existing github or gmail information via Auth0, or using the email email of demo@demo.com with the password demo123!


Backend for app here: [B-forms Backend](https://github.com/b-tsui/b-forms-api)


## Technologies implented:
  - Javascript
  - Node.js
  - React.js with hooks
  - MongoDB
  - Mongoose
  - GraphQL
  - Apollo
  - Recharts
  - Auth0
  - HTML5
  - CSS3
  - Material UI
  - Google Cloud - App Engine(serverless)
  - Google Cloud - Cloud Run

# Deployment

Frontend (Google Cloud using docker and nginx):
gcloud builds submit --tag gcr.io/bforms/cra-cloud-run
gcloud beta run deploy --image gcr.io/bforms/cra-cloud-run --platform managed
