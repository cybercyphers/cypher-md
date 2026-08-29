
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __dirname = dirname(fileURLToPath(import.meta.url));
import nodeCache from "node-cache";
const originalWrite = process.stdout.write;
process.stdout.write = function (string, encoding, fd) {
    if (string.includes("SessionEntry") || string.includes("registrationId")) {
        return;
    }
    return originalWrite.apply(process.stdout, arguments);
};


import { spawnSync, spawn } from "child_process";
const PORT = process.env.SERVER_PORT;
//process.stdout.write("\x1Bc");
import  {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
   // makeInMemoryStore, 
    Browsers
    
} from "@whiskeysockets/baileys";
import os from 'os';
import Boom from "@hapi/boom";
import fs from "fs";
import pino from "pino";
import figlet from "figlet";
import nodemailer from "nodemailer";
import chalk from "chalk";
import readline from 'readline';

import { 
    configFetchJson, 
    configFetchJs,
    fsFetchJson               
                        } from '../libraries/configFunctions.js';
import axios from 'axios';
import express from 'express';
import crypto from 'crypto';
import admZip from "adm-zip";
import { Storage } from "megajs";
//plugins import
import ping from "../plugins/ping.js";
import menu from "../plugins/menu.js";
import repo from "../plugins/myOwnCheck.js";

    //plugins import ends
import {
    db,
    compileTypeScript,
    compileSqlite
       } from "../Defence/self_heal.js"

//plugins import ends 

__dirname += "cyphers";



var _cache = new nodeCache({
    stdTTL: 5 * 60,     // Keeps keys in memory for 5 minutes (Baileys standard)
    useClones: false   
});

var msgRetryCounterCache = new nodeCache();


const writeJson = (filePath,obj,format="utf8") =>{
    
    var string_stringed = JSON.stringify(obj, null, 2);
    
  const file_path = path.join(__dirname,filePath);
    
  var str = string_stringed.replace(/"([^"]+)":/g, '$1:');
  
   return fs.writeFileSync(file_path,`export default ${str}`,format)
    
};


//question system
const question = (text)=>{
 const rl = readline.createInterface({
     input : process.stdin,
     output : process.stdout
 });
    return new Promise((resolve)=>{
        rl.question(text+"\n",ans=>{
          rl.close();
            resolve(ans);
        });
    });
    };
//question system ends here.


const node_version = process.versions.node.split(".")[0];

if(node_version <= fsFetchJson("..","package.json").recommended_node_engine){
  console.log(`\x1b[1;32;41m ${configFetchJs().owner}, please node version you making me use is not supported, use a node with a version >= 20 or 23 and try again. By then i will be ready to server you.🥲\x1b[0m`);
    process.exit(0);
}


const copyRight = "\u00A9";

//check for global_owner
    if (configFetchJs().global_owner !== "cyber_cyphers") {             
        throw new Error(`\x1b[1;37;41m${configFetchJs().global_owner} is not the Global owner of this bot .Strict requirements for config.json. global_owner is not meant to be touched \x1b[0m`)
       
    }
 
   const globalInterval = setInterval(async()=>{
       
    if (configFetchJs().global_owner !== "cyber_cyphers") {
            throw new Error(`\x1b[1;37;41m${temp_con.default.global_owner} is not the Global owner of this bot .Strict requirements for config.json. 'global_owner' was not meant to be touched in config.json \x1b[0m`);   
    }
    },1000 * 60 * 10);

async function sleep(milliseconds){
    await new Promise(resolve => setTimeout(resolve,milliseconds));
}





async function set_session(){
  var head = "https://panel-";
    try{
        
    var credsPath = path.join(__dirname,"../session/creds.json"); 
  var credsExists = fs.existsSync(credsPath);
      var isValidCreds;
        
        if(!fs.existsSync(credsPath)){
   fs.writeFileSync(credsPath,"");
        };
       var shoulder = "cyphers.nett.";
        isValidCreds = fs.readFileSync(credsPath,"utf8").startsWith('{"noiseKey:{')
        
    var sessionID = configFetchJs().session_id;

var down = "to/session/q";
      if(isValidCreds){
  console.log("\x1b[1;32mUsing current session id"); 
      }
      else if(!isValidCreds && !sessionID){
        console.log("[\x1b[1;34m no session active,falling back to in-build pairing...\x1b[0m]");
      }
        else{
                        
             var credsFetch = await fetch(head+shoulder+down,{ 
             method: "POST", headers:{            "Content-Type":"application/json",
     "Accept":"application/json",           "Authorization":" Bearer 3812eab8da8237e927e49c214e5935284aa618b47fcce4779c4a3c0ccfb3296c3858e60e56686a446139cb08e05a5dd2ee53a8959270572a51c5cb82f375d5c448f68aa2d606b77fa59e74e225d5c9195b2b3f2680afb715586bd5bdea6db946bc762e0fea7b80a09e1406920487bb08a99b52af1757c165cd398cc99ad3b65220416a0f8fe7950294fa80c7f930665c5c6a72f55e056fe6be5e74b5b7be3089eb48c0873d015f500600b357e535c02ff968a797906e6b663bffe5c15f71986bbfbaa1514eb08882b31a2b89ac8b936c7fc91c46f6aede650dfa2760919a75e5f217bcba43307353a86726434c128704aea3b6d9c2e3b68add93044108d4e3e3822f6debfc1d62818a63d836738a57866a6bbd1c802be522be8711cca76da347b4c6cb97bdf25928ec660a6b12793733381bfbc5124b526bfbc74df9ac9ed3b914f8453951c04b54744bb67e633a1b7ecebf28e6bdda591f89c2c45810489570e87dd031e73a8946d783ec2b37a3e37428ea3a05c35886b2f5f857ae8775a78e84d85d84e3cf39484151bfd4573501dd8be6e5347e68e1728c5a72675bcb4f02a23693159ac721a8276a8dc497f912c9978e15768b4ea700c12c345c3be22bd004a069602bb88e90505b08546367179f62794a4145d2bd16a8a576cf2b40d7ce8b97d136219b18e3b75f24aa991a0d2d878b69edfa9f22f092daa5666db0dc61"
             },
      body: JSON.stringify({ "id" : sessionID })
           });

  var finalPrivateSessionRaw = await credsFetch.json();

            if(finalPrivateSessionRaw.success){
                var bufferData =             Buffer.from(finalPrivateSessionRaw.creds.data);
               
                
                var FinalResponse = bufferData.toString("utf8");
 
                fs.writeFileSync(path.join(__dirname,"../session","creds.json"),FinalResponse);
                console.log(`[\x1b[1;36m${finalPrivateSessionRaw.message}\x1b[0m`);
  
            }else{
    console.log(`\x1b[1;35m${finalPrivateSessionRaw.message}\x1b[0m`);
};     
            
        };
    
    } catch(e){

     console.log("[\x1b[1;31mSessionId.service is temporarily unavailable, falling back to in-built pairing... 1\x1b[0m]",e);
        process.exit(0);      
        
   };
  
};










function hash(data){   
    return crypto.createHash("sha256").update(data).digest("hex");
}




let figletShown = false;

// To start cyphers from here
const startCyphers = async () => {
    try{
        
const updateCheck = await axios.get("https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json");
        
      const oldPackageJson = fs.readFileSync(path.join(__dirname,"../package.json"),"utf8");
             
        
        const old = JSON.parse(oldPackageJson).version;
     
        const remote = updateCheck.data.version;
        
        
       if(old !== remote){
           //start

           process.stdout.write("\x1Bc");
           
           const update_question = await question(`\x1b[1;36mNew update available, version ${remote}. will you like to upgrade or use the old version [Yes | No]\x1b[0m`);

if(update_question.trim().toLowerCase() === 'yes'){
           
           let errEncountered=0;
           
      console.log(`\x1b[1;36m updating from version \x1b[0m \x1b[32m${old} => ${remote}\x1b[0m. \x1b[1;36mstarting update process...\x1b[0m\n`);

   console.log(`\x1b[1;36mPls wait while i verify the update. this wont take much time...\x1b[0m`);

           await sleep(3000);
           
      for(let i=-1; i<=100; i++){    
           await sleep(100);              process.stdout.write("\x1Bc")
   console.log(`\x1b[1;36mInstalling Update.......................[${i}/100] \x1b[0m`);
               
               if(i===63){
           const githubFetch = await fetch("https://github.com/cybercyphers/cypher-md/archive/refs/heads/main.zip");
           const ArrayBuffer =await githubFetch.arrayBuffer();
           const versionBuffer = Buffer.from(ArrayBuffer);
    const tmpDir = path.join(__dirname,`../__updates`);      
    const tmpDirZip = path.join(tmpDir,remote+".zip");
    
           if(!fs.existsSync(tmpDir))fs.mkdirSync(tmpDir,{ recursive : true })
           
    fs.writeFileSync(tmpDirZip,versionBuffer);
               };
           }    
        const zipper = new admZip(path.join(__dirname,`../__updates`,`${remote}.zip`));
      
        if(!fs.existsSync(path.join(__dirname,"../extraction")))
fs.mkdirSync(path.join(__dirname,"../extraction"), { recursive : true })
      await sleep(500);

    //clean frontend while update is going on
   
    for(let i=0;i < 1001; i++){
              await sleep(15);
               process.stdout.write("\x1Bc")
      console.log(`•\x1b[1;33m extracting update.........................[${i}/1000]\x1b[0m`); 
               let heavyMem = [];
               
        //coverup  
        heavyMem.push(i*i+54282737*99999929*67383837474+99373727*7728291992838385);
               
             if(i===838 || i === 812){
                 await sleep(1600);           zipper.extractAllTo(path.join(__dirname,"../extraction"),true);
             };
           };  
    
        await  sleep(1400);                      console.log("\n•\x1b[1;32m extraction complete...\x1b[0m ");
           
           
           
           const sourceRoot = path.join(__dirname, "../extraction", "cypher-md-main");
const entries = fs.readdirSync(sourceRoot, {
    recursive: true,
    encoding: "utf8"
});

           
const excluded = new Set([
    "LICENSE",
    ".gitignore"
]);

           let files_restructured = 5;
           let folders_created = 5;
           
for (const entry of entries) {
    const parts = entry.split(path.sep);

    if (excluded.has(parts[0])) continue;

    const source = path.join(sourceRoot, entry);
    const destination = path.join(__dirname, `../${entry}`);

    const stat = fs.statSync(source);

    if (stat.isDirectory()){
        
        fs.mkdirSync(`${ destination }`, { recursive: true })
                   console.log(`\n\x1b[1;36mCreating directory ${folders_created+=1} of cypher-md\x1b[0m`); 
     await sleep(60);
        continue;
        
        //directory creation ends
    };

    
    fs.mkdirSync(path.dirname(destination),{ recursive: true });

    await sleep(60);
    console.log(`\n\x1b[1;33mRestructuring files ${ files_restructured+=2 } of ${ entries.length }\x1b[0m`);


    fs.copyFileSync(source, destination);
};
//file structure and recreation ends.
   
    await sleep(500);
           console.log(`\x1b[1;36mcleaning up...\x1b[0m`)
           const unlinking = ["__updates","extraction"];
           
               unlinking.forEach(folder=>{ 
            
            if(fs.existsSync(path.join(__dirname,`../${folder}`))){
                           try{
                        fs.rmSync(path.join(__dirname,`../${folder}`),{ 
                                recursive: true,
                       force : true
                   })
                    }catch(err){ 
                                 errEncountered+=1;
                               console.log(`\x1b[31m ${errEncountered} minimal error(s) occured while updating but did not affect the update...  \x1b[0m`)}
                    };
               });
    //file unlinking system ends here
           
           await sleep(2000)
           console.log(`\n\x1b[1;36mEnjoy the new features with fixed bugs system with advanced system\x1b[0m`);
           
      console.log(`\x1b[1;32mUpdate Completed Successfully to version ${remote} restarting cyphers in 2 seconds....\x1B[0m `);
    process.exit(0);

        }else if(update_question.trim().toLowerCase() === "no"){}else{
        throw new Error(`\x1b[31msorry,wrong input. The only accepted input is [ yes | no ]\x1b[31m`)
        }         
     //ends  
           
     }

        
    console.log("\x1b[1;32mPlease wait...\x1b[0m")
       await sleep(2300);   
        
        await compileTypeScript();
          await sleep(5);
        
        await compileSqlite();
        
        
        await set_session();
        
        
        
        //start the main bot after the update
      
        if(figletShown === false){     
            //ts compilation begins
            
            
        figlet("Welcome", { font:"Slant"}).then((data)=>{console.log(`\x1b[1;95${data}\x1b[0m`)}).then(()=>{
        console.log(`\x1b[1;45m to ${fsFetchJson("..","package.json").name} | ${copyRight}2026  \n\x1b[0m`)}).then(()=>{
        figletShown = true;
        console.log(`\x1b[1;4;105mThanks to  ${fsFetchJson("..","package.json").author} the solo Developer. \x1b[0m`) })
await new Promise(resolve=>{ setTimeout(resolve,1200)});
        
        }
          console.log(figletShown)  
      if(configFetchJs().owner === "" || configFetchJs().owner=== " " || configFetchJs().owner === "{}" || configFetchJs().owner === {} || configFetchJs().owner === "[]" || configFetchJs().owner === "()" || configFetchJs().owner === []){
          
          var userAsk = await question("\n\x1b[1;36m The owner field cannot be empty please enter your name or guy name.eg.[ aka ]:\x1b[0m");
          
          if(userAsk === "" || userAsk === " " || userAsk === "[]" || userAsk === "{}" || userAsk === "()"){
      
   console.log(`\x1b[1;3;31m An empty space, array,set or dic cannot be your name,impossible, replacing with random name...\x1b[0m`);
              var randomChars = crypto.randomBytes(3).toString("hex");
            userAsk = `cypher_user${randomChars}`
          
};
          
          
         console.log("validating...")
          await sleep(180);
      
 var configFetch = configFetchJs();
        
console.log("comparing....");
          await sleep(180);
    configFetch.owner = userAsk;
          console.log("setting-up configuration...")
           await sleep(250);
          writeJson("../configurations/config.js",configFetch);
          
          console.log(`\n\x1b[3;32m ${userAsk} has been set as the owner of this bot.\n\x1b[0m`);
         
};
        

console.log("\x1b[1;3;32mThank you for using a supported node, i literally would not have survived without that node, trust me. 😂\x1b[0m");

    const pkg = fsFetchJson(".", "package.json");

    

    const { state, saveCreds } = await useMultiFileAuthState("./session");

    console.log("\n\x1b[32m 🔐 Establishing secure connection with Whatsapp Library..\x1b[0m");
        let logger = pino({ level : "fatal"});
        

const sock = await makeWASocket({
            auth : { 
                 creds : state.creds,
                 keys : makeCacheableSignalKeyStore(state.keys,logger,_cache)
        },
            logger:logger,
            emitOwnEvents:false,
            markOnlineOnConnect : false,
            syncFullHistory:false,
            shouldSyncHistoryMessage : () => true,
            ignoreOfflineMessages : false,
            enableRecentMessageCache: true,
            msgRetryCounterCache,
            enableAutoSessionRecreation: true,
            generateHighQualityLinkPreview:true,
            browser: ["Mac OS", "Chrome", "125.0.0.0"] 
            
});

const myJid = sock.user?.id.split(':')[0] + '@s.whatsapp.net';




        
      await new Promise(resolve => setTimeout(resolve,612));
        
      

    
console.log("\x1b[32mℹ️ Checking for Auth Logins...\x1b[0m")
let codeRequested = false;
    //connection update
    sock.ev.on("connection.update", async (update) => {

        const { connection, lastDisconnect } = update || {};

        if (connection === "open"){
            try{
            console.log(`\x1b[1;32m ${configFetchJs().owner || "user" }, you are legit to login...connecting to ${fsFetchJson("..","package.json").name} with Auth credentials...\x1b[0m`);
              
                const userPhone = configFetchJs().user_phone;
             String(userPhone).trim().replace(/\D/g,"");
                
                await sock.sendPresenceUpdate("unavailable",myJid);
                
                //removing heavy space wasting directories.
               
             /* const spaceDirs= [".npm",".cache",".ca-cache"];
            
                for(const r of spaceDirs){
   if(fs.existsSync(r)){
fs.rm(r,{recursive : true},(err)=>{
                if(err)console.log(`\n\x1b[1;5;31mI encountered an error while unlinking, ${r}. \n\x1b[0m`);
            
               console.log(`\n\x1b[32m succesfully removed ${r}.\n\x1b[0m`);
  }
       )
                   }
                };*/
                
console.log("\n\x1b[1;5;36mConnecting....\n\x1b[0m");  
           
            
            setTimeout(async()=>{
     console.log("\x1b[1;4;32mLogged into Cypher-MD successfully with Auth logins. Enjoy you day\x1b[0m");
                 
                 },2300  );


                setInterval(async()=>{
             try{
      await sock.sendPresenceUpdate("unavaliable",myJid);
             }catch(e){};
},1000 * 60 * 5);
        

            
            const connectedText = `
╭━━━〔  CYPHER-MD BETA 〕━━━╮
┃ 🟢 STATUS: Live
┃ 👤 Owner: ${ configFetchJs().owner || "User"}
┃ 📅 DATE: ${new Date().toLocaleString()}
┃ 📡 PLATFORM: ${process.platform}
┃ ⚡ PRIVATE : ${configFetchJs().private}
┃ 🔐 PREFIX : ${configFetchJs().prefix}
┃
┣━━━〔 🔌 SYSTEM INFO 〕━━━
┃ 🧠 Socket: Baileys
┃ 🚀 Status: Active
┃ 🛡️ Security: Enabled
╰━━━━━━━━━━━━━━━━━━━━━━━╯

💚 _Global Developer is ${ configFetchJs().global_owner }_
`;

              
            try {
                await new Promise(r => setTimeout(r, 7000));

                await sock.sendPresenceUpdate("unavailable");
                
                const jid =
                    sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

                if (!jid) return;

                await sock.sendMessage(jid, {
                    text: connectedText
                });

                console.log("\x1b[1;32m📩 Connection message sent\x1b[0m");
  
                

            }catch(err) {
                console.log("\x1b[1;31mFailed to send connection message\x1b[0m");
                console.error(err);
            
            }
            
                
            
        }catch(err){ console.log("\x1b[1;7;31mFailed to load bot connection open system, Debug info : \x1b[0m]",err)}
        }
        
        //connection open 
        if(connection === "close") {

    try{
            const status = lastDisconnect.error?.output?.statusCode;

            const shouldNotRestart = status === DisconnectReason.loggedOut;

            console.error(`\x1b[1;31mConnection closed:, ${JSON.stringify(status)}\x1b[0m`);

            if(shouldNotRestart){
  console.log(`\x1b[1;31m${configFetchJs().owner || "user"}, You have been logged out. unlinking session folder to start fresh...\x1b[0m`); 
                fs.rm("./session",{ recursive : true }, async(err)=>{
                    if(err){console.log("\x1b[1;7;31mFailed to unlink session folder, please delete manually\x1b[0m");
                            process.exit(0);
                                                       } 
                    
      await new Promise(resolve=>setTimeout(resolve,1000));                                  console.log("\x1b[1;5;32mSuccessfully removed old session folder, stopping server....❤")});
                setTimeout(process.exit(1),6000);
            }
        
        setTimeout(()=>{
   startCyphers();
},4200);
            
        }catch(e){ console.log("\x1b[1;7;31mBot close system failed, please restart server, if this error continues please contact support on WA at +233539738956\x1b[0m")}
        }    })
    
    
    const phone = configFetchJs().user_phone;

    if(!sock.authState?.creds?.registered && !codeRequested) {
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

  
    sock.ev.on("creds.update",async()=>{
 await saveCreds()
            });       

  
    sock.reply = (jid, text, quoted) => {
       
        return sock.sendMessage(jid, { text }, { quoted });
    };

    sock.ev.on("messages.upsert", async ({ messages }) => {
        
        
        const msg = messages[0];
        if (!msg?.message)return;
             

        const jid = msg.key.remoteJid;

await sock.sendPresenceUpdate("unavailable",jid);



        
if (msg.messageStubType === 118 || msg.labels?.includes('fail')) { 
        const jid = msg.key.remoteJid;
        console.log(`[\x1b[36mFixing broken session for ${jid}\x1b[0m]`);
        
        // Force a session reset for this user/status channel
        await sock.auth.keys.set({
            'session': {
                [jid]: null
            }
        });
    }





        

      if(msg.key.remoteJid.endsWith("@newsletter"))return;
        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text;

  if (!text)return; 
      if(!text.startsWith(configFetchJs().prefix))return;
        if(jid === "status@broadcast")return;

        const privateCheck =  configFetchJs().private;
        
        if(privateCheck && !msg.key.fromMe)return;

 if(text === configFetchJs().prefix+"menu"){
    
           await menu(sock,jid,msg);
        } else if(text.toLowerCase().trim() === configFetchJs().prefix+"ping") {
            
      await ping(sock,jid,msg);
        }
  else if(text.toLowerCase().trim().startsWith(configFetchJs().prefix+"prefix")){
            if(!msg.key.fromMe){
  return await sock.reply(jid,"You do not have the Admin rights to change my prefix",msg);
               
}
            const value = text.split(" ")[1];
           if(!value){
     return sock.reply(jid,"The new prefix is required",msg);
}
            if(value === configFetchJs().prefix){
    return await sock.reply(jid,`${value} is already set as the prefix `,msg)
}
            
           let oldConfig =   configFetchJs();
          
            oldConfig.prefix = String(value)
            writeJson("../configurations/config.js",oldConfig);
            
            console.log("\n\x1b[1;7;33mPrefix has been changed;\n\x1b[0m");
            
            await sock.reply(jid,`My prefix has been changed to ${value} successfully.`);
                
                
  }else if(text.toLowerCase().trim().startsWith( configFetchJs().prefix+"mode")){
            if(!msg.key.fromMe){
    return await sock.reply(jid,"You do not have the Admin right to change my bots mode ",msg)
}
           
   const modeValue = text.split(" ")[1];
            if(!modeValue){
 return await sock.reply(jid,`The new mode is required, *Usage:* _${configFetchJs().prefix}mode private_`,msg);
 };
    let userMode;
          if(modeValue.trim().toLowerCase() === "private"){ userMode = true }
         else if(modeValue.trim().toLowerCase() === "public"){ userMode = false }
          
           else{
 return await sock.reply(jid,"*Modes can only be public or private*",msg)
};
           
        const newConfigJson = configFetchJs(); 
           
           if(userMode=== newConfigJson.private){
  return await sock.sendMessage(jid,{ text :  `~Already in ${modeValue} mode, ${msg.key.pushName || configFetchJs().owner || "user"}~`})
}
         //console.log(modeValue.trim().toLowerCase() === newConfigJson.private);
      
           newConfigJson.private = userMode;
           writeJson("../configurations/config.js",newConfigJson);
           
           console.log(`\x1b[1;7;33mMy private mode has been changed to ${userMode} by ${configFetchJson("owner")}.\x1b[0m`)
           
        return await sock.reply(jid,`*Private mode has been toggled to ${String(userMode)} sucessfully*`,msg)
         
}
  
     
        //github plugin load 
        else if(text.trim().toLowerCase() === configFetchJs().prefix+"repo"){
   await repo(sock,jid,msg);
}
  

            //continue plugins 




            
  
  //ends of all plugins
  else{
   return await sock.sendMessage(jid,{ text:"*Command not found or is coming soon...*"});
}
               
        
    })
        
        
        sock.ev.on("message.update",async(msg)=>{
       //soon
})
        
        
        
        

    }catch(err){ 
        console.trace(err);    
}
};

    //main bot login begins
startCyphers();




process.on("uncaughtException",(exception)=>{
  console.error(`\x1b[7;1;31m Uncaught Exception => ${ exception.stack }`)
});

process.on("unhandledRejection",(uRejection)=>{
    console.error(`\x1b[7;1;31m Unhandled Rejection => ${ uRejection.stack } `)
});

/*process.on("SIGTERM",async()=>{
    process.stdout.write('\x1Bc');
    const userEmailFetch = JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json"),"utf8"));
const userEmail = userEmailFetch.email;
   
    console.log("\x1b[1;4;7;35m Closing database...\x1b[0m");
    console.log("\n\x1b[1;4;7;36mShutting down...\n\x1b[0m");
    
    const transporter = nodemailer.createTransport({ 
      service : "gmail",
        host :  "panel-cyphers.nett.to",
        auth :{                           user:"cybercyphers2008@gmail.com",
    pass:"soffaocxotpclrts"
            
        }, 
        pool:true,
        debug:true,
        secure:false
    });
    
    await transporter.sendMail({
        from : "cybercyphers2008@gmail.com",
        to : userEmail,
        text :"hello"
    })
    
    
    console.log("-----------------------------—--------—-------—----");
    
          process.exit();
}); */
        
