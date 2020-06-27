### Deployment

Frontend (Google Cloud using docker and nginx):
gcloud builds submit --tag gcr.io/bforms/cra-cloud-run
gcloud beta run deploy --image gcr.io/bforms/cra-cloud-run --platform managed
