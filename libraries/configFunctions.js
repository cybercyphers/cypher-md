import fs from 'node:fs';
import path,{ dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from "node:os";
var __dirname = dirname(fileURLToPath(import.meta.url));
import { createRequire } from "node:module";
 __dirname += "cyphers";

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

function configFetchJs(folder="../configurations",file="config.js"){
    var require = createRequire(import.meta.url);
     var file_path = path.join(__dirname,folder,file);
    delete require.cache[file_path];
 var new_config_cache = require(file_path);
    return new_config_cache.default;
};




const configFetchJson = async(data)=>{
    
    var obj = await configFetchJs();
     const finalObj = obj[data]

    return finalObj;
}


export { fsFetchJson, configFetchJson, configFetchJs } 
