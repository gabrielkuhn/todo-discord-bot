import { CommandInteraction } from 'discord.js'
import ListModel, { IList } from '../database/models/ListModel'

export const getList = async (
  interaction: CommandInteraction
): Promise<
  IList & {
    _id: any
  }
> => {
  const discordId = interaction.guild?.id || interaction.user.id

  let list = await ListModel.findOne({
    discordId,
  })

  if (!list) {
    list = await ListModel.create({
      discordId: discordId,
      listItens: [],
    })
  }

  return list
}
