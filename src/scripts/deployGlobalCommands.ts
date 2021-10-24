import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { botConfig } from '../config'
import { readCommands } from './utils'

const commands = readCommands()

const rest = new REST({ version: '9' }).setToken(botConfig.discordToken)

rest
  .put(Routes.applicationCommands(botConfig.clientId), {
    body: commands,
  })
  .then(() =>
    console.log('Successfully registered global application commands.')
  )
  .catch(console.error)
