let handler = async (m, { conn, command, text }) => {
    // Genera un livello casuale di alcol nel sangue
    let width = Math.floor(Math.random() * 101);

    // Determina il messaggio in base al livello
    let finalPhrase = width >= 70 
        ? "🍾 Questo tizio/a potrebbe avere problemi con l'alcol!" 
        : width >= 30 
        ? "🥂 Beve in modo responsabile, o quasi..." 
        : "🚰 Totalmente sobrio, niente sbronze per oggi!";

    // Creazione del messaggio
    let message = `
━━━━━━━━━━━━━━━━━━━━━━━
MOMENTO DEL TEST DELL'ALCOL! 🍷 
━━━━━━━━━━━━━━━━━━━━━━━
 ${text ? text : 'Tu'} ha un tasso alcolemico del ${width}%! 🍷
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    // Invia il messaggio con le menzioni
    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(alcolizzato|alcol)$/i;

export default handler;