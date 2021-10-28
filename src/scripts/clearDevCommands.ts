import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { botConfig } from '../config'
import { validateObjectValues } from '../util'

if (!validateObjectValues(botConfig)) {
  throw new Error('Missing bot configurations. Check environment variables.')
}

const rest = new REST({ version: '9' }).setToken(botConfig.discordToken)

rest
  .put(
    Routes.applicationGuildCommands(botConfig.clientId, botConfig.devGuildId),
    {
      body: [],
    }
  )
  .then(() =>
    console.log('Successfully cleared application commands on dev server')
  )
  .catch(console.error)
