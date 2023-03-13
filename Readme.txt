Download and extract this project inside a directory


node version => v18.3.0
npm Version => 8.11.0
install dependencies using "npm install"


To run the project use "npm start" command
You have to pass the SKU value using the nodejs arguments using the command line

like 

=> npm start arg1 arg2 arg3

if you'll pass multiple SKU values saperated by space, you'll get the corresponding result against each SKU value.

if SKU value will not exists, You'll receive a corresponding error

                "Command with multiple valid args"

=> npm start LTV719449/39/39 CLQ274846/07/46 SXB930757/87/87


            "To run available tests, Run following command"
=> npm run test


            "To run tests in Watch mode, Run following command"
=> npm run test:watch


============= Other Way to Run Project ==================
=> Install Docker and Docker-compose on your machine
=> Run Following command to run the Docker image and see the value of 3 by default passed args, You can change these args from Dockerfile
    "docker-compose up --build"
This command will run tests and create docker image and will run container from that image. 
