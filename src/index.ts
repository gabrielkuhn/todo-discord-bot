import { Client, Intents, Collection } from 'discord.js'
import fs from 'fs'
import path from 'path'
import { botConfig } from './config'
import { ICommand } from './interfaces/ICommand'
import { connectDatabase } from './database/connectDatabase'
import { validateObjectValues } from './util'

const init = async () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  })

  const commands = new Collection<string, ICommand>()

  const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands'))

  for (const file of commandFiles) {
    const command: ICommand = require(`./commands/${file}`).default
    commands.set(command.data.name, command)
  }

  client.once('ready', () => {
    console.log('Bot is ready!')
  })

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    const command = commands.get(interaction.commandName)

    if (!command) return

    try {
      await command.run(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'Ocorreu um erro ao executar o comando :(',
        ephemeral: true,
      })
    }
  })

  if (!validateObjectValues(botConfig)) {
    console.error('Missing bot configurations. Check environment variables.')
    return
  }

  await connectDatabase()
  client.login(botConfig.discordToken)
}

init()
