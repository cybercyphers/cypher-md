
const ping = async(sock,jid,msg)=>{
   const startTime = Date.now();
    const firstSent = await sock.reply(jid," 🏓 pinging...",msg);
     const latency = Date.now() - startTime;
    await sock.reply(jid, `🚅 Latency : ${latency}ms`,firstSent)

}





export default ping;
