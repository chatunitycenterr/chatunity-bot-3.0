let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`*${toM(a)}, Dovresti sposarti 💍 con ${toM(b)}, formate una bella coppia 💓*`, null, {
mentions: [a, b]
})}
handler.help = ['formarpareja']
handler.tags = ['main', 'fun']
handler.command = ['sposami','sposa']
handler.group = true

const inoltra = (who, nomeDelBot) => {
  const messageOptions = {
    contextInfo: {
      mentionedJid: [who],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }
  return messageOptions;
}

export default handler
