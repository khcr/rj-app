#!/bin/bash
# Meteor up deploy

eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa
mupx deploy
ssh-agent -k
