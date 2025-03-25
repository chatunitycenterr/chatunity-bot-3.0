let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('✖️')
   if (!(who in global.db.data.users)) return m.reply(`*L'utente non è presente nel mio database*`)
   let user = global.db.data.users[who]
   if (user.bank == null || user.bank == undefined || user.bank <= 0) {
       return await m.reply(`${who == m.sender ? `Non hai stelle depositate in banca, usa .deposita` : `L'utente @${who.split('@')[0]} non ha stelle depositate in banca`}`, null, { mentions: [who] })
   }
   await m.reply(`${who == m.sender ? `Hai *${user.bank} ⭐ Stelle* depositate in banca` : `L'utente @${who.split('@')[0]} ha *${user.bank} ⭐ Stelle* depositate in banca`}`, null, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banca'] 
export default handler