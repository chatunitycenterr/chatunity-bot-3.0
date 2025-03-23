import lenguajeGB from '../utils/lenguajeGB.js'; // Aggiorna con il percorso corretto

let handler = async (m, { conn }) => {
    let stats = Object.entries(db.data.stats).map(([key, val]) => {
        let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
        
        if (/exec/.test(name)) return
        return { name, ...val }
    })
     
    stats = stats.sort((a, b) => b.total - a.total)
    var txt = stats.slice(0, 10).map(({ name, total, last }) => {
        return `┏━━━━━━━━━━━━━┓\n┣📚 COMANDO : ${name}\n┣🗂️ USI : ${total}\n┗━━━━━━━━━━━━━┛`
    }).join`\n\n`
    m.reply(`${lenguajeGB['smsAvisoIIG']()}⚡DASHBOARD COMANDI PIÙ UTILIZZATI :\n\n${txt}`)
}

handler.help = ['dashboard']
handler.tags = ['info']
handler.command = /^dashboard$/i

export default handler

export function parseMs(ms) {
    if (typeof ms !== 'number') throw 'Il parametro deve essere un numero'
    return {
        giorni: Math.trunc(ms / 86400000),
        ore: Math.trunc(ms / 3600000) % 24,
        minuti: Math.trunc(ms / 60000) % 60,
        secondi: Math.trunc(ms / 1000) % 60,
        millisecondi: Math.trunc(ms) % 1000,
        microsecondi: Math.trunc(ms * 1000) % 1000,
        nanosecondi: Math.trunc(ms * 1e6) % 1000
    }
}

export function getTime(ms) {
    let now = parseMs(+new Date() - ms)
    if (now.giorni) return `${now.giorni} giorni fa`
    else if (now.ore) return `${now.ore} ore fa`
    else if (now.minuti) return `${now.minuti} minuti fa`
    else return `pochi secondi fa`
}