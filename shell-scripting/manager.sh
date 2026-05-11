#!/bin/bash

PASSWORD_FILE="passwords.txt"

generate_password() {
    length=$1
    site=$2

    password=$(tr -dc 'A-Za-z0-9!@#$%^&*()_+=' < /dev/urandom | head -c $length)

    echo "$site:$password" >> $PASSWORD_FILE

    echo "Generated Password for $site: $password"
}

view_passwords() {
    if [ -s $PASSWORD_FILE ]; then
        cat $PASSWORD_FILE
    else
        echo "No passwords saved yet."
    fi
}

search_password() {
    search=$1
    grep -i "$search" $PASSWORD_FILE || echo "No matching entry found."
}

delete_password() {
    delete=$1
    grep -iv "^$delete:" $PASSWORD_FILE > temp.txt
    mv temp.txt $PASSWORD_FILE

    echo "Entry deleted if it existed."
}

case $1 in
    generate)
        generate_password $2 $3
        ;;
    view)
        view_passwords
        ;;
    search)
        search_password $2
        ;;
    delete)
        delete_password $2
        ;;
    *)
        echo "Usage:"
        echo "./manager.sh generate <length> <site>"
        echo "./manager.sh view"
        echo "./manager.sh search <site>"
        echo "./manager.sh delete <site>"
        ;;
esac