const blacklist = require('metro-config/src/defaults/blacklist')

module.exports = {
  resolver: {
    blacklistRE: /react-native\/local-cli\/core\/__fixtures__.*/
  },
}
