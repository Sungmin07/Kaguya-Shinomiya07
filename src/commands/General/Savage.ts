import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'sungmin',
            description: 'Displays info about akuma.',
            category: 'general',
            usage: `${client.config.prefix}savage`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://i.ibb.co/zXtHSYD/a1ce72a00be1fe93d701f265e49b8dc9.jpg'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.image, {quoted:M.WAMessage,
            mimetype: Mimetype.jpeg,
            caption: `🔥𝙃𝙀𝙇𝙇𝙊!❄️I'm Sungmin an wholesomeguy who is handsome af , loves watching anime & likes programming and business stuffs . I am just a ordinary human being with wholesome extraordinary talent❤️  
            
🍀𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥;
Wa.me/+918822469980

🍀𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆;
I don't use facebook lol🐦
 
🍀𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈;
https://www.instagram.com/animequotendious

⪼𝖲𝖾𝖾 𝗒𝖺𝗁 💟` }
        )
    }
}
