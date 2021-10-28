import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { ICommand } from '../interfaces/ICommand'
import { getList } from '../services'
import { formatDateRelative } from '../util'

const info: ICommand = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Informações sobre um item da listinha 🧐')
    .addNumberOption(option =>
      option
        .setName('id')
        .setDescription('Id do item a ser consultado')
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

    const responseEmbed = new MessageEmbed()
      .setColor('#FDB9FC')
      .setTitle(`${id}. ${listItem.item}`)
      .addFields(
        {
          name: 'Adicionado por:',
          value: `<@${listItem.createdBy}>`,
        },
        {
          name: 'Adicionado em:',
          value: formatDateRelative(listItem.createdAt),
        },
        {
          name: 'Finalizado em:',
          value: listItem.finishedAt
            ? formatDateRelative(listItem.finishedAt)
            : 'Ainda não foi finalizado D:',
        }
      )

    await interaction.reply({ embeds: [responseEmbed] })
  },
}

export default info
