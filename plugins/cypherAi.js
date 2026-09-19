import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path,{ dirname } from "node:path";
import { writeJson,configFetchJs } from "../libraries/configFunctions.js";
var __dirname = dirname(fileURLToPath(import.meta.url));
import { log } from "../libraries/helper_function.js";


var configPath = path.join(__dirname,"../configurations","config.js");


const toggleCypherAi = async(sock,jid,msg,toggler)=>{
   // console.log(toggler);
    
  if( typeof toggler !== 'boolean' || toggler === null ){
   return sock.reply(jid,log('Could not find the right toggler <on /off>'),msg);
}
   //console.log(toggler);
    
  var configImport = configFetchJs();
   /*console.log(configImport.cypherAi.enabled === false && toggler === false);
    return;*/
    if(configImport.cypherAi.enabled === true && toggler){
  return await sock.reply(jid,log('~CypherAi service is already live~'),msg)
}else if(configImport.cypherAi.enabled === false && toggler === false){
  return await sock.reply(jid,log('~CypherAi service is already offline~'),msg)
}else if(configImport.cypherAi.enabled === true && toggler === false){

 configImport.cypherAi.enabled = toggler;
    //console.log(configImport)
  await writeJson(configPath,configImport);  
    return await sock.reply(jid,log(`~cypherAi has been deactivated, to activate this feature reply ${configFetchJs().prefix}cypherAi on `),msg);
    
}
    else if(configImport.cypherAi.enabled === false && toggler === true){

 configImport.cypherAi.enabled = toggler;
    //console.log(configImport)
  await writeJson(configPath,configImport);
  
return await sock.reply(jid,log(`~cypherAi has been activated successfully, All conversations will be redirected to cypherAi. To deactivate this feature, reply ${configFetchJs().prefix}cypherAi off `),msg);
        
}
    
      
}

export default toggleCypherAi;
