# Stock Level

Get Current stock level from existing data

Download and extract this project inside a directory

### Node Versions

node version => v18.3.0

npm Version => 8.11.0

#### install Dependencies

```
npm install
```

#### Run Project with SKU arguments

if you'll pass multiple SKU values saperated by space, you'll get the corresponding result against each SKU value.

```
npm start LTV719449/39/39 CLQ274846/07/46 SXB930757/87/87
```

if SKU value will not exists or invalid, You'll receive a corresponding error

```
npm start LTV719449/39 CLQ274846/07 SXB930757/87
```

#### To run available tests

```
npm run test
```

#### To run tests in Watch mode

```
npm run test:watch
```

# Other Way to Run Project

Install Docker and Docker-compose on your machine

Run Following command to run the Docker image and see the value of 3 by default passed args, You can change these args from Dockerfile

```
docker-compose up --build
```

This command will run tests and create docker image and will run container from that image.

## Github Repository

[Stock Repo](https://github.com/ehmusman/stock-assignment)
