/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const cypressHarGenerator = require('@neuralegion/cypress-har-generator');
const yaml = require('js-yaml');
const fs = require('fs');

const recordConfig = (name, value, { shouldEcho = false }) => {
  const valueYaml = yaml.dump(value);
  if (shouldEcho) {
    console.log(valueYaml);
  }
  fs.writeFile(`cypress/${name}`, valueYaml);
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  cypressHarGenerator.install(on, config);

  on('task', {
    echo(...args) {
      // eslint-disable-next-line no-console
      console.log(...args);
      return null;
    },
  });

  on('before:browser:launch', (browser = {}, launchOptions) => {
    cypressHarGenerator.ensureBrowserFlags(browser, launchOptions);
    return launchOptions;
  });

  on('before:run', (setup) => {
    const timeouts = Object.fromEntries(
      Object.entries(setup.config).filter(([key])=>key.match(/Timeout$/))
    );

    recordConfig('setup-all.yaml', setup, {shouldEcho: false});
    recordConfig('setup-timeouts.yaml', timeouts, {shouldEcho: true});
  })
};
