import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime.startsWith('image/')) {
    return m.reply('🚩 Rispondi a un\'*Immagine.*')
  }
  await m.react('🕓')

  let media = await q.download()
  if (!media) {
    await m.react('✖️')
    return m.reply('🚩 Errore: impossibile scaricare il file immagine.')
  }

  try {
    let formData = new FormData()
    formData.append('image', media, { filename: 'file' })

    let apiKey = process.env.IMGBB_API_KEY || '10604ee79e478b08aba6de5005e6c798' // Usa una chiave API alternativa se configurata
    let api = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    })

    if (api.data.data) {
      let txt = `*乂  I B B  -  U P L O A D E R*\n\n`
          txt += `  *» Titolo* : ${q.filename || 'x'}\n`
          txt += `  *» Id* : ${api.data.data.id}\n`
          txt += `  *» Link* : ${api.data.data.url}\n`
          txt += `  *» Diretto* : ${api.data.data.url_viewer}\n`
          txt += `  *» Mime* : ${mime}\n`
          txt += `  *» File* : ${q.filename || 'x.jpg'}\n`
          txt += `  *» Estensione* : ${api.data.data.image.extension}\n`
          txt += `  *» Elimina* : ${api.data.data.delete_url}\n\n`
          txt += `🚩 *${textbot}*`
      await conn.sendFile(m.chat, api.data.data.url, 'ibb.jpg', txt, m, null, rcanal)
      await m.react('✅')
    } else {
      throw new Error('Risposta API non valida.')
    }
  } catch (err) {
    console.error(err)
    if (err.response?.data?.error?.message === 'Rate limit reached') {
      await m.react('✖️')
      await m.reply('🚩 Errore: limite di richieste API raggiunto. Riprova più tardi.')
    } else {
      await m.react('✖️')
      await m.reply(`🚩 Errore durante il caricamento dell'immagine: ${err.response?.data?.error?.message || err.message}`)
    }
  }
}
handler.tags = ['tools']
handler.help = ['ibb']
handler.command = /^(ibb)$/i
handler.register = true 
export default handler