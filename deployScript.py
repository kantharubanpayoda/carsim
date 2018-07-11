#!/usr/bin/env python
branchName = raw_input("Enter branch name: ")
appName = raw_input("Enter app name: ")

import os
os.system("heroku git:remote -a %s" % appName)
if branchName == "master":
	os.system("git push heroku %s" % branchName)
else:
	os.system("git push heroku -f %s:master" % branchName)