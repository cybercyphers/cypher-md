import fetch from "node-fetch";
import { log } from "../libraries/helper_function.js";


export default async function handleNews(sock,jid,msg,handler){
    var handlers = ["AlJazeera","BBC","Deadline","Hacker-news","sports-news","tech-news","world-news","trending-news"];
    if(!handler){
     return await sock.reply(jid,log(`please select the new handler: ${handlers}`),msg);

}

}
