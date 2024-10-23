pipeline {
    agent any

    environment {
        PROJECT_ID = 'aerial-gadget-435103-n6'
        CLUSTER_NAME = 'mern-cluster'
        ZONE = 'us-central1-a'
        DOCKER_REGISTRY = 'gcr.io/${PROJECT_ID}'
        FRONTEND_IMAGE_NAME = "frontend-image"
        BACKEND_IMAGE_NAME = "backend-image"
        FRONTEND_DEPLOYMENT_NAME = "frontend"  // Your frontend Kubernetes deployment name
        BACKEND_DEPLOYMENT_NAME = "backend"  // Your backend Kubernetes deployment name
        FRONTEND_CONTAINER_NAME = "frontend"  // Kubernetes container name for frontend
        BACKEND_CONTAINER_NAME = "backend"  // Kubernetes container name for backend
        GOOGLE_CREDENTIALS = credentials('jenkins_project')  // GCP service account in Jenkins credentials
        }

    stages {
        // Stage 1: Checkout code from GitHub
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/FarihaNK/Student-Groups-App.git'
            }
        }

        // Stage 2: Build Docker Images
        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            echo 'Building Frontend Docker image...'
                            sh "docker build --platform linux/amd64 -t ${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:${BUILD_NUMBER} -f frontend/Dockerfile ."
                        }
                    }
                }
                stage('Build Backend Image') {
                    steps {
                        script {
                            echo 'Building Backend Docker image...'
                            sh "docker build --platform linux/amd64 -t ${DOCKER_REGISTRY}/${BACKEND_IMAGE_NAME}:${BUILD_NUMBER} -f backend/Dockerfile ."
                        }
                    }
                }
            }
        }

        // Stage 3: Push Docker Images to GCR
        stage('Push Docker Images to GCR') {
            parallel {
                stage('Push Frontend Image') {
                    steps {
                        script {
                            echo 'Pushing Frontend Docker image to Google Container Registry...'
                            withCredentials([file(credentialsId: 'gcp-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                                sh "gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}"
                                sh "gcloud config set project ${PROJECT_ID}"
                                sh "docker push ${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:${BUILD_NUMBER}"
                            }
                        }
                    }
                }
                stage('Push Backend Image') {
                    steps {
                        script {
                            echo 'Pushing Backend Docker image to Google Container Registry...'
                            withCredentials([file(credentialsId: 'gcp-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                                sh "gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}"
                                sh "gcloud config set project ${PROJECT_ID}"
                                sh "docker push ${DOCKER_REGISTRY}/${BACKEND_IMAGE_NAME}:${BUILD_NUMBER}"
                            }
                        }
                    }
                }
            }
        }

        // Stage 4: Deploy to GKE
        stage('Deploy to GKE') {
            steps {
                script {
                    echo 'Deploying to GKE...'
                    withCredentials([file(credentialsId: 'gcp-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        sh "gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${ZONE} --project ${PROJECT_ID}"
                        // Update Frontend Deployment
                        sh "kubectl set image deployment/${FRONTEND_DEPLOYMENT_NAME} ${FRONTEND_CONTAINER_NAME}=${DOCKER_REGISTRY}/${FRONTEND_IMAGE_NAME}:${BUILD_NUMBER}"
                        // Update Backend Deployment
                        sh "kubectl set image deployment/${BACKEND_DEPLOYMENT_NAME} ${BACKEND_CONTAINER_NAME}=${DOCKER_REGISTRY}/${BACKEND_IMAGE_NAME}:${BUILD_NUMBER}"
                    }
                }
            }
        }
    }

    // Clean up workspace after the build
    post {
        always {
            cleanWs()
        }
    }
}