"use strict";

import fs from "node:fs";
import path,{ dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __dirname = dirname(fileURLToPath(import.meta.url));
import { configFetchJs } from "../libraries/configFunctions.js";



async function add(sock,jid,users,msg){
    try{
 var userJsonPath = path.join(__dirname,"../JSONS","private_allowals.json");
    
 if(!fs.existsSync(userJsonPath) || !fs.readFileSync(userJsonPath,"utf8")){
    fs.writeFileSync(userJsonPath,JSON.stringify([]),{ recirsive:true});
};
     if(!users){
   return await sock.sendMessage(jid,{ text:`*🙄Wrong command usage: try ${configFetchJs().prefix}add 2335689966677 23348488484 256999222838 or with a single whatsapp number*`},{ quoted:msg})
};
       var oldUsers = JSON.parse(fs.readFileSync(userJsonPath,"utf8"));
        
var joinedList=null;
        
        var oldUsersCheck = [];
        
        oldUsers.forEach(usr=>{ if(usr.endsWith("@s.whatsapp.net")){
  var replacement = usr.replace("@s.whatsapp.net","");
            oldUsersCheck.push(replacement);
           
}else if(!usr.endsWith("@s.whatsapp.net")){ oldUsersCheck.push(usr) }; 
         //console.log(oldUsersCheck);        
});
        
      var allUsersVerified = [];
        
for(const u of users){
     if(oldUsersCheck.includes(u)){
         
   await sock.sendMessage(jid,{ text:`*${u} is already a sudo user of this bot skipping ~${u}~...*`},{ quoted:msg})
        continue;
        
}
    if(oldUsersCheck.includes((msg?.key?.remoteJidAlt).replace("@s.whatsapp.net"))){
        return await sock.reply(jid,'*Your whatsapp number cannot be in the sudo list because you are an Admin.*',msg);
    }
    allUsersVerified.push(u) 
       
};
 
 console.log(allUsersVerified)  
       // return;
       
        
              
        
        
      joinedList = [...oldUsers,...allUsersVerified ];
              
        var completeJid = [];
        
 var toJid = joinedList.map(j=>{
     if(!j.endsWith("@s.whatsapp.net")){
   j+="@s.whatsapp.net";
            completeJid.push(j)
     }else{ completeJid.push(j) }
});
        
   fs.writeFileSync(userJsonPath,JSON.stringify(completeJid,null,2));  
     /*   
        console.log(!allUsersVerified || allUsersVerified.length < 1)
        
console.log(allUsersVerified)
        return;
*/
    if(!allUsersVerified || allUsersVerified.length < 1){ return; }
          return await sock.sendMessage(jid,{ text:`*${allUsersVerified} have been added to sudo list successfully, Added users can use your bot whiles in private mode*`});
      
   
    }catch(e){ console.error(e)}
    
};




export default add;
