let Starlights;
try {
    Starlights = await import('@StarlightsTeam/Scraper');
} catch (e) {
    console.error('Errore: Il pacchetto "@StarlightsTeam/Scraper" non è disponibile. Si prega di verificare l\'esistenza del pacchetto o considerare un\'alternativa.');
    Starlights = null;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!Starlights) {
        return conn.reply(m.chat, '🚩 Errore: Il modulo "@StarlightsTeam/Scraper" non è disponibile. Contattare l\'owner o utilizzare un\'alternativa.', m);
    }
    if (!text) return conn.reply(m.chat, `🚩 Inserisci il nome utente di Instagram.\n\nEsempio:\n> *${usedPrefix + command}* Fernanfloo`, m);

    await m.react('🕓');
    try {
        let { username, followers, following, posts, description, url, thumbnail } = await Starlights.igstalk(text);

        let txt = '`乂  I N S T A G R A M -  S T A L K`\n\n';
        txt += `  ✩   Utente : ${username}\n`;
        txt += `  ✩   Follower : ${followers}\n`;
        txt += `  ✩   Seguiti : ${following}\n`;
        txt += `  ✩   Post : ${posts}\n`;
        txt += `  ✩   Bio : ${description}\n`;
        txt += `  ✩   Link : ${url}\n\n`;

        conn.reply(m.chat, txt, m);
        await m.react('✅');
    } catch (e) {
        console.error('Errore durante l\'operazione igstalk:', e);
        await m.react('✖️');
    }
};

handler.help = ['igstalk <utente>'];
handler.tags = ['tools'];
handler.command = ['igstalk', 'instagramstalk', 'instagram-stalk'];
handler.register = true;

export default handler;