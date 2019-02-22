# Frontend Tiny Boilerplate

A basic and powerful multipurpose boilerplate, to let you focus on what matters, your code.

## Features

* [Handlebars][handlebars] view engine, with pre-loaded [helpers][handlebars-helpers], partials and data
* Basic [NodeJS][nodejs] web server, handling routes, pages, and assets
* [Sass][sass] stylesheets
* [Postcss][postcss] optimizing the CSS with [autoprefixer][autoprefixer], [css-mqpacker][css-mqpacker], and [cssnano][cssnano]
* JS transpilation with [Webpack][webpack] and [Babel][babel]
* [Jest][jest] up and running for tests
* Static build output (HTML missing, will be fixed soon)


## Up and running

* Have [NodeJS][nodejs] installed (optionally, [Yarn][yarn] as well)
* Install dependencies by `npm i` or `yarn`
* Build static files by `npm run build` or `yarn build`
* Serve the app by `npm run server` or `yarn server`
* Run tests by `npm run test` or `yarn test`


## Folder structure

```
.
├── _dist/  ................ Built output folder (git ingnored)
├── data  .................. Data files preloaded on Handlebars render engine
│   └── [your-data].json
├── pages  ................. Main pages
│   ├── [your-page].hbs
│   └── routes.json  ....... Associate a route with a page file
├── partials  .............. Handlebars partials preloaded
│   └── [your-partial].hbs
├── scripts
│   ├── dummy.test.js  ..... Dummy test example
│   └── main.js  ........... Optional main JS entry point
├── static/  ............... Static files to include on built output
├── styles
│   └── main.scss  ......... Main SASS entry point
├── tasks/  ................ Build related tasks
├── ...
├── postcss.config.js  ..... PostCSS config
└── webpack.config.js  ..... Webpack config
```


[handlebars]: https://handlebarsjs.com/
[handlebars-helpers]: https://github.com/helpers/handlebars-helpers
[nodejs]: https://nodejs.org
[yarn]: https://yarnpkg.com
[sass]: https://sass-lang.com/
[postcss]: https://postcss.org/
[autoprefixer]: https://github.com/postcss/autoprefixer
[css-mqpacker]: https://github.com/hail2u/node-css-mqpacker
[cssnano]: https://cssnano.co/
[webpack]: https://webpack.js.org/
[babel]: https://babeljs.io/
[jest]: https://jestjs.io/
