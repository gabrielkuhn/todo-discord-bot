import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { IListItem } from '../database/models/ListModel'
import { ICommand } from '../interfaces/ICommand'
import { getList } from '../services'

const add: ICommand = {
  data: new SlashCommandBuilder()
    .setName('adicionar')
    .setDescription('Adiciona um item na listinha')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('Item a ser adicionado na listinha.')
        .setRequired(true)
    ),
  run: async interaction => {
    const list = await getList(interaction)

    const listItem: IListItem = {
      item: interaction.options.getString('item', true),
      createdAt: interaction.createdAt,
      createdBy: interaction.user.id,
    }

    list.listItens.push(listItem)

    await list.save()

    const responseEmbed = new MessageEmbed()
      .setColor('#FDB9FC')
      .setTitle(
        `${interaction.user.username} adicionou um novo item na listinha weeeee`
      )
      .setDescription(`• ${listItem.item}`)

    await interaction.reply({ embeds: [responseEmbed] })
  },
}

export default add
