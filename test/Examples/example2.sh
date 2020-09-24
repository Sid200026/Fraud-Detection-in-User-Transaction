#!/bin/bash

echo "http://127.0.0.1:5000/graphql/"

curl -X POST \
    http://127.0.0.1:5000/graphql/ \
    -H 'Content-Type: application/json' \
    -d ' {
      "query": "mutation { detectFraud(fraudInfo: {Amount: 1.2, V1: 1, V2: 2, V3: 1, V4: 2, V5: 1, V6: 2, V7: 1, V8: 2, V9: 1, V10: 2, V11: 1, V12: 2, V13: 1, V14: 2, V15: 1, V16: 2, V17: 1, V18: 2, V19: 1, V20: 2, V21: 1, V22: 2, V23: 1, V24: 2, V25: 1, V26: 2, V27: 1, V28: 2, Time: 1}) { result error message } }"
    } '
