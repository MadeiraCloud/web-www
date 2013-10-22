#!/bin/bash

CUR_DIR=$(cd "$(dirname "$0")"; pwd)

if [ ! -f ${CUR_DIR}/log ]
then
  mkdir -p ${CUR_DIR}/log
fi
exec > ${CUR_DIR}/log/check.log 2>&1

cd /madeira/site/www

sudo git checkout master -f
sudo git reset --hard HEAD
sudo git pull origin master

sudo chown InstantForge:InstantForge /madeira/site/www/* -R

echo "update www ok!"
echo "---------------------------------"
echo
