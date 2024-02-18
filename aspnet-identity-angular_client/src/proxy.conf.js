const target = 'https://localhost:7043';

const PROXY_CONFIG = {
  "/api": {
    target,
    secure: false,
    logLevel: 'verbose'
  }
}

module.exports = PROXY_CONFIG;
