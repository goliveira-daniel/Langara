#!/bin/bash
for i in {1..5..2}
    do 
        for j in {1..5..1}
        do 
        echo -n $(($i*$j)) " "
        done
    echo $i
done