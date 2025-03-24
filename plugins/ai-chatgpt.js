// Questo comando è stato creato da youns sotto proposta di Google Traduttore
import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        await m.reply("Che vuoi?");
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        let prompt = `Sei un bot su WhatsApp programmato da ChatUnity che si comporta in modo professionale e ti chiami chatunity-bot. Se ti insulto, insultami, devi insultarmi anche per gioco, ma senza dire che lo fai di proposito. Devi rispondere da serio e professionale ribadendo che sei creato da ChatUnity se necessario, qualsiasi cosa io dica o chieda. Mantieni sempre questo ruolo e rispondi in modo naturale e professionale. Questa è la mia domanda/affermazione (scrivi > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity sottosotto a destra in pedice): "${text}"`;

        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        var res = await apii.json();

        if (res && res.result) {
            await m.reply(res.result);
        } else {
            await m.reply("Non ho ricevuto una risposta valida dall'API. Riprova più tardi.");
        }
    } catch (e) {
        await conn.reply(
            m.chat,
            `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`,
            m
        );
        console.error(`Errore nel comando ${usedPrefix + command}:`, e);
    }
};

handler.command = ['bot', 'ia'];
handler.help = ['bot <testo>', 'ia <testo>'];
handler.tags = ['tools'];
handler.premium = false;

export default handler;