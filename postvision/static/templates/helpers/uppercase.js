define('templates/helpers/uppercase', ['hbs/handlebars'], function ( Handlebars ) {
  function uppercase ( context, options ) {
    // Simple function for example
    return context.toUpperCase();
  }
  Handlebars.registerHelper( 'uppercase', uppercase );
  return uppercase;
});