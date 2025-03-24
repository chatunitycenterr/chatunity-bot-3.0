let handler = async (m, { args }) => {
    let user = global.db.data.users[m.sender]
    
    if (!args[0]) return m.reply('🚩 Inserisci la quantità di *⭐ Stelle* che vuoi depositare.')
    if ((args[0]) < 1) return m.reply('🚩 Inserisci una quantità valida di *⭐ Stelle*.')
    
    // Deposito di tutto il saldo
    if (args[0] === 'all') {
       let quantita = parseInt(user.limit)
       user.limit -= quantita
       user.bank += quantita
       await m.reply(`Hai depositato *${quantita} ⭐ Stelle* nella Banca.`)
       return
    }
    
    if (!Number(args[0])) return m.reply('🚩 La quantità deve essere un numero.')
    
    let quantita = parseInt(args[0])
    
    if (!user.limit) return m.reply('Non hai *⭐ Stelle* nel tuo portafoglio.')
    if (user.limit < quantita) return m.reply(`Hai solo *${user.limit} ⭐ Stelle* nel portafoglio.`)
    
    // Esegui il deposito
    user.limit -= quantita
    user.bank += quantita
    await m.reply(`Hai depositato *${quantita} ⭐ Stelle* nella Banca.`)
 }
 
 handler.help = ['deposita']
 handler.tags = ['rpg']
 handler.command = ['deposit', 'deposita', 'dep', 'd']
 handler.register = true 
 export default handler