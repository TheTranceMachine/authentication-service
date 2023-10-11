pipeline {
  agent any
  triggers {
    pollSCM '*/5 * * * *'
  }
  tools {
    nodejs "Node18"
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
  }
}
