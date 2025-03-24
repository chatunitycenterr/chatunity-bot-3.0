let cooldowns = {}

// Definizione di rcanal (sostituisci "default_value" con il valore appropriato)
const rcanal = "default_value"; 

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]
  
  let tempoAttesa = 10
  
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
    let tempoRestante = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `🚩 Hai già avviato una scommessa di recente, aspetta *⏱ ${tempoRestante}* per scommettere di nuovo`, m, rcanal)
    return
  }
  
  cooldowns[m.sender] = Date.now()

  if (!text) return conn.reply(m.chat, `🚩 Devi inserire una quantità di *⭐ Stelle* e scommettere su un colore, per esempio: *${usedPrefix + command} 20 black o red*`, m, rcanal)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `🚩 Formato errato. Devi inserire una quantità di *⭐ Stelle* e scommettere su un colore, per esempio: *${usedPrefix + command} 20 black*`, m, rcanal)

  let limit = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(limit) || limit <= 0) return conn.reply(m.chat, `🚩 Per favore, inserisci una quantità valida per la scommessa.`, m, rcanal)

  if (limit > 50) return conn.reply(m.chat, "🚩 La quantità massima di scommessa è di 50 *⭐ Stelle*.", m, rcanal)

  if (!(color === 'black' || color === 'red')) return conn.reply(m.chat, "🚩 Devi scommettere su un colore valido: *black* o *red*.", m, rcanal)

  if (limit > users.limit) return conn.reply(m.chat, "🚩 Non hai abbastanza *⭐ Stelle* per effettuare questa scommessa.", m, rcanal)
  
  await conn.reply(m.chat, `🚩 Hai scommesso ${limit} *⭐ Stelle* sul colore ${color}. Aspetta *⏱ 10 secondi* per conoscere il risultato.`, m, rcanal)

  setTimeout(() => {
    let result = Math.random()
    let win = false

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }
    
    if (win) {
      users.limit += limit
      conn.reply(m.chat, `🚩 Hai vinto! Hai ottenuto ${limit} *⭐ Stelle*. Totale: ${users.limit} *⭐ Stelle*.`, m, rcanal)
    } else {
      users.limit -= limit
      conn.reply(m.chat, `🚩 Hai perso. Sono state sottratte ${limit} *⭐ Stelle*. Totale: ${users.limit} *⭐ Stelle*.`, m, rcanal)
    }

  }, 10000)
}

handler.tags = ['game']
handler.help = ['ruleta *<quantità> <colore>*']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
handler.group = true 
export default handler

function secondiAHMS(secondi) {
  let secondiRestanti = secondi % 60
  return `${secondiRestanti} secondi`
}