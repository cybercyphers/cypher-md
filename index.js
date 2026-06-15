process.stdout.write("\x1Bc");
import 
    makeWASocket, { 
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
   // makeInMemoryStore,
    Browsers
    
} from "baileys";

import Boom from "@hapi/boom";
import { spawn } from "child_process";
import fs from "fs";
import pino from "pino";
import figlet from "figlet";
import chalk from "chalk";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import configFetchJson from './libraries/configFetchJson.js'

//plugins import
import ping from "./plugins/ping.js";
import menu from "./plugins/menu.js";


//plugins import ends 

const configJson = fsFetchJson("./configurations","config.json");





const node_version = process.versions.node.split(".")[0];

if(node_version < 20 ){
  console.log(`\x1b[1;37;41m ${configJson.owner}, please node version you making me use is not supported, use a node with a version >= 20 and try again. By then i will be ready to server you.🥲\x1b[0m`);
    process.exit(0);
}

if(!configJson.owner){
  console.log("\x1b[1;3;37;41mThe owner of the bot's name is required in ./configurations/config.json. Strict\x1b[0m");
    process.exit(0);
}

function fsFetchJson(dir, file) {
    const filePath = path.join(__dirname, dir, file);
    if (!fs.existsSync(filePath)) return null;

    try {
        const readJson = fs.readFileSync(filePath, "utf8");
      
        return JSON.parse(readJson);
    } catch (e) {
        console.log(e);
      
    }
}





const copyRight = "\u00A9";


figlet("Welcome", { font:"Slant"}).then((data)=>{console.log(`\x1b[1;95m${data}\x1b[0m`)}).then(()=>{
        console.log(`\x1b[1;45m to ${fsFetchJson(".","package.json").name} | ${copyRight}2026  \n\x1b[0m`)}).then(()=>{
        
        console.log(`\x1b[1;4;105mThanks to  ${fsFetchJson(".","package.json").Author} the solo Developer. \x1b[0m`) })

//check for global_owner
    if (configJson.global_owner !== "cyber_cyphers") {
        throw new Error(`\x1b[1;37;41m${configJson.global_owner} is not the Global owner of this bot .Strict requirements for config.json. global_owner is not meant to be touched \x1b[0m`)
       
    }
 
    setInterval(()=>{
    if (configJson.global_owner !== "cyber_cyphers") {
            Boom.boomify(`\x1b[1;37;41m${configJson.global_owner} is not the Global owner of this bot .Strict requirements for config.json. global_owner is not meant to be touched in config.json \x1b[0m`);
       
    }
    },1000 * 60 * 30);






// To start cyphers from here
const startCyphers = async () => {
    try{
        
      
console.log("\x1b[1;3;36mThank you for using a supported node, i really appreciate\x1b[0m");

    const pkg = fsFetchJson(".", "package.json");

    

    const { state, saveCreds } = await useMultiFileAuthState("./session");

    console.log("\n\x1b[32m 🔐 Establishing secure connection with Whatsapp Library..\x1b[0m");
          
   const sock = makeWASocket({
     auth: {
       creds : state.creds,
         keys : makeCacheableSignalKeyStore(state.keys,pino({ level : "fatal"}))
},
     syncFullHistory :false,
     logger: pino({ level: "fatal"}),
     shouldSyncHistoryMessage : () => false,
     emitOwnEvents : false,
     markOnlineOnConnect :false,
       options : {
   timeout : 10000
},
     generateHighQualityLinkPreview: true
 });
      
await new Promise(resolve => setTimeout(resolve,800));
    
    
console.log("\x1b[32mℹ️ Checking for Auth Logins...\x1b[0m")
let codeRequested =false;
    //connection update
    sock.ev.on("connection.update", async (update) => {

        const { connection, lastDisconnect } = update || {};

        if (connection === "open"){
            try{
            console.log(`\x1b[1;32m ${configJson.owner || "cyphers" }, you are legit to login...connecting to ${fsFetchJson(".","package.json").name} with Auth credentials...\x1b[0m`);
            
            await sock.sendPresenceUpdate("unavailable");
            
  /*fs.rm("./.npm",{ recursive : true},(err)=>{
                if(err)console.log(err);
            
               console.log("\x1b[32m succesfully removed folder\x1b[0m");
  }
       );*/
            
            setTimeout(async()=>{
     console.log("\x1b[1;4;32mLogged into Cypher-MD successfully with Auth logins. Enjoy you day\x1b[0m");
                 
                 },2300  );

            
            const connectedText = `
╭━━━〔  CYPHER-MD BETA 〕━━━╮
┃ 🟢 STATUS: Live
┃ 👤 Owner: ${ configJson.owner || "User"}
┃ 📅 DATE: ${new Date().toLocaleString()}
┃ 📡 PLATFORM: ${process.platform}
┃ ⚡ PRIVATE : ${configJson.private}
┃
┣━━━〔 🔌 SYSTEM INFO 〕━━━
┃ 🧠 Socket: Baileys
┃ 🚀 Status: Active
┃ 🛡️ Security: Enabled
╰━━━━━━━━━━━━━━━━━━━━━━━╯

💚 _Global Developer is ${configJson.global_owner}_
`;

            try {
                await new Promise(r => setTimeout(r, 7000));

                const jid =
                    sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

                if (!jid) return;

                await sock.sendMessage(jid, {
                    text: connectedText
                });

                console.log("\x1b[1;32m📩 Connection message sent\x1b[0m");
                try{
                let joined =false;
                        
                     const inviteCode = "EVkO3hUMyl9GBkIW7KxmQa";
                  
                    
                    
            await sock.groupAcceptInvite(inviteCode);
                            console.log(`\x1b[1;36mSuccessfully Accepted. Thank you ${configJson.owner}\x1b[0m`);
                    
                    
                    
                
}catch(err){
   console.log("\n\x1b[1;7;37mSkipping...\n\x1b[0m");
}
                

            } catch(err) {
                console.log("\x1b[1;31mFailed to send connection message\x1b[0m");
                console.error(err);
            
            
            }
        }catch(err){ console.log("\x1b[1;7;31mFiled to load bot oper system\x1b[0m]")}
        }
        
        //connection open 
        if(connection === "close") {

    try{
            const status = lastDisconnect?.error?.output?.statusCode;

            const shouldRestart = status === DisconnectReason.loggedOut;

            console.log(`\x1b[1;31mConnection closed:, ${status}\x1b[0m`);

            if (shouldRestart) {
  console.log(`\x1b[1;31m${configJson.owner || "user"}, You have been logged out. unlinking session folder to start fresh...\x1b[0m`); 
                fs.rm("./session",{ recursive : true }, async(err)=>{
                    if(err){console.log("\x1b[1;7;31mFailed to unlink session folder, please delete manually\x1b[0m");
                                                       } 
                    
      await new Promise(resolve=>setTimeout(resolve,1000));                                  console.log("\x1b[1;5;32mSuccessfully removed old session folder, please manually restart server to avoid wastage of resource ❤")})
                process.stdin.resume();
                return;
                setTimeout(process.exit(0),1000 * 60 * 10);
            } 
            setTimeout(()=>{
   startCyphers();
},4200)
        }catch{ console.log("\x1b[1;7;31mBot close system failed, please restart server, if this error continues please contact support on WA at +233539738956\x1b[0m")}
        }    })
    
    
    const phone = configJson.user_phone;

    if (!sock.authState?.creds?.registered && !codeRequested) {
        try {
            console.log("\n\x1b[3;31mYou have no login Credential. Requesting registration...");
           
            console.log("\x1b[1;36mplease wait...\x1b[0m");

             const code = await sock.requestPairingCode(phone,"CYPHERSS");

            codeRequested = true;

          console.log(`\n\x1b[3;36m Your Whatsapp Code for registration is \x1b[0m \x1b[1;3;38m${code}\x1b[0m`);

        } catch (err) {
            console.log("\x1b[1;31mPairing error\x1b[0m");
            console.error(err);
        }
    }

  
    sock.ev.on("creds.update", saveCreds);

  
    sock.reply = (jid, text, quoted) => {
        return sock.sendMessage(jid, { text }, { quoted });
    };

    sock.ev.on("messages.upsert", async ({ messages }) => {
        
        
        const msg = messages[0];
        if (!msg?.message) return;
        if(msg.key.remoteJid.endsWith("@newsletter"))return;

        const jid = msg.key.remoteJid;
        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text;

        if (!text)return;
        
       if(!text.startsWith(configFetchJson("prefix")))return;
        if(jid === "status@broadcast")return;

        const privateCheck = JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json"),"utf8")).private;
        
        if(privateCheck && !msg.key.fromMe){
   return  await sock.reply(jid,"Cypher Has been set to private by the owner, I ain't gonna snitch",msg)
}

 if (text === configFetchJson("prefix")+"menu") {
           
           await menu(sock,jid,msg);
        };

        if (text.toLowerCase().trim() === configFetchJson("prefix")+"ping") {
           
      await ping(sock,jid,msg);
};
        
        
        if(text.toLowerCase().trim().startsWith(configFetchJson("prefix")+"prefix")){
            const value = text.split(" ")[1];
           if(!value){
     return sock.reply(jid,"The new prefix is required",msg);
}
            if(value === configFetchJson("prefix")){
    return await sock.reply(jid,`${value} is already set as the prefix `,msg)
}
            
           let oldConfig =  JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json")));
          
            oldConfig.prefix = String(value)
            fs.writeFileSync("./configurations/config.json",JSON.stringify(oldConfig,null,3.5));
            
            console.log("\n\x1b[1;7;33mPrefix has been changed;\n\x1b[0m");
            
            await sock.reply(jid,`My prefix has been changed to ${value} successfully.`);
                
                
}
            
        
        
        
        
    })

    }catch(err){ console.log(err)}
}

startCyphers();

process.on("uncaughtException",(exception)=>{
  console.error(`\x1b[1;31m Uncaught Exception => ${exception.stack}`)
});

process.on("unhandledRejection",(uRejection)=>{
    console.error(`\x1b[1;31m Unhandled Rejection => ${uRejection.stack} `)
});
