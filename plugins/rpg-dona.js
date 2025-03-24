import MessageType from '@whiskeysockets/baileys'

let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] // Se in gruppo, prende l'utente menzionato
    else who = m.chat // Se in privato, usa l'utente corrente
    
    if (!who) throw '🚩 Devi menzionare un utente con *@user*'
    
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '🚩 Inserisci la quantità di *⭐ Stelle* da trasferire'
    if (isNaN(txt)) throw 'Solo numeri sono accettati'
    
    let stelle = parseInt(txt)
    let costo = stelle
    let tassaImporto = Math.ceil(stelle * tassa)
    costo += tassaImporto
    
    if (costo < 1) throw '🚩 Il minimo trasferibile è *1 ⭐ Stella*'
    
    let users = global.db.data.users
    if (costo > users[m.sender].limit) throw 'Non hai abbastanza *⭐ Stelle* per questo trasferimento'
    
    // Esegui la transazione
    users[m.sender].limit -= costo
    users[who].limit += stelle
    
    await m.reply(`*${-stelle}* ⭐ Stelle 
Tassa 2% : *${-tassaImporto}* ⭐ Stelle
Totale addebitato: *${-costo}* ⭐ Stelle`)
    
    // Notifica il destinatario
    conn.fakeReply(m.chat, `*+${stelle}* ⭐ Stelle ricevute!`, who, m.text)
}

handler.help = ['daistelle *@user <quantità>*']
handler.tags = ['rpg']
handler.command = ['daistelle', 'dacoin', 'trasferisci']
handler.register = true 

export default handler