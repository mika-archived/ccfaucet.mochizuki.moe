const path = require('path');
const utils = require('shipit-utils');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: './dist',
      deployTo: '/var/www/ccfaucet.mochizuki.moe',
      repositoryUrl: 'https://github.com/mika-f/crypto-faucets.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true,
      // key: '~/.ssh/private_key'
    },
    production: {
      servers: 'dep@hiverlune.net'
    }
  });

  utils.registerTask(shipit, 'deploy-this', [
    'deploy:init',
    // 'deploy:fetch',
    'deploy:update',
    'deploy:publish',
    'deploy:clean',
    'deploy:finish'
  ]);
};