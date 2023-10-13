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
    pollSCM('H/15 * * * *')
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
    stage('Login') {
      steps {
        container('docker') {
          sh 'docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"'
        }
      }
    }
    stage('Push') {
      steps {
        container('docker') {
          sh 'docker push grzsmo/authentication-service:latest'
        }
      }
    }
    stage('Deploy'){
      steps{
        sh 'kubectl apply -f ./kube/deployment.yml -n development'
      }
    }
  }
  post {
    always {
      container('docker') {
        sh 'docker logout'
      }
    }
  }
}
