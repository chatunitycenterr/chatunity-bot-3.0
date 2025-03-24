import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix}) => {
    let rcanal = null; // Definizione di rcanal come null per evitare errori
    
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let name = conn.getName(who)
    if (!(who in global.db.data.users)) return conn.reply(m.chat, '🚩 Utente non trovato nel mio database.', m, rcanal).then(_ => m.react('✖️'))
    
    // Immagine di sfondo per il wallet
    let imgUrl = `https://i.ibb.co/4RSNsdx9/Sponge-Bob-friendship-wallet-meme-9.png`;
    let img;
    try {
        img = await (await fetch(imgUrl)).buffer();
    } catch (e) {
        return conn.reply(m.chat, '🚩 Errore nel caricamento dell\'immagine.', m, rcanal).then(_ => m.react('✖️'));
    }

    // Testo del wallet
    let txt = ` –  *W A L L E T  -  U T E N T E*\n\n`
        txt += `┌  ✩  *Nome* : ${user.name}\n`
        txt += `│  ✩  *Stelle* : ${formattaNumero(user.limit)} ( *${user.limit}* )\n`
    let mentionedJid = [who]
    
    // Invio del messaggio con immagine
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, false, { 
        mimetype: 'image/jpeg', 
        mentions: mentionedJid 
    });
}

handler.help = ['wallet']
handler.tags = ['rpg']
handler.command = ['soldi', 'wallet', 'portafoglio', 'stelle', 'stars', 'saldo', 'bilancio']
handler.register = true 
export default handler

function formattaNumero(value) {
    if (!value) return '0'
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") // Formattazione con separatore migliaia
}