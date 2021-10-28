import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { ICommand } from '../interfaces/ICommand'
import { getList } from '../services'

const edit: ICommand = {
  data: new SlashCommandBuilder()
    .setName('editar')
    .setDescription('Edita um item da listinha.')
    .addNumberOption(option =>
      option
        .setName('id')
        .setDescription('Id do item a ser editado.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('Nova descrição do item.')
        .setRequired(true)
    ),
  run: async interaction => {
    const list = await getList(interaction)

    const id = interaction.options.getNumber('id', true)
    const newDescription = interaction.options.getString('item', true)

    const listItem = list.listItens.at(id - 1)

    if (!listItem) {
      return interaction.reply(
        'Não tem nenhum item na listinha com esse id. Ta maluco é?'
      )
    }

    if (listItem.finishedAt) {
      return interaction.reply(
        'Não é possível editar a descrição de um item que já foi marcado como pronto né 🙄.'
      )
    }

    const responseEmbed = new MessageEmbed()
      .setColor('#FDB9FC')
      .setTitle(
        `${interaction.user.username} alterou a descrição do item ${id} da lista!`
      )
      .addFields(
        {
          name: 'Descrição anterior:',
          value: listItem.item,
        },
        {
          name: 'Nova descrição:',
          value: newDescription,
        }
      )

    listItem.item = newDescription

    await list.save()

    await interaction.reply({ embeds: [responseEmbed] })
  },
}

export default edit
