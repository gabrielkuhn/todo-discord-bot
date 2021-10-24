# todo-discord-bot
This is a Node.js bot for creating a server todo list shared with all server members. It was built using Typescript, Mongoose and the [Discord.js API](https://github.com/discordjs/discord.js).

![bot-usage](https://github.com/gabrielkuhn/todo-discord-bot/blob/main/.github/usage.gif)

## Considerations:
1. The bot was builded for a very especific use-case in a private server of mine. 
It is lacking features that are crucial for production bot running on multiple servers. That being said, i don't recommend running this bot in a production environment. There are multiple other better maintened and rich in features bots out there.
2. This was built in a few hours and served mainly as a playground for the new Discord.js v13 API so the code is not as clean and maintainable as it could be. I suggest [Discord.js's guide](https://discordjs.guide) for better examples.

## Installation:
The following steps are necessary to install and run the bot.
1. Clone the repository - ` git clone https://github.com/gabrielkuhn/todo-discord-bot`
2. Install dependencies - `npm install`
3. Set all environment variables:
  - `DISCORD_TOKEN`: Your bot token. You can grab it at [Discord's developer portal](https://discordapp.com/developers).
  - `MONGO_CONNECTION_URI`: MongoDB connection URI.
  - `BOT_CLIENT_ID`: Your bot client ID.
  - `DEV_GUILD_ID`: The guild ID of your development server.
4. Build - `npm run build`
4. Deploy the slash commands - `npm run deploy:dev` for your dev server or `npm run deploy:global` to deploy to every server the bot is in.
5. Start the bot - `npm start`
