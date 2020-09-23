#!/bin/bash

curl --location --request POST 'http://127.0.0.1:5000/rest/fraud' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Time": 123,
    "V1": 1,
    "V2": 1,
    "V3": 1,
    "V4": 1,
    "V5": 1,
    "V6": 1,
    "V7": 1,
    "V8": 1,
    "V9": 1,
    "V10": 1,
    "V11": 1,
    "V12": 1,
    "V13": 1,
    "V14": 1,
    "V15": 1,
    "V16": 1,
    "V17": 1,
    "V18": 1,
    "V19": 1,
    "V20": 1,
    "V21": 1,
    "V22": 1,
    "V23": 1,
    "V24": 1,
    "V25": 1,
    "V26": 1,
    "V27": 1,
    "V28": 1,
    "Amount": 1.4
}'