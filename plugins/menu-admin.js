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
    const imagePath = './menu/menuadmin.jpeg';
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

handler.help = ['menuadmin'];
handler.tags = ['menuadmin'];
handler.command = /^(menuadmin|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔*💬 𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵 💬*〕━┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑨𝑫𝑴𝑰𝑵 👑*
┃◈┃
┃◈┃• 👑 .𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐢 / 𝐦𝐞𝐭𝐭𝐢𝐚𝐝𝐦𝐢
┃◈┃• 👑 .𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐢 / 𝐭𝐨𝐠𝐥𝐢𝐚𝐝𝐦𝐢𝐧
┃◈┃• 👑 .𝐰𝐚𝐫𝐧 / 𝐮𝐧𝐰𝐚𝐫𝐧
┃◈┃• 👑 .𝐦𝐮𝐭𝐚 / 𝐬𝐦𝐮𝐭𝐚
┃◈┃• 👑 .𝐡𝐢𝐝𝐞𝐭𝐚𝐠
┃◈┃• 👑 .𝐭𝐚𝐠𝐚𝐥𝐥 / 𝐦𝐚𝐫𝐜𝐚𝐫
┃◈┃• 👑 .𝐚𝐩𝐞𝐫𝐭𝐨 / 𝐜𝐡𝐢𝐮𝐬𝐨
┃◈┃• 👑 .𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞
┃◈┃• 👑 .𝐬𝐞𝐭𝐛𝐲𝐞
┃◈┃• 👑 .𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢
┃◈┃• 👑 .𝐥𝐢𝐬𝐭𝐚𝐧𝐮𝐦 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨
┃◈┃• 👑 .𝐩𝐮𝐥𝐢𝐳𝐢𝐚 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨
┃◈┃
┃◈└───────────┈⊷
╰━━━━━━━━━━━━━┈·๏
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botName}
*•────────────•⟢*
`.trim();
}
