var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'evrifodexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/evrifodexpress-development',
    secret: 'evrifodSecretWithOlushola'
  },

  test: {
    root: rootPath,
    app: {
      name: 'evrifodexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/evrifodexpress-test',
    secret: 'evrifodSecretWithOlushola'
  },

  production: {
    root: rootPath,
    app: {
      name: 'evrifodexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/evrifodexpress-production',
    secret: 'evrifodSecretWithOlushola'
  }
};

module.exports = config[env];
