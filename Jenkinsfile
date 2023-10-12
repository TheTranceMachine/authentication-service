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
    dockerTool "Docker"
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
    stage('Build') {
      steps {
        sh '''#!/bin/bash
        docker build -t grzsmo/authentication-service:latest .
        '''
      }
    }
    // stage('Build image') {
    //   steps {
    //     script {
    //       dockerImage = docker.build registry + ":latest"
    //     }
    //   }
    // }
    // stage('Push image') {
    //   steps {
    //     script {
    //       docker.withRegistry( '', registryCredential ) {
    //         dockerImage.push()
    //       }
    //     } 
    //   }
    // }
  }
}
