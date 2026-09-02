import { db } from "../Defence/self_heal.js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
var __dirname = dirname(fileURLToPath(import.meta.url));
import dbase from "better-sqlite3";
import clearOld from "../plugins/clearDeleted.js";

var image_db = new dbase(path.join(__dirname,"../Databases/media_buffer.db"));

import integrity from "./integrity_check.js";
/*db.pragma("wal_checkpoint");
db.pragma("synchronous=true");*/

async function loadmediadb(){
    var mediaDb; 
  if(fs.existsSync(path.join(__dirname,"./media.sql"))){
      
      mediaDb = fs.readFileSync(path.join(__dirname,"./media.sql"),"utf8");
  var info =  await image_db.exec(mediaDb)

  }
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




async function store_media(id,name,remoteJid,fromMe,remoteJidAlt="N/A",extention,mediaType,conversation){
 //var from_me_bool = fromMe === true ? 1 : 0;
   
    var mediaTransaction = image_db.transaction((id,name,remoteJid,fromMe,remoteJidAlt="N/A",extention,mediaType,conversation)=>{
        
var mediaInsertPrepare = image_db.prepare("INSERT OR REPLACE INTO media_buffer(id,name,remoteJid,fromMe,remoteJidAlt,extention,mediaType,buffer) VALUES(?,?,?,?,?,?,?,?)");      
        mediaInsertPrepare.run(id,name,remoteJid,fromMe,remoteJidAlt="N/A",extention,mediaType,conversation)
 });
    mediaTransaction(id,name,remoteJid,fromMe,remoteJidAlt,extention,mediaType,conversation)
    
 /* var display = image_db.prepare("SELECT * FROM media_buffer").all();
    console.log(display)
    */
    
}







async function storeChat(id,name,remoteJid,fromMe,remoteJidAlt="N/A",conversation){
   if(!id){
   throw new Error("[\x1b[31mThe id \x1b[0m]");
       return;
};
    
    
    var inserts = await db.prepare("INSERT OR REPLACE INTO Store(id,name,remoteJid,fromMe,remoteJidAlt,conversation) VALUES(?,?,?,?,?,?)");
    
    
    
    //transaction for anti_delete
    var rnTr = db.transaction((id,name,remoteJid,fromMe,remoteJidAlt,conversation)=>{
        //console.log(conversation)
inserts.run(id,name,remoteJid,fromMe,remoteJidAlt="undefined",conversation); 
    });
    await rnTr(id,name,remoteJid,fromMe,remoteJidAlt,conversation);
  /* var data = db.prepare("SELECT * FROM Store").all();
    console.log(data);*/
    
}





//return deleted value

async function get_deleted(id){
  if(!id){
     throw new Error("Expected type string but go undefined");
  };
    var getObj = await db.prepare("SELECT * FROM Store WHERE id = ?");
    var gotten = await getObj.get(id);
   // console.log(getObj)
    return gotten;
}








export { 
storeChat,
    get_deleted, 
    image_db,
    store_media,
    get_media,
    loadmediadb,
    integrity,
    clearOld
};
