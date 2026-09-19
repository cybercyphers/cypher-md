import { db } from "../Defence/self_heal.js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
var __dirname = dirname(fileURLToPath(import.meta.url));
import dbase from "better-sqlite3";
import clearOld from "../plugins/clearDeleted.js";
import integrity from "./integrity_check.js";

var image_db = new dbase(path.join(__dirname,"../Databases/media_buffer.db"));

var cypherAiDb = new dbase(path.join(__dirname,"../Databases/cypher_ai_memories.db"));

var e_db = new dbase(path.join(__dirname,`../Databases/Encryption.db`));

e_db.exec("CREATE TABLE IF NOT EXISTS encryption_keys(myJid TEXT UNIQUE NOT NULL,ENCKEY TEXT NOT NULL, ENCIV TEXT NOT NULL, generated_at DATETIME DEFAULT CURRENT_TIMESTAMP)");



async function store_meta_data(unique_id="N/A", name ="N/A",version ="N/A",latest="N/A",engine="N/A"){
    try{
 var eachData = [ unique_id,name,version,latest,engine];
    for(const data of eachData){
   if(!data){
   console.error(`some required informations are returning undefined : ${data}`);
  }                         
 };
   var isLatest = latest === true ? 1 : 0;
    
    
    var insertion = await db.prepare("INSERT INTO cypher_user(id,name,cypher_md_version,isLatest,engine) VALUES(?,?,?,?,?)").run(unique_id,name,version,isLatest,engine);   
    
  /* 
  var trial = db.prepare("SELECT * FROM cypher_user").all();
    console.log(trial);
    */
        
    }catch(e){ console.error(e)}
};




async function loadcypherAiDb(){
  var cypherAiMemoryScript = fs.readFileSync(path.join(__dirname,".","/cypherAi_memory.sql"),"utf8");
   
   cypherAiDb.exec(cypherAiMemoryScript) //console.log(cypherAiMemoryScript);
    
}



async function loadmediadb(){
    var mediaDb; 
  if(fs.existsSync(path.join(__dirname,"./media.sql"))){
      
      mediaDb = fs.readFileSync(path.join(__dirname,"./media.sql"),"utf8");
  var info =  await image_db.exec(mediaDb)

  }
 /*   var d = await image_db.prepare("SELECT * FROM media_buffer").all();
    console.log(d); */
}

    


//get media functuon

async function get_media(id){
   if(!id){
     throw new Error("[\x1b[31mExpected type string but received undefined in image_db\x1b[0m]");
};
    var searchMedia = await image_db.prepare("SELECT * FROM media_buffer WHERE id=?");
    var gotten = await searchMedia.get(id);
    return gotten; 
    
};



/*
var data = await image_db.prepare("SELECT * FROM media_buffer").all();
console.log(data)
*/

async function store_media(id,name,remoteJid,fromMe,remoteJidAlt="N/A",extention,mediaType,conversation){
 //var from_me_bool = fromMe === true ? 1 : 0;
   
    var mediaTransaction = image_db.transaction((id,name,remoteJid,fromMe,remoteJidAlt,extention,mediaType,conversation)=>{
        
var mediaInsertPrepare = image_db.prepare("INSERT OR REPLACE INTO media_buffer(id,name,remoteJid,fromMe,remoteJidAlt,extention,mediaType,buffer) VALUES(?,?,?,?,?,?,?,?)");      
        mediaInsertPrepare.run(id,name,remoteJid,fromMe,remoteJidAlt,extention,mediaType,conversation)
 });
    mediaTransaction(id,name,remoteJid,fromMe,remoteJidAlt,extention,mediaType,conversation)
    
 /* var display = image_db.prepare("SELECT * FROM media_buffer").all();
    console.log(display)
    */
    
}







async function storeChat(id,name,remoteJid,fromMe,remoteJidAlt="N/A",conversation){
   if(!id){
   throw new Error("[\x1b[31mThe id returned undefined\x1b[0m]");    
};
    
    
    var inserts = await db.prepare("INSERT OR REPLACE INTO Store(id,name,remoteJid,fromMe,remoteJidAlt,conversation) VALUES(?,?,?,?,?,?)");
    
    
    
    //transaction for anti_delete
    var rnTr = db.transaction((id,name,remoteJid,fromMe,remoteJidAlt,conversation)=>{
        //console.log(conversation)
inserts.run(id,name,remoteJid,fromMe,remoteJidAlt,conversation); 
    });
    await rnTr(id,name,remoteJid,fromMe,remoteJidAlt,conversation);
  /* var data = db.prepare("SELECT * FROM Store").all();
    console.log(data);*/
    
}

/*
 var dat = db.prepare("SELECT * FROM Store").all()
    console.log(dat);
*/
//return deleted value

async function get_deleted(id){
  if(!id){
     throw new Error("Expected type string but got undefined");
  };
    var getObj = await db.prepare("SELECT * FROM Store WHERE id = ?");
    var gotten = await getObj.get(id);
    return gotten;
}

    
/*  var s = db.prepare("SELECT * FROM Store").all();
console.log(s)
*/




export { 
storeChat,
    get_deleted, 
    image_db,
    store_media,
    get_media,
    loadmediadb,
    integrity,
    clearOld,
    store_meta_data,
    loadcypherAiDb,
    cypherAiDb,
    e_db
};
