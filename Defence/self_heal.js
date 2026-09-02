import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import dbase from "better-sqlite3";
import { spawn, spawnSync } from "node:child_process";

var __dirname = dirname(fileURLToPath(import.meta.url));

async function sleep(ms){
   await new   Promise(resolve=>setTimeout(resolve,ms))
}

var db = new dbase(path.join(__dirname,"../Databases","cypher_legal_user_info.db"));



async function compileTypeScript(){

console.log("[\x1b[1;35m  compiling TypeScript...\x1b[0m]");

await sleep(400);
   
if(!fs.existsSync(path.join(__dirname,"../tsconfig.json"))){  
       var tsConfigInit =await spawnSync("npx",["tsc","--init"],{ shell:true, stdio: ["pipe","pipe","pipe"]});
         };
            //only compiles if previous init compilement return status code 0 or tsconfig.json file already exists;           
           if(tsConfigInit?.status === 0 || fs.existsSync(path.join(__dirname,"../tsconfig.json"))){
    await spawnSync("npm",["run","dev"],{ shell:true, stdio: "inherit" 
                                  });
 };          
console.log("[\x1b[1;35m successfully compiled TypeScript...\x1b[0m]");
            //ts-compilation ends
};




async function set_session(storage,configFetchJs){
    try{
    var credsPath = path.join(__dirname,"../session/creds.json"); 
  var credsExists = fs.existsSync(credsPath);
      var isValidCreds;
        
        if(!fs.existsSync(credsPath)){
   fs.writeFileSync(credsPath,"");
        };
        
        isValidCreds = fs.readFileSync(credsPath,"utf8");
        
    var sessionID = await configFetchJs().session_id;
        
    var cloudCreds = await storage.find(sessionID,true);
        
        
     //  console.log(sessionID) 
    
    var cloudCredsVerify = cloudCreds === undefined ? false : cloudCreds === null ? false : true;
    
    if(credsExists && isValidCreds){
    console.log("\x1b[1;32mUsing available credentials...");
}else if(!credsExists && !cloudCredsVerify){
       console.log("\n\x1b[1;7;31m Session Id is invalid or has expired please you can go an generate a new session. Falling back to in-built pairing....");
}
 else{
     
  var cloudCredsSizeCheck = cloudCreds.size === undefined ? false : cloudCreds.size;
    if(cloudCredsSizeCheck < 2200 || false){
     var credsCloudFile = await cloudCreds.downloadBuffer();
     
    fs.promises.writeFile(credsPath,credsCloudFile);
 console.log("[\x1b[Session Id is valid... \x1b[0m]");
    
    };
       
  
}

    }catch(e){

     console.log("[\x1b[1;31mSession_Id was not found in our database... 1\x1b[0m]",e,sessionID);

        await new Promise(resolve=>setTimeout(resolve,1500));
        process.exit(0)
        
   }
  
}







async function compileSqlite(){           
console.log("[\x1b[1;35m compiling Sqlite...\x1b[0m]")            
            //sql compilation begins    
            var sql_startup_scripts = fs.readFileSync(path.join(__dirname,"../SQL","ciph_schema.sql"),"utf8");
     await db.exec(sql_startup_scripts);     
   await sleep(1900);                   
console.log("[\x1b[1;35m successfully compiled Sqlite...\x1b[0m]")
         //sql compilation ends   
}


setInterval(async()=>{
var importantDirs = [ "Defence","src","typescript_handlers","SQL","Databases","configurations","libraries","plugins"];

for(var dir of importantDirs){
  if(!fs.existsSync(path.join(__dirname,`../${dir}`))){
   console.log(`[\x1b[1;31msome directories have been tampered beginning 30% self heal process you need to reinstall cypher-md to prevent future errors...`);
      
      fs.mkdirSync(path.join(__dirname,`../${dir}`),{ recursive:true});
      console.log(`[\x1b[34mself healed ${dir} successfully...\x1b[0m]`);
      
  }
 }
},1000*10);


export { 
   compileTypeScript,
    compileSqlite,
    db,
    set_session
}
