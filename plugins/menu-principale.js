import { performance } from 'perf_hooks';

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
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        return 'default-thumbnail'; // Fallback thumbnail in case of error
    }
}

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `const commandList = `
╭━━〔 *⚡ 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 ⚡* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰*
┃◈┃• 
┃◈┃• ⚙️ ${usedPrefix}𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢
┃◈┃• 📥 ${usedPrefix}𝐈𝐧𝐬𝐭𝐚𝐥𝐥𝐚
┃◈┃• 👑 ${usedPrefix}𝐩𝐫𝐨𝐩𝐫𝐢𝐞𝐭𝐚𝐫𝐢𝐨
┃◈┃• 🛡️ ${usedPrefix}𝐀𝐝𝐦𝐢𝐧
┃◈┃• 👥 ${usedPrefix}𝐆𝐫𝐮𝐩𝐩𝐨
┃◈┃• 📜 ${usedPrefix}𝐒𝐜𝐫𝐢𝐩𝐭
┃◈┃• 🤖 ${usedPrefix}𝐢𝐚
┃◈┃• ⚡ ${usedPrefix}𝐒𝐭𝐚𝐭𝐨
┃◈┃• 🚀 ${usedPrefix}𝐏𝐢𝐧𝐠/𝐒𝐩𝐞𝐞𝐝𝐭𝐞𝐬𝐭
┃◈┃• 
┃◈└───────────┈⊷
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botName}
*•────────────•⟢*
`.trim();
    `;
}
