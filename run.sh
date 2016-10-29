#!/bin/bash
docker run -i --memory-swappiness=0 -v `realpath .`:/app -w /app  -t node:7 $@
