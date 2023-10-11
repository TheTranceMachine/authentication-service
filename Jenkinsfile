pipeline {
    agent any
    triggers {
      pollSCM '*/5 * * * *'
    }
    tools {
      nodejs "node"
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
    }
}
