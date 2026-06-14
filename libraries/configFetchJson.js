
import fs from 'node:fs';
import path,{ dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));



const configFetchJson = (data)=>{
    const obj = JSON.parse(fs.readFileSync(path.join(__dirname,"../configurations","config.json"),"utf8"));
    
     const finalObj = obj[data]

    return finalObj;
}


export default configFetchJson;
