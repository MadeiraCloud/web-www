1. copy hook.* to /home/ec2-user/www of live

2.install node module
npm install gith

3.run server
node hook.js

4.add 3000 port to SecurityGroup of live instace
allow 204.232.175.64/27 and 192.30.252.0/22 to access 3000 port of live instance


5.config github webhook
Set WebHook URLs to "http://54.211.46.205:3000"

Click Tesk Hook



