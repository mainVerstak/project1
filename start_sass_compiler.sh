#!/bin/bash

# Получаем имя файла из параметра или используем по умолчанию
if [ -z "$1" ]; then
    FILENAME="app"
    echo "Используется имя файла по умолчанию: app"
else
    FILENAME="$1"
    echo "Используется имя файла: $FILENAME"
fi

echo "Запуск: sass --watch для $FILENAME.scss"
sass --watch ./estate-complexes-redesign/css/$FILENAME.scss:estate-complexes-redesign/css/$FILENAME.css