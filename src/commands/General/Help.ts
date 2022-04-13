import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['h','menu']
        })
    }

     run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
           const n = [
           'https://c.tenor.com/r_Nenjr-gGMAAAPo/kaguya.mp4'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'general') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = `*🍭𝙃𝙀𝙇𝙇𝙊*🍭! *${M.sender.username}*\n\n•╚『kaguya-shinomiya』╝\n•*𝙡'𝙢 𑁍kaguya𑁍 𝘼 𝙗𝙤𝙩 𝙘𝙧𝙚𝙖𝙩𝙚𝙙 𝙗𝙮 SungMin 𝙩𝙤 𝙢𝙖𝙠𝙚 𝙮𝙤𝙪𝙧 𝙒𝙝𝙖𝙩𝙨𝙖𝙥𝙥 𝙚𝙣𝙟𝙤𝙮𝙖𝙗𝙡𝙚*\n\n━━❰•･❱━━\n\n╚『𝙍𝙚𝙖𝙙 𝙏𝙝𝙚 𝙍𝙪𝙡𝙚𝙨』╝\n𝑴𝒚 𝒏𝒂𝒎𝒆 𝒊𝒔 kaguya-shinomiya🍭\n\n🅼🆈 🅿🆁🅴🅵🅸🆇 🅸🆂 "."\n\n1   | *Don't Call* Bots to avoid Blocking.\n\n2 | *Don't Spam* in Groups to avoid Blocking\n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `╚━❰🍭𝑩𝒐𝒕 ${this.emojis[keys.indexOf(key)]} ${this.client.util.capitalize(key)}•𖣘❱━╝\n• \`\`\`${categories[
                    key
                ]
                    .map((command) => command.config?.command)
                     .join(', ')}\`\`\`\n\n`
            return void this.client.sendMessage(M.from, { url: chitoge }, MessageType.video, {quoted: M.WAMessage,

          mimetype: Mimetype.gif,


            caption: `${text}
 ╭─「┬──┬ ¯\_(ツ)」
│⋊ 𝕌𝕤𝕖𝕣: *${M.sender.username}*
│⋊ ℕ𝕒𝕞𝕖: shinomiya
│⋊ ℙ𝕣𝕖𝕗𝕚𝕩: ${this.client.config.prefix}
│⋊ 𝕆𝕨𝕟𝕖𝕣: *${this.client.config.prefix}mod* Ask Mods if you want to add me in your Group
│⋊ 𝕆𝕗𝕗𝕚𝕔𝕚𝕒𝕝 𝔾𝕣𝕠𝕦𝕡: https://chat.whatsapp.com/G89MF8YbNPt2zOdF6HItyD
╰────────────┈平和
❅┈[𝐇𝐚𝐯𝐞 𝐆𝐫𝐞𝐚𝐭 𝐃𝐚𝐲]┈❅
📝 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*` }
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `🚀 *Command:* ${this.client.util.capitalize(command.config?.command)}\n📉 *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n⛩ *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n♦️ *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🎐 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n💎 *Usage:* ${command.config?.usage || ''}\n\n📒 *Description:* ${command.config?.description || ''}`
        )
    }

    emojis = ['', '', '','', '', '', '', '', '', '', '', '']
}
