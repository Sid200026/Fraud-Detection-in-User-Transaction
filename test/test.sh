#!/bin/bash

echo "Testing the server.\n"

cd Examples/

example_file=$(ls ./*.sh)
for eachfile in $example_file; do
    echo $eachfile
    echo '\n'
    sh $eachfile
    echo '\n'
done
