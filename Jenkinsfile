pipeline {
  agent any
  triggers {
    pollSCM 'H/5 * * * *'
  }
  environment {
    registry = "grzsmo/authentication-service"
    registryCredential = 'docker-credentials'
    dockerImage = ''
  }
  tools {
    nodejs "Node18"
    dockerTool "Docker-latest"
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test:ci'
      }
    }
    stage('Build image') {
      steps {
        script {
          dockerImage = docker.build registry + ":latest"
        }
      }
    }
    stage('Push image') {
      steps {
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        } 
      }
    }
  }
}
