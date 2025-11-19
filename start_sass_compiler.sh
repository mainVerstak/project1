#!/bin/bash

# Получаем имя файла из параметра или используем по умолчанию
if [ -z "$1" ]; then
    FILENAME="app"
    echo "Use file name as default: app"
else
    FILENAME="$1"
    echo "Use file name: $FILENAME"
fi

echo "Run: sass --watch для $FILENAME.scss"
sass --watch ./blog/css/$FILENAME.scss:blog/css/$FILENAME.css