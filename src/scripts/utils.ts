import fs from 'fs'
import path from 'path'
import { ICommand } from '../interfaces/ICommand'

export const readCommands = () => {
  const commands = []

  const commandFiles = fs
    .readdirSync(path.resolve(__dirname, '..', 'commands'))
    .filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const command: ICommand = require(`../commands/${file}`).default
    commands.push(command.data.toJSON())
  }

  return commands
}
