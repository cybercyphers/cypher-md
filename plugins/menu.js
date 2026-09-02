import os from "node:os";
import { configFetchJs } from "../libraries/configFunctions.js";
import path,{ dirname } from "node:path";
import { fileURLToPath } from "node:url";

var __dirname = dirname(fileURLToPath(import.meta.url));

const menu = async(sock,jid,msg)=>{
    const menu = `╭━━━〔 CYPHER-MD 〕━━━⬣\n` +
`┃ 👤 Owner : ${configFetchJs().owner} \n` +
`┃ ⚡ Prefix : ${configFetchJs().prefix}\n` +
`┃ 🖥️ Platform : ${process.platform}\n` +
`┃ 🟢 Status : Online\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 📋 GENERAL 〕━━━⬣\n` +
`┃  .ping\n` +
`┃  .menu\n` +
`┃  .alive\n` +
`┃  .info\n` +
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
`┃  .mode private\n` +
`┃  .mode public\n` +
`┃  .restart\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 ⚙️ SYSTEM 〕━━━⬣\n` +
`┃ 🚀 socket : Baileys\n` +
`┃ 💻 Runtime : ${process.uptime()}\n` +
`┃ 🔥 Fast & Stable\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` 
;



     
    
 await sock.sendMessage(jid,{
text:"Loading..."
},{ quoted:msg });
    
    
   await new Promise(resolve => setTimeout(resolve,100));
    
    await sock.sendMessage(jid,{
image:{ url:path.join(__dirname,"../assets","cyph_256.jpeg")},
caption: menu
    },{ quoted:msg});
    

}
export default menu;
