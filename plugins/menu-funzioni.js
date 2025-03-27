import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  const chat = global.db.data.chats[m.chat];
  const functions = {
    " Detect": chat.detect,
    " GPT AI": chat.gpt,
    " JadiBot": chat.jadibot,
    " Benvenuto": chat.welcome,
    " Solo Gruppo": chat.sologruppo,
    " Solo Privato": chat.soloprivato,
    " Modo Admin": chat.modoadmin,
    " Ban Gruppo": chat.isBanned,
    " Antiporno": chat.antiPorno,
    " AntiCall": chat.antiCall,
    " Antitraba": chat.antitraba,
    " AntiPakistani": chat.antiArab,
    " Antilink": chat.antiLink,
    " AntiInstagram": chat.antiinsta,
    " AntiTikTok": chat.antitiktok,
    " AntiElimina": chat.antielimina
  };

  let statusList = Object.entries(functions)
    .map(([name, state]) => `${state ? '🟢' : '🔴'} - *${name}*`)
    .join('\n');

  let menuText = `
╭〔*💬 𝑴𝑬𝑵𝑼 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 💬*〕┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝐀𝐓𝐓𝐈𝐕𝐀/𝐃𝐈𝐒𝐀𝐓𝐓𝐈𝐕𝐀*
┃◈┃
${statusList.split('\n').map(line => `┃◈┃• ${line}`).join('\n')}
┃◈┃
┃◈┃• *ℹ 𝐂𝐎𝐌𝐄 𝐒𝐈 𝐔𝐒𝐀*
┃◈┃• *🟢 attiva [funzione]*
┃◈┃• *🔴 disattiva [funzione]*
┃◈┃
┃◈└───────────┈⊷
╰━━━━━━━━━━━━━┈·๏
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ *${conn.user.name}*
*•────────────•⟢*
`.trim();

  await conn.sendMessage(m.chat, {
    text: menuText,
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true
    }
  });
};

handler.help = ["menuattive"];
handler.tags = ["menu"];
handler.command = /^(menuattive)$/i;

handler.execute = async (m, { conn, usedPrefix, command, args }) => {
  const chat = global.db.data.chats[m.chat];
  const functionName = args[0]?.toLowerCase();

  if (command === 'attiva' || command === 'disattiva') {
    if (!functionName || !(functionName in chat)) {
      return m.reply(`Funzione non valida. Usa *${usedPrefix}menufunzioni* per vedere le funzioni disponibili.`);
    }

    const newState = command === 'attiva';
    chat[functionName] = newState;

    return m.reply(`Funzione *${functionName}* ${newState ? 'attivata 🟢' : 'disattivata 🔴'}.`);
  }

  // ...existing code for menu rendering...
};

export default handler;