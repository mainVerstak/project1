#!/bin/bash

if [-z "$1"]; then
    DIRRECTORYNAME="estate-complexes-redesign"
    echo "Use default dirrectory name: estate-complexes-redesign"
else
    DIRRECTORYNAME="$1"
    echo "Use dirrectory name: $DIRRECTORYNAME"
fi

if [ -z "$2" ]; then
    FILENAME="app"
    echo "Use file name as default: app"
else
    FILENAME="$2"
    echo "Use file name: $FILENAME"
fi

echo "Run: sass --watch for $FILENAME.scss"
sass --watch ./$DIRRECTORYNAME/css/$FILENAME.scss:./$DIRRECTORYNAME/css/$FILENAME.css