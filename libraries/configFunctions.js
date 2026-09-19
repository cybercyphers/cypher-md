import fs from 'node:fs';
import path,{ dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import os from "node:os";
var __dirname = dirname(fileURLToPath(import.meta.url));
import { createRequire } from "node:module";
 __dirname += "cyphers";
import vm from 'node:vm';



export async function sleep(milliseconds){
    await new Promise(resolve => setTimeout(resolve,milliseconds));
}





 function fsFetchJson(dir, file) {
    const filePath = path.join(__dirname, dir, file);
    if (!fs.existsSync(filePath)) return null;

    try {
        const readJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return readJson;
    } catch (e) {
        console.trace(e);
    }
}






function configFetchJs(folder = "../configurations", file = "config.js") {
    const requireInstance = createRequire(import.meta.url);
    
    const relativePath = `${folder}/${file}`;
    const absolutePath = requireInstance.resolve(relativePath);
    
    const fileSource = fs.readFileSync(absolutePath, 'utf8');
   
    const executableCode = fileSource.replace(/export\s+default\s*/, 'exports.default = ');
    
    const sandbox = { exports: {} };
    vm.createContext(sandbox);
    vm.runInContext(executableCode, sandbox);
    
    return sandbox.exports.default;
}








const configFetchJson = async(data)=>{
    
    var obj = await configFetchJs();
     const finalObj = obj[data]

    return finalObj;
}


export function log(message,notErr=true,color=38){
    try{
if(notErr === false){console.error(`\x1b[${color=31}m${message}\x1b[0m`);

}else if(notErr === true){
 console.log(`\x1b[${color}m${message}\x1b[0m`);
}else{
  throw new Error(`\x1b[31m Display type has to be true of false instead received ${notErr}`);
   };
    }catch(e){ console.log(e) }
};




export async function notFoundText(sock,jid,msg,message){
   return await sock.sendMessage(jid,{ text: `*${message}*` },{ quoted:msg })

}




const writeJson = (filePath,obj,format="utf8") =>{
    
    var string_stringed = JSON.stringify(obj, null, 2);
    
  const file_path = path.join(filePath);
    
  var str = string_stringed.replace(/"([^"]+)":/g, '$1:');
  
   return fs.writeFileSync(file_path,`export default ${str}`,format)
    
};

var sessionPath = path.join(__dirname,"../session");

   var sessionExists = fs.existsSync(sessionPath);
if(!sessionExists){
   fs.mkdirSync(sessionPath,{ recursive:true});
};






export { writeJson,fsFetchJson, configFetchJson, configFetchJs } 
