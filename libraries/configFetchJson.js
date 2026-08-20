
import fs from 'node:fs';
import path,{ dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));



const configFetchJson = async(data)=>{
    
    var obj = await configJson("../configurations","config.js").default;
     const finalObj = obj[data]

    return finalObj;
}


export default configFetchJson;
