Cypress.Commands.add('echo', function(...args) {
  const text = args
    .map(arg => {
      return ['array', 'object'].includes(typeof arg) ? JSON.stringify(arg) : String(arg);
    })
    .join(' ');
  cy.task('echo', text);
});
