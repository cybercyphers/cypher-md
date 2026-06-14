const menu = async(sock,jid,msg)=>{
    const menu = `╭━━━〔 CYPHER-MD 〕━━━⬣\n` +
`┃ 👤 Owner : sam \n` +
`┃ ⚡ Prefix : .\n` +
`┃ 🖥️ Platform : ${process.platform}\n` +
`┃ 🟢 Status : Online\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 📋 GENERAL 〕━━━⬣\n` +
`┃  .ping\n` +
`┃  .menu\n` +
`┃  .alive\n` +
`┃  .total\n` +
`┃  .help\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 👥 GROUP 〕━━━⬣\n` +
`┃  .add\n` +
`┃  .kick\n` +
`┃  .promote\n` +
`┃  .demote\n` +
`┃  .tagall\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 👑 OWNER 〕━━━⬣\n` +
`┃  .private\n` +
`┃  .restart\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 ⚙️ SYSTEM 〕━━━⬣\n` +
`┃ 🚀 socket : Baileys\n` +
`┃ 💻 Runtime : Node.js\n` +
`┃ 🔥 Fast & Stable\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` 
;



    
    
    
 await sock.reply(jid,"Loading...",msg);
    
    
   await new Promise(resolve => setTimeout(resolve,100));
    
    await sock.reply(jid,menu,msg);
    

}
export default menu;
