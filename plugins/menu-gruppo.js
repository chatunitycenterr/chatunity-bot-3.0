import { performance } from 'perf_hooks';
import path from 'path';
import { fileURLToPath } from 'url';

// Definizione di __dirname per i moduli ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    // Percorso dell'immagine
    const imagePath = path.join(__dirname, '../menu/menu.gruppo.jpeg');

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

    // Invia l'immagine con il menu
    await conn.sendMessage(
        message.chat,
        { image: { url: imagePath }, caption: menuText, ...messageOptions },
        { quoted: message }
    );
};

async function fetchProfilePictureUrl(conn, sender) {
    try {
        return await conn.profilePictureUrl(sender);
    } catch (error) {
        return 'default-profile-picture-url'; // Fallback URL in caso di errore
    }
}

handler.help = ['menugruppo'];
handler.tags = ['menugruppo'];
handler.command = /^(gruppo|menugruppo)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔 *⚡𝑴𝑬𝑵𝑼 𝐆𝐑𝐔𝐏𝐏𝐎⚡* ━┈⊷
┃◈╭━━━━━━━━━━━━━·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝐏𝐄𝐑 𝐈 𝐌𝐄𝐌𝐁𝐑𝐈*
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭─✦ MUSICA & AUDIO ✦═╗
┃◈┃• 🎵 *${prefix}play* (canzone + artista)
┃◈┃• 🎥 *${prefix}video* (canzone + artista) 
┃◈┃• 🎶 *${prefix}shazam* (audio) 
┃◈┃• 🔊 *${prefix}tomp3* (video) 
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭✦INFORMAZIONI/UTILITÀ✦╗
┃◈┃• 🌍 *${prefix}meteo* (città) 
┃◈┃• 🕒 *${prefix}orario* (città) 
┃◈┃• 🌐 *${prefix}traduci* (testo) 
┃◈┃• 📊 *${prefix}contaparole* (testo) 
┃◈┃• 🆔 *${prefix}id* (gruppo) 
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭✦IMMAGINI/MODIFICA✦╗
┃◈┃• 📷 *${prefix}hd* (foto) .
┃◈┃• 🖼️ *${prefix}rimuovisfondo* (foto) 
┃◈┃• 🔍 *${prefix}rivela* (foto) 
┃◈┃• 🖼️ *${prefix}toimg* (sticker) 
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭──✦ TESTO & STILI ✦═╗
┃◈┃• ✨ *${prefix}styletext* (testo) 
┃◈┃• 🖼️ *${prefix}ttp* (testo) 
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭✦GIOCHI/DIVERTIMENTO✦╗
┃◈┃• 🎮 *${prefix}tris* → Gioca a Tris.
┃◈┃• 🎲 *${prefix}dado* → Lancia un dado.
┃◈┃• 🎰 *${prefix}slot* → Gioca alle slot.
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭✦INTERAZIONI SOCIALI✦╗
┃◈┃• 🤗 *${prefix}abbraccia* @ 
┃◈┃• 😡 *${prefix}odio* @ 
┃◈┃• 💌 *${prefix}amore* @ 
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭─✦ VIDEO/ANIMAZIONI ✦╗
┃◈┃• 🎥 *${prefix}tovideo* (gif/sticker) 
┃◈┃• 🎞️ *${prefix}togif* (video) 
┃◈┃• 🎨 *${prefix}toanime* (foto) 
┃◈╰━━━━━━━━━━━━┈⊷
┃◈╭──✦ STICKERS & MEDIA ✦╗
┃◈┃• 🛠️ *${prefix}sticker* (foto) 
┃◈┃• 🖼️ *${prefix}png* (sticker) 
┃◈┃
┃◈┃• *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}
┃◈┃• *𝑫𝑬𝑽𝑬𝑳𝑶𝑷𝑬𝑹:* ChatUnity
┃◈└──────────┈⊷
╰━━━━━━━━━━━━━┈⊷
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${botName}
*•────────────•⟢*

  `;
}