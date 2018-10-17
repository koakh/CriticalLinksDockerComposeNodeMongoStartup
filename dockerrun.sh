#!/bin/sh
IMAGE=microservice-node-mongo-startup 
docker run --rm -p 3000:3000 --name $IMAGE $IMAGE
