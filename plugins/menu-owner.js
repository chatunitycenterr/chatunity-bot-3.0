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
handler.command = /^(menuowner|owner)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔*💬 𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹 💬*〕━┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑹𝑰𝑺𝑬𝑹𝑽𝑨𝑻𝑰 𝑨𝑳𝑳'𝑶𝑾𝑵𝑬𝑹*
┃◈┃
┃◈┃• ⚙️ .𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐧𝐨𝐦𝐞
┃◈┃• ⚙️ .𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐧𝐨𝐦𝐞
┃◈┃• ⚙️ .𝐠𝐞𝐬𝐭𝐢𝐬𝐜𝐢 @
┃◈┃• ⚙️ .𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢
┃◈┃• ⚙️ .𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢𝐠𝐫𝐮𝐩𝐩𝐢 @
┃◈┃• ⚙️ .𝐫𝐞𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢 @
┃◈┃• ⚙️ .𝐬𝐞𝐭𝐩𝐩 (𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞)
┃◈┃• ⚙️ .𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @
┃◈┃• ⚙️ .𝐮𝐧𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @
┃◈┃• ⚙️ .𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @
┃◈┃• ⚙️ .𝐮𝐧𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @
┃◈┃• ⚙️ .𝐩𝐮𝐥𝐢𝐳𝐢𝐚 (+)
┃◈┃• ⚙️ .𝐠𝐞𝐭𝐟𝐢𝐥𝐞
┃◈┃• ⚙️ .𝐬𝐚𝐥𝐯𝐚 (𝐩𝐥𝐮𝐠𝐢𝐧)
┃◈┃• ⚙️ .𝐝𝐩 (𝐩𝐥𝐮𝐠𝐢𝐧)
┃◈┃• ⚙️ .𝐠𝐞𝐭𝐩𝐥𝐮𝐠𝐢𝐧
┃◈┃• ⚙️ .𝐣𝐨𝐢𝐧 + 𝐥𝐢𝐧𝐤
┃◈┃• ⚙️ .𝐨𝐮𝐭
┃◈┃• ⚙️ .𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 (?)
┃◈┃• ⚙️ .𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨
┃◈┃• ⚙️ .𝐠𝐨𝐝𝐦𝐨𝐝𝐞 {𝐚𝐮𝐭𝐨𝐚𝐝𝐦𝐢𝐧}
┃◈┃• ⚙️ .𝐚𝐳𝐳𝐞𝐫𝐚 @
┃◈┃• ⚙️ .𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢 (𝐧𝐮𝐦. 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢) @
┃◈┃• ⚙️ .𝐫𝐢𝐦𝐮𝐨𝐯𝐢 (𝐧𝐮𝐦. 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢) @
┃◈┃
┃◈└───────────┈⊷
╰━━━━━━━━━━━━━┈·๏
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botName}
*•────────────•⟢*
`.trim();
}
