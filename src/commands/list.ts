import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import { ICommand } from '../interfaces/ICommand'
import { getList } from '../services'

const list: ICommand = {
  data: new SlashCommandBuilder().setName('lista').setDescription('Listinha'),
  run: async interaction => {
    const list = await getList(interaction)

    const responseEmbed = new MessageEmbed()
      .setColor('#FDB9FC')
      .setTitle(`Listinha u.u`)
      .setImage('https://i.imgur.com/MqGBqZs.gif')
      .setDescription(
        list.listItens.length
          ? list.listItens
              .map((listItem, index) =>
                listItem.finishedAt
                  ? `~~${index + 1}. ${listItem.item}~~ ✓`
                  : `${index + 1}. ${listItem.item}`
              )
              .join('\n')
          : 'Ainda não tem nenhum item na listinha :(. Você pode utilizar o comando **/adicionar** para incluir o primeiro!'
      )

    await interaction.reply({ embeds: [responseEmbed] })
  },
}

export default list
