import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import { createRequire } from "node:module";
import { log } from "../libraries/helper_function.js";
var __dirname = dirname(fileURLToPath(import.meta.url));



export default async function toggleStatusView(sock,jid,msg,toggler){
  try{
    if(!sock){
   throw new Error("[\x1b[31msock is not defined...\x1b[0m]");
};
    if(!jid){
   throw new Error("[\x1b[31m my jidhas not been declared or has been forgotted\x1b[0m]");
};
    var require = createRequire(import.meta.url);
    
    var toggleFormat = toggler === "on" ? true : false;
    
  var configPath = path.join(__dirname,"../configurations","config.js");
    
    delete require.cache[configPath];
    
    var readViewOncePending = await import(`${configPath}?v=${Date.now()}`); 
    
    var readViewOnce = readViewOncePending.default;
   /* console.log(readViewOnce.antiviewonce)
    return;*/
    
    if(toggleFormat === true && readViewOnce.autoviewstatus === true){
   return await sock.reply(jid,log(`~Autoviewstatus has already been enabled~`),msg)
        
}else if(toggleFormat === false && readViewOnce.autoviewstatus === false){

 return await sock.reply(jid,log(`~Autoviewstatus has already been disabled~`),msg)

}
   
    readViewOnce.autoviewstatus = toggleFormat;
    
      var amStringingIt = JSON.stringify(readViewOnce,null,3);
     var madeItPastable = amStringingIt.replace(/"([^"]+)":/g, '$1:');
      
      
fs.writeFileSync(configPath,`export default${madeItPastable}`);
      return sock.reply(jid,log(`~Autoviewstatus has been has been ${toggleFormat === true ? "Enabled" : "Disabled"} successfully~`),msg);
      
      
  }catch(e){ console.error(e)}
};
