pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/raffathamires/exercicio-api-rest-cypress.git'
                bat 'npm install'
            }
        }
	stage('Subindo Serverest') {
            steps {
                bat 'npx serverest'
            }
        }
        stage('Test') {
            steps {
				bat '''set NO_COLOR=1
				npm run cy:run'''
            }
        }
    }
}
