define('templates/helpers/uppercaseSplit', ['hbs/handlebars'], function ( Handlebars ) {
  function uppercaseSplit ( context, options ) {
    // Simple function for example
    return context.toUpperCase().replace(' ', '<br>');
  }
  Handlebars.registerHelper( 'uppercaseSplit', uppercaseSplit );
  return uppercaseSplit;
});