import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { botConfig } from '../config'
import { validateObjectValues } from '../util'
import { readCommands } from './utils'

if (!validateObjectValues(botConfig)) {
  throw new Error('Missing bot configurations. Check environment variables.')
}

const commands = readCommands()

const rest = new REST({ version: '9' }).setToken(botConfig.discordToken)

rest
  .put(
    Routes.applicationGuildCommands(botConfig.clientId, botConfig.devGuildId),
    {
      body: commands,
    }
  )
  .then(() =>
    console.log('Successfully registered application commands on dev server')
  )
  .catch(console.error)
