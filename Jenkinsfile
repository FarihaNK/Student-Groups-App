pipeline {
    agent any

    environment {
        PROJECT_ID = 'your-gcp-project-id'
        CLUSTER_NAME = 'your-gke-cluster-name'
        ZONE = 'your-cluster-zone'
        DOCKER_REGISTRY = 'gcr.io/${PROJECT_ID}'
        IMAGE_NAME = 'mern-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo-url.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}'
                }
            }
        }

        stage('Deploy to GKE') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'gcp-service-account', variable: 'GOOGLE_CLOUD_KEYFILE_JSON')]) {
                        sh 'gcloud auth activate-service-account --key-file=${GOOGLE_CLOUD_KEYFILE_JSON}'
                        sh 'gcloud config set project ${PROJECT_ID}'
                        sh 'gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${ZONE}'
                        sh 'kubectl set image deployment/mern-app mern-container=${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}'
                    }
                }
            }
        }
    }
}
