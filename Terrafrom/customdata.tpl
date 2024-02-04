#!/bin/bash
sudo apt-get update -y && 
sudo snap install docker
cd /home/adminuser
git clone https://github.com/Aviral-Gupta101/online-bash-terminal.git && \
cd /home/adminuser/online-bash-terminal
sudo docker build -t web-term:0.1 . && \
sudo docker run -d -p 3000:3000 web-term:0.1