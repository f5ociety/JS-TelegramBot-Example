# f5ociety report bot

Simple Telegram Bot written in JavaScript (With Node.JS lib [**telegraf**](https://github.com/telegraf/telegraf)).

This bot was created to make it easier for us to collect Feedback and pass it directly to the developers (that's us). It can not do much yet, but we will definitely develop it.

# Commands 
- `/help` - Show commands list 
- `/echo text` - Outputs the text you wrote after the echo
- `/ping` - Answer "Pong!" to you 
- `/report text` - You write anything that you want and it's goingt to us (please write about errors and bugs, I'm serious)
- `/get_id` - Show you your own Telegram id
- `/json` - Show message information
- `/ivan` - Quiz about developer Ivan
- `/sergej` - Quiz about developer Sergej
- `/сat` - Send a random cat

Also you can find this commands (on russian) in [**this file**](./help.txt).

# Setting secrets
Api key (From [**BotFather**](https://t.me/BotFather)), ID and username of the group where the developers are located must be inserted into the `.env` file.  
Example:
```
API_KEY="1111111111:aaaaaaaaaaaaa-aaaaaaaaaaaaaaaaa-aaa"
OUR_GROUP_ID=-1111111111111
OUR_GROUP_URL="examplegroup"
```
