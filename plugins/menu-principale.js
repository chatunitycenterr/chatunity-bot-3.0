import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);
    
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    // Invia la foto con il menu
    const imagePath = './chatunitybot.jpeg';
    await conn.sendMessage(message.chat, { image: { url: imagePath }, caption: menuText, ...messageOptions }, { quoted: message });
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail'; // Fallback thumbnail in caso di errore
    }
}

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔*💬 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 💬*〕━┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰*
┃◈┃
┃◈┃• ⚙️ ${prefix}𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢
┃◈┃• 📥 ${prefix}𝐈𝐧𝐬𝐭𝐚𝐥𝐥𝐚
┃◈┃• 👑 ${prefix}𝐩𝐫𝐨𝐩𝐫𝐢𝐞𝐭𝐚𝐫𝐢𝐨
┃◈┃• 🛡️ ${prefix}𝐀𝐝𝐦𝐢𝐧
┃◈┃• 👥 ${prefix}𝐆𝐫𝐮𝐩𝐩𝐨
┃◈┃• 📜 ${prefix}𝐒𝐜𝐫𝐢𝐩𝐭
┃◈┃• 🤖 ${prefix}𝐢𝐚
┃◈┃• ⚡ ${prefix}𝐒𝐭𝐚𝐭𝐨
┃◈┃• 🚀 ${prefix}𝐏𝐢𝐧𝐠/𝐒𝐩𝐞𝐞𝐝𝐭𝐞𝐬𝐭
┃◈┃
┃◈└───────────┈⊷
╰━━━━━━━━━━━━━┈·๏
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botName}
*•────────────•⟢*
`.trim();
}
