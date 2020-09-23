#!/bin/bash

echo "Testing the server.\n"

cd Examples/

for eachfile in './*.sh'; do
    echo $eachfile
    echo '\n'
    sh $eachfile
    echo '\n'
done
