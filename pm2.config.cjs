module.exports = {
  apps: [{
    name: "cyphers",
    script: "/home/container/cyphers/src/cyphers.js",
    watch: true,
    ignore_watch: [
      "ts/error_logs_review.js",
      "ts/error_logs_review.d.ts",
      "ts/*.map", 
      "/ts/*.d.ts",
      "session",
      "Databases",
      "node_modules",
      "package-lock.json"
    ]
  }]
}
