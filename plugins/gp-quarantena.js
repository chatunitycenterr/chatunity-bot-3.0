// Solo il bot lo può usare (o gli owner [Youns è il migliore])
let handler = async (m, { conn, groupMetadata, participants, isBotAdmin, isSuperAdmin }) => {
    if (!isBotAdmin) {
        await conn.sendMessage(m.chat, { text: "❌ Il bot deve essere amministratore per eseguire questo comando!" });
        return;
    }

    const ownerGroup = groupMetadata.owner || null; 
    const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);

    const adminsToRemove = admins.filter(admin => admin !== conn.user.jid && admin !== ownerGroup);

    if (adminsToRemove.length === 0) {
        await conn.sendMessage(m.chat, { text: "⚠ Non ci sono amministratori da rimuovere, oltre al bot e al founder." });
        return;
    }

    await conn.sendMessage(m.chat, { text: "⚠ Procedo con la quarantena." });

    for (let admin of adminsToRemove) {
        try {
            await conn.groupParticipantsUpdate(m.chat, [admin], 'demote');
            await new Promise(resolve => setTimeout(resolve, 200)); // puoi modificare il tempo tra una demote e l'altro in base alle tue esigenze 
        } catch (err) {
            console.error(`Errore nella rimozione di ${admin}:`, err);
        }
    }

    await conn.sendMessage(m.chat, { text: "Gruppo in quarantena" });
};

handler.command = /^quarantena$/i; 
handler.group = true; 
handler.admin = true;
handler.isBotAdmin= true;
export default handler;