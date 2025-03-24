let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    
    if (args.length < 1) throw `
  🧮 Livelli di difficoltà disponibili: 
  
${Object.keys(modes).join(' | ')} 

_📌Esempio: ${usedPrefix+command} normale_
`.trim()
  
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) throw `
  🧮 Livelli di difficoltà disponibili: 
  
 ${Object.keys(modes).join(' | ')}

_📌Esempio: ${usedPrefix+command} normale_
`.trim()
    
  let id = m.chat
  if (id in conn.math) return conn.reply(m.chat, '⚠️ Ci sono ancora domande senza risposta in questa chat', conn.math[id][0])
  
  let math = genMath(mode)
  conn.math[id] = [
    await conn.reply(m.chat, `▢ QUANTO FA *${math.str}*?\n\n_Tempo:_ ${(math.time / 1000).toFixed(2)} secondi per sapere la risposta`, m),
    math, 4,
    setTimeout(() => {
      if (conn.math[id]) conn.reply(m.chat, `⏳ Tempo scaduto!\nLa risposta è: *${math.result}*`, conn.math[id][0])
      delete conn.math[id]
    }, math.time)
  ]
}

handler.help = ['mate']
handler.tags = ['game']
handler.command = ['mate', 'math', 'calcolo'] 


let modes = {
    principiante: [-3, 3, -3, 3, '+-', 15000, 100],
    facile: [-10, 10, -10, 10, '*/+-', 20000, 400],
    normale: [-40, 40, -20, 20, '*/+-', 40000, 700],
    difficile: [-100, 100, -70, 70, '*/+-', 30000, 800],
    estremo: [-999999, 999999, -999999, 999999, '*/', 99999, 4500]
    // impossibile: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 10000],
    // impossibile2: [-999999999999999, 999999999999999, -999, 999, '/', 10000, 50000]
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

handler.modes = modes

export default handler