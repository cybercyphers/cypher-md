import dotenv from "dotenv";
dotenv.config();
import db from "better-sqlite3";
import fs from "node:fs";
import path,{ dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { configFetchJs,sleep } from "../libraries/configFunctions.js"
var __dirname = dirname(fileURLToPath(import.meta.url));
import crypto from "node:crypto";
import { loadEnvFile } from "node:process";
import { e_db } from "../SQL/cypher_130.js";


export async function setKeys(sock,myJid,jid,msg){
    try{
   var envPath = path.join(__dirname,"..",".env");
    
 if(!fs.existsSync(envPath)){
    fs.writeFileSync(envPath,"");
};    
    var KEY = crypto.randomBytes(32).toString("hex");   
  var IV = crypto.randomBytes(16).toString("hex");
        
        var message1 = await sock.reply(jid,"*Reading encryption table...*")
       await sleep(500);
            
     
        var keys_check = e_db.prepare("SELECT * FROM encryption_keys").all();
        
 if(keys_check?.length < 1){
     
   await sock.sendMessage(jid,{ text:"*Generating unique encryption keys...*"});
 e_db.prepare("INSERT OR REPLACE INTO encryption_keys(myJid,ENCKEY,ENCIV) VALUES(?,?,?)").run(myJid,KEY,IV);
     await sleep(800);
  return await sock.reply(jid,"*Encryption table has been created and keys has generated successfully*",msg);

     
   }else if(keys_check?.length > 1){
        var individual_check = e_db.prepare("SELECT ENCKEY,ENCIV FROM encryption_keys WHERE myJid =?").get(myJid);
        
       if(!individual_check?.ENCKEY){
    e_db.prepare("INSERT OR REPLACE INTO encryption_keys(myJid,ENCKEY) VALUES(?,?)").run(myJid,KEY);    
           await sleep(800);
           await sock.reply(jid,"*Encryption key has been formed*");
}
  
if(!individual_check?.ENCIV){
   e_db.prepare("INSERT OR REPLACE INTO encryption_keys(myJid,ENCIV) VALUES(?,?)").run(myJid,IV);  
    await sleep(700);
  await sock.reply(jid,"*Encryption iv has been formed*")
}
       await sleep(700);
       
  return await sock.reply(jid,"*Encryption credential has already been refreshed*",msg);

       
   }else{
       
  return await sock.reply(jid,"*ENCRYPTION credential has already been generated*",msg);

   }
        

    }catch(e){ console.log(e) }
}


/*
var data = e_db.prepare("SELECT * FROM encryption_keys").all()    
console.log(data);
*/




export async function getKeys(sock,myJid,jid,jidAlt,msg){
    try{
        await sock.sendMessage(jid,{text:"*fetching encryption credential...*"});
        
        var database_key = e_db.prepare("SELECT ENCKEY FROM encryption_keys WHERE myJid = ?").get(myJid);
        
        
        var database_iv = e_db.prepare("SELECT ENCIV FROM encryption_keys WHERE myJid = ?").get(myJid);
        
        
/*console.log(database_key.ENCKEY,"/",database_iv)*/

        
var NOTICE_BEST = `*The Encryption key and iv are very sensitive keys that can be used to encrypt and decrypt your information. Anyone who has access to these keys can decrypt you information that has been encrypted at any time. Keep these information clean and out of sight to reduce cyberattacks and vulnerabilities. during decryption, if one character is missed, the decryption with fail.If your keys get leaked, you can call ${configFetchJs().prefix}resetkeys  to generate a new key and iv but NOTE, the newly generated credentials wont be able to decrypt old encrypted information but only new ones, stays safe, let say NO to cybercrime*`;
        
        var finalData = Buffer.from(JSON.stringify({ENCRYPTION_KEY : `${database_key.ENCKEY}`, ENCRYPTION_IV:`${database_iv.ENCIV}`, IMPORTANT_INFORMATION:NOTICE_BEST},null,4));
        
     
            
if(database_key.ENCKEY.length < 64 || database_iv.ENCIV.length < 32){
  return await sock.reply(jid,`*Encryption keys has been tampered with or currupted please reply "${configFetchJs().prefix}resetkeys"  to generate new keys before calling this command*`);
}   
            
         
        if(!database_key.ENCKEY || !database_iv.ENCIV){
  return await sock.reply(jid,`*No encryption credentials found, please reply with "${configFetchJs().prefix}setkeys"  to generate a new key before calling this command*`);
}   
          
        
        
      

            
          if(jid !== myJid && jidAlt !== myJid){
             
       await sock.reply(jid,"*Encryption credential has redirected to your private chat for security reasons*",msg);
         
       }
              
        await sleep(200)
       return await sock.sendMessage(myJid,{
   document: finalData,
    mimetype:"text/markdown",
    fileName:"Encryption_credential.md",
    caption:"*Your encryption credential are stored here safely*"
})       
        
    }catch(e){console.log(e)
         
            
       return await sock.reply(jid,"*Oops an error occured...*");

             }
}



export async function getKeysDev(myJid){
    try{
        var e_db_fetch = e_db.prepare("SELECT ENCKEY,ENCIV FROM encryption_keys WHERE myJid=?").get(myJid);
        var key = e_db_fetch?.ENCKEY;
        var iv = e_db_fetch?.ENCIV;
        
if(!key || !iv){
    return { key:null, iv:null}
}
        
return { key:Buffer.from(key,"hex"),iv:Buffer.from(iv,"hex")};
        
}catch(e){ console.log(e)}


}








