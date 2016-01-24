var metalsmith = require('metalsmith')
var watch = require('metalsmith-watch')
var markdown = require('metalsmith-markdown')
var serve = require('metalsmith-serve')
var layouts = require('metalsmith-layouts')
var branch = require('metalsmith-branch')
var rename = require('metalsmith-rename')

metalsmith(__dirname)
    .use(branch('**/*.md')
      .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
      }))
      .use(layouts({
        engine: 'handlebars',
        directory: 'templates'
      }))
    )
    .use(rename([[/\.hbs$/, '.html']]))
    .use(watch({
      paths: {
        "${source}/**/*": true,
        "templates/**/*": "**/*.md",
      },
      livereload: true,
    }))
    .use(serve({port:8081}))
    .build(function(err) {
        if (err) throw err;
        console.log(err)
    });
