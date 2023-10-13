pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: docker
            image: docker:latest
            command:
            - cat
            tty: true
            volumeMounts:
             - mountPath: /var/run/docker.sock
               name: docker-sock
          volumes:
          - name: docker-sock
            hostPath:
              path: /var/run/docker.sock    
        '''
    }
  }
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
    // stage('Build') {
    //   steps {
    //     container('docker') {
    //       sh 'docker build -t grzsmo/authentication-service:latest .'
    //     }
    //   }
    // }
    stage('Build image') {
      steps {
        container('docker') {
          dockerImage = docker.build registry + ":latest"
        }
      }
    }
    stage('Push image') {
      steps {
        container('docker') {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        } 
      }
    }
  }
}
