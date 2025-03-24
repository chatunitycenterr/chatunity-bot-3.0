let gameSessions = {};
let cooldowns = {};

let handler = async (m, { conn, text, command, usedPrefix }) => {
    const tempoAttesa = 5; // secondi di cooldown
    
    // Controllo cooldown
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
        return m.reply(`⏳ Hai già giocato di recente. Aspetta *${tempoRimanente}* prima di giocare di nuovo.`);
    }

    // Creazione nuova sessione
    if (!text) {
        gameSessions[m.chat] = {
            player1: m.sender,
            choice1: null,
            player2: null,
            choice2: null,
            status: 'waiting'
        };
        return conn.reply(m.chat, 
            `🎮 *Nuova partita a Testa o Croce* 🎮\n\n` +
            `Giocatore 1: @${m.sender.split('@')[0]}\n` +
            `In attesa del secondo giocatore...\n\n` +
            `Scrivi *${usedPrefix + command} testa* o *${usedPrefix + command} croce* per partecipare`,
            m, { mentions: [m.sender] });
    }

    // Partecipazione alla sessione esistente
    if (gameSessions[m.chat] && gameSessions[m.chat].status === 'waiting' && m.sender !== gameSessions[m.chat].player1) {
        if (!['testa', 'croce'].includes(text.toLowerCase())) {
            return conn.reply(m.chat, '⚠️ Scegli un\'opzione valida: *testa* o *croce*', m);
        }

        gameSessions[m.chat].player2 = m.sender;
        gameSessions[m.chat].choice2 = text.toLowerCase();
        gameSessions[m.chat].status = 'ready';
        
        // Notifica entrambi i giocatori
        conn.reply(m.chat, 
            `🎲 *Partita completata!*\n\n` +
            `Giocatore 1 (@${gameSessions[m.chat].player1.split('@')[0]}): in attesa di scelta\n` +
            `Giocatore 2 (@${m.sender.split('@')[0]}): *${text.toLowerCase()}*\n\n` +
            `Giocatore 1, scegli ora con *${usedPrefix + command} testa* o *${usedPrefix + command} croce*`,
            m, { mentions: [gameSessions[m.chat].player1, m.sender] });
        
        return;
    }

    // Scelta del primo giocatore (dopo che il secondo ha scelto)
    if (gameSessions[m.chat] && gameSessions[m.chat].status === 'ready' && m.sender === gameSessions[m.chat].player1) {
        if (!['testa', 'croce'].includes(text.toLowerCase())) {
            return conn.reply(m.chat, '⚠️ Scegli un\'opzione valida: *testa* o *croce*', m);
        }

        gameSessions[m.chat].choice1 = text.toLowerCase();
        const risultato = Math.random() < 0.5 ? 'testa' : 'croce';
        
        // Determina i vincitori
        const vincitore1 = gameSessions[m.chat].choice1 === risultato;
        const vincitore2 = gameSessions[m.chat].choice2 === risultato;
        
        // Prepara il messaggio del risultato
        let messaggioRisultato = `🎉 *Risultato*: La moneta è caduta su *${risultato.toUpperCase()}*\n\n`;
        
        // Aggiorna i saldi e prepara i messaggi
        if (vincitore1) {
            global.db.data.users[gameSessions[m.chat].player1].limit += 500;
            messaggioRisultato += `🏆 @${gameSessions[m.chat].player1.split('@')[0]} ha vinto 500 ⭐\n`;
        } else {
            global.db.data.users[gameSessions[m.chat].player1].limit -= 250;
            messaggioRisultato += `💔 @${gameSessions[m.chat].player1.split('@')[0]} ha perso 250 ⭐\n`;
        }
        
        if (vincitore2) {
            global.db.data.users[gameSessions[m.chat].player2].limit += 500;
            messaggioRisultato += `🏆 @${gameSessions[m.chat].player2.split('@')[0]} ha vinto 500 ⭐\n`;
        } else {
            global.db.data.users[gameSessions[m.chat].player2].limit -= 250;
            messaggioRisultato += `💔 @${gameSessions[m.chat].player2.split('@')[0]} ha perso 250 ⭐\n`;
        }
        
        // Invia il risultato
        conn.reply(m.chat, 
            messaggioRisultato + 
            `\nScrivi *${usedPrefix + command}* per una nuova partita!`,
            m, { mentions: [gameSessions[m.chat].player1, gameSessions[m.chat].player2] });
        
        // Resetta la sessione
        delete gameSessions[m.chat];
        cooldowns[m.sender] = Date.now();
        cooldowns[gameSessions[m.chat]?.player2] = Date.now();
        return;
    }

    // Se non è una mossa valida
    return conn.reply(m.chat, '⚠️ Non puoi unirti a questa partita o il comando non è valido', m);
}

handler.help = ['moneta'];
handler.tags = ['game'];
handler.command = [ 'cf', 'flip', 'moneta'];
handler.register = true;

function secondiAHMS(secondi) {
    return `${secondi % 60} secondi`;
}

export default handler;