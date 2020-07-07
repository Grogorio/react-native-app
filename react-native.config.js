module.exports = {
  project: {
    ios: {},
    android: {
      "mainFilePath": "src/main/java/com/bod/MainApplication.java"
    }, // grouped into "project"
  },
  assets: ['./src/assets/images/'], // stays the same
  // commands: require('./path-to-commands.js'), // formerly "plugin", returns an array of commands
};
