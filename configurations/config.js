export default {
  session_id: "",
  UNIQUE_USER_VERIFIER: "",
  owner: "",
  automatic_updates: false,
  allowBetaUpdates: false,
  already_configured: true,
  allowBugsReview: true,
  autoviewstatus: false,
  autorecording: false,
  antidelete: false,
  autotyping: false,
  allowGroupProcessing: true,
  allowChannelProcessing: true,
  allowWhatsappUpdatesProcessing: true,
  allowPrivateChatProcessing:true,
  cypherAi: { 
        enabled: false,
        allowInGroups: true,
        allowInPrivateChats: true,
        allowInChannels: false
  },    //cypher_ai -BETA VERSION(will be rate_limited on too many request;
  
  global_owner: "cyber_cyphers",
  email: "",    //optional
  user_phone: "",  //required
  prefix: ".",
  private: false,
  production: true //recommended
}
