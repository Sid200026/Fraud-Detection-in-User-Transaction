# Fraud-Detection-in-User-Transaction

## Introduction

With the advent of online transactions, the number of fraudulent transactions have increased. Fraudulent transactions hinders the growth of the organisation and also affects them monetarily. Moreover, currently a small percentage of organisations use statistical analysis on their sales data to identify how their sales are performing and identify cold regions, hotspots and ways to maximise profit.   

Through this project, we aim to solve two common problems for the current generation of small and medium scale businesses :

1. Reduce fraudulent transactions
2. Improve sales through analytics

We aim to develop a real-time cloud based services for fraud detection via RESTful APIs and GraphQL and a real-time analytical dashboard plugin for sales data analysis that can be used along with any type of SQL or NOSQL databases.

## Installation

### Cloud Service

```
sh setup.sh
cd cloud/
source env/bin/activate
flask run
```

### Analytical Dashboard

Terminal 1
```
cd client/
npm install
npm start
```

Terminal 2

```
cd dashboard-backend/
npm i
```
Create a .env file similar to .env.example

```
npm run dev
```