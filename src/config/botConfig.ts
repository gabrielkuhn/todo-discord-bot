interface IBotconfig {
  discordToken: string
  clientId: string
  devGuildId: string
}

export const botConfig: IBotconfig = {
  discordToken: process.env.DISCORD_TOKEN || '',
  clientId: process.env.BOT_CLIENT_ID || '',
  devGuildId: process.env.DEV_GUILD_ID || '',
}
