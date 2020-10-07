#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "${BLUE}Downloading required files${NC}\n"

cd cloud/

# Install the saved files for GloVe embedding

mkdir -p dump
cd dump/
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/ann.json 2>&1
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/decision_tree.sav 2>&1
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/logistic_regression.sav 2>&1

wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/model.h5 2>&1
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/mtp.sav 2>&1
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/pipeline.sav 2>&1

wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/random_forest.sav 2>&1
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/scaler.pickle 2>&1
wget -q --show-progress --progress=bar:force https://github.com/Sid200026/Fraud-Detection-in-User-Transaction/releases/download/0.0.1/svc.sav 2>&1
cd ..
# Create a virtual environment and install python dependencies

echo "${BLUE}Installing a virtual environment and python dependencies${NC}\n"

python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

printf "\n${GREEN}Installation Complete${NC}\n\n"
