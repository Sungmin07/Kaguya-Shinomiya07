/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "broadcast",
			description:
				"Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
			aliases: ["bcast", "announcement", "bc"],
			category: "dev",
			dm: true,
			usage: `${client.config.prefix}bc`,
			modsOnly: true,
			baseXp: 20000,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Please provide the Broadcast Message.`));
		const term = joined.trim();
		const gifs = [
			"https://c.tenor.com/2t5_yT1rASwAAAPo/kaguya-sama-manga.mp4",
			"https://c.tenor.com/5Cnfne03_qIAAAPo/shakes-kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen.mp4",
			"https://c.tenor.com/z5BnPO_0ArwAAAPo/kaguya-sama-love-is-war-kaguya-shinomiya.mp4",
			"https://c.tenor.com/whzIT6_OtIQAAAPo/kaguya-anime.mp4",
			"https://c.tenor.com/WzaIC9WHmogAAAPo/triggered-triggered-kaguya.mp4",
			"https://c.tenor.com/piN6MS0IDyEAAAPo/kaguya.mp4",
			"https://c.tenor.com/U9waxnLe8-YAAAPo/kaguya-shinomiya.mp4",
		];
		const selected = gifs[Math.floor(Math.random() * gifs.length)];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		for (let i = 0; i < chats.length; i++) {
			const text = `*💕「SHINOMIYA BROADCAST」💕*\n\n${term}\n\n Regards ~ *${M.sender.username}*`;
			this.client.sendMessage(chats[i], { url: selected }, MessageType.video, {
				mimetype: Mimetype.gif,
				caption: `${text}`,
				contextInfo: {
					mentionedJid: M.groupMetadata?.participants.map((user) => user.jid),
				},
			});
		}
		await M.reply(`✅ Broadcast Message sent to *${chats.length} groups*.`);
	};
}
