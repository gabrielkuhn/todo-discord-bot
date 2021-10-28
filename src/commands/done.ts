import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { ICommand } from '../interfaces/ICommand'
import { getList } from '../services'

const done: ICommand = {
  data: new SlashCommandBuilder()
    .setName('feito')
    .setDescription('Marca um item como feito 🎉')
    .addNumberOption(option =>
      option
        .setName('id')
        .setDescription('Id do item a ser finalizado')
        .setRequired(true)
    ),
  run: async interaction => {
    const list = await getList(interaction)

    const id = interaction.options.getNumber('id', true)

    const listItem = list.listItens.at(id - 1)

    if (!listItem) {
      return interaction.reply(
        'Não tem nenhum item na listinha com esse id. Ta maluco é?'
      )
    }

    if (listItem.finishedAt) {
      return interaction.reply(
        'Esse item já está marcado como feito. Ta maluco é?'
      )
    }

    listItem.finishedAt = interaction.createdAt

    await list.save()

    const responseEmbed = new MessageEmbed()
      .setColor('#FDB9FC')
      .setTitle(
        `${interaction.user.username} marcou um item como feito. 🎉🎉✨🎈`
      )
      .setDescription(`• ${listItem.item}`)

    await interaction.reply({ embeds: [responseEmbed] })
  },
}

export default done
