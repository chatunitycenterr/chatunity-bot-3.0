let cooldowns = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let punti = 300
    let tempoAttesa = 5 * 1000
    let user = global.db.data.users[m.sender]
 
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000))
        return conn.reply(m.chat, `[ ✰ ] Hai già giocato di recente, aspetta *⏱ ${tempoRimanente}* per giocare di nuovo.`, m)
    }

    cooldowns[m.sender] = Date.now()

    if (!text) return conn.reply(m.chat, '[ ✰ ] Scegli un\'opzione ( *pietra/carta/forbici* ) per iniziare il gioco.\n\n`» Esempio:`\n' + `> *${usedPrefix + command}* pietra`, m)

    let opzioni = ['pietra', 'carta', 'forbici']
    let botChoice = opzioni[Math.floor(Math.random() * opzioni.length)]

    if (!opzioni.includes(text)) return conn.reply(m.chat, '[ ✰ ] Scegli un\'opzione valida ( *pietra/carta/forbici* ) per iniziare il gioco.\n\n`» Esempio:`\n' + `> *${usedPrefix + command}* pietra`, m)

    let risultato = ''
    let puntiOttenuti = 0

    if (text === botChoice) {
        risultato = `[ ✿ ]︎ Pareggio!! Ricevi *100 ⭐ Stelle* come ricompensa`
        puntiOttenuti = 100
    } else if (
        (text === 'pietra' && botChoice === 'forbici') ||
        (text === 'forbici' && botChoice === 'carta') ||
        (text === 'carta' && botChoice === 'pietra')
    ) {
        risultato = `[ ✰ ]︎ HAI VINTO!! Hai guadagnato *300 ⭐ Stelle*`
        puntiOttenuti = punti
    } else {
        risultato = `[ ✿︎ ] HAI PERSO!! Hai perso *300 ⭐ Stelle*`
        puntiOttenuti = -punti
    }

    user.limit += puntiOttenuti
    conn.reply(m.chat, `${risultato}\n\nLa mia scelta: *${botChoice.toUpperCase()}*`, m)
}

handler.help = ['scf']
handler.tags = ['game']
handler.command = ['scf', 'sassocartaforbici']

function secondiAHMS(secondi) {
    return `${secondi % 60} secondi`
}

export default handler