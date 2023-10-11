pipeline {
    agent any
    triggers {
      pollSCM '*/5 * * * *'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
