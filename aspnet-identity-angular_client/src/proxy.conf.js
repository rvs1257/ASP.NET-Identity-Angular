const target = 'https://localhost:7043';

const PROXY_CONFIG = {
  "/auth/*": {
    target,
    pathRewrite: { "^/auth": "" },
    secure: false,
    logLevel: 'debug'
  },
  "/api/*": {
    target,
    secure: false,
    logLevel: 'debug'
  }
}

module.exports = PROXY_CONFIG;
