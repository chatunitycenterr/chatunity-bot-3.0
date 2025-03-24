let handler = async (m, {conn, usedPrefix}) => {
    // Identifica l'utente (menzionato, quotato o mittente)
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    
    // Blocca la risposta se è richiesto il saldo del bot
    if (who == conn.user.jid) return m.react('✖️')
    
    // Verifica se l'utente esiste nel database
    if (!(who in global.db.data.users)) return m.reply(`*L'utente non è registrato nel mio database*`)
    
    let user = global.db.data.users[who]
    
    // Mostra il saldo bancario
    await m.reply(
       who == m.sender 
          ? `Hai *${user.bank} ⭐ Stelle* nella Banca` 
          : `L'utente @${who.split('@')[0]} ha *${user.bank} ⭐ Stelle* nella Banca`,
       null, 
       { mentions: [who] }
    )
 }
 
 handler.help = ['bank']
 handler.tags = ['rpg']
 handler.command = ['bank', 'banca', 'saldo'] 
 handler.register = true 
 export default handler