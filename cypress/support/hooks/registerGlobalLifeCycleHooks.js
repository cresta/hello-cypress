const getTestSetup = () => {
  const config = Cypress.config();
  const isInteractive = config.isInteractive;
  const browser = Cypress.browser.name;
  const enableHar = !!Cypress.env('ENABLE_HAR');
  return {browser, isInteractive, enableHar};
}

const shouldRecordHar = () => {
  const { isInteractive, browser, enableHar } = getTestSetup();
  return !isInteractive && browser === 'chrome' && enableHar;
}

const register = (before, after) => {
  before(function () {
    if (shouldRecordHar()) {
      cy.echo('global-before: record har');
      cy.recordHar();
    }
  });

  after(function () {
    if (shouldRecordHar()) {
      const context = this.currentTest || {};
      const { state } = context;
      const { relative } = Cypress.spec;
      const match = relative.match(/^cypress\/integration\/(.*)\/(.*)\.js/);
      const harOutDir = match && `cypress/hars/${match[1]}`;
      const harFileName = match && `${match[2]}.har`;
      const willSaveHar = harOutDir && harFileName && state !== 'passed';
      cy.echo('global-after: state', { state, harOutDir, harFileName, willSaveHar });
      if (willSaveHar) {
        cy.echo('global-after: save har');
        cy.exec(`mkdir -p ${harOutDir}`);
        cy.saveHar({
          outDir: harOutDir,
          fileName: harFileName
        });
      }
    }
  });
}

export default register;
