import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
                        command: "happy_birthday",
                        aliases: ["hbd", "hhp"],
			description: "use for birthday wish",
			category: "general",
			usage: `${client.config.prefix}happy_birthday`,
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : ''
        if (!username) {
            const contact = this.client.getContact(user)
            username = contact.notify || contact.vname || contact.name || user.split('@')[0]
        }
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`Profile Picture not Accessible of ${username}`)
            pfp =
                'https://i.ibb.co/fXthnqS/images-q-tbn-ANd9-Gc-Szdu2bzlxoe2l-O3xz-Wf-Tx2h2-J79-Bs9-ARFs-Bw-usqp-CAU.jpg'
        }
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://i.ibb.co/z8xnbFg/images-q-tbn-ANd9-Gc-QGXwt-G4-PRZjhhq-L6si-Aw7-YETUj-XGMfcn-FBWw-usqp-CAU.jpg'
            ),
            MessageType.image,
            undefined,
            undefined,
            `Cheers to you for another trip around the sun The day is all yours 🔥Maybe you receive the greatest of joys and everlasting bliss. You are a gift yourself, and you deserve the best of everything. Happy birthday•\n 🥂🎂🔥 *HAPPY BIRTHDAY* 🎂🥂\n🥳🥳🥳✨ Enyoy this special day in celebration of a most wonderful you🙂🥳🤩😍-SungMin*@${user.split('@')[0]}*\n\n`
        )
    }
}
