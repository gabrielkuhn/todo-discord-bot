import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import ListModel from '../database/models/ListModel'
import { ICommand } from '../interfaces/ICommand'

const list: ICommand = {
  data: new SlashCommandBuilder().setName('lista').setDescription('Listinha'),
  run: async interaction => {
    const list = await ListModel.findOne({
      discordId: interaction.guild?.id || interaction.user.id,
    })

    if (!list) {
      await interaction.reply(
        'Ainda não tem nenhuma listinha criada nesse canal :('
      )
      return
    }

    const responseEmbed = new MessageEmbed()
      .setColor('#FDB9FC')
      .setTitle(`Listinha u.u`)
      .setImage('https://i.imgur.com/MqGBqZs.gif')
      .setDescription(
        list.listItens
          .map((listItem, index) =>
            listItem.finishedAt
              ? `~~${index + 1}. ${listItem.item}~~`
              : `${index + 1}. ${listItem.item}`
          )
          .join('\n')
      )

    await interaction.reply({ embeds: [responseEmbed] })
  },
}

export default list
