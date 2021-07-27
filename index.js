var path = require('path'),
    express = require('express'),
    url = require('url'),
    data = require('./data'),
    publicDir = path.resolve(__dirname, '..', 'public'),
    // coverage = require('istanbul-middleware'),
    bodyParser = require('body-parser'),
    nopt = require('nopt'),
    config = nopt({ coverage: Boolean }),
    istanbulMiddleware = require('istanbul-middleware')£¬
    coverageRequired = config.coverage,
    port = 8888;

    if (coverageRequired) {
        console.log('Turning on coverage; ensure this is not production',path.resolve(__dirname, '..'));
        istanbulMiddleware.hookLoader(path.resolve(__dirname, '..'), { verbose: true });
    }
    console.log('Starting server at: http://localhost:' + port);
    if (!coverageRequired) {
        console.log('Coverage NOT turned on, run with --coverage to turn it on');
    }


function testa(req, res){

    res.send('Hello world!');

}
// app.get('/',  testa)

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

function matcher(req) {
    var parsed = url.parse(req.url);
    return parsed.pathname && parsed.pathname.match(/\.js$/) && !parsed.pathname.match(/jquery/);
}

function list(req, res, next) {
    var parsed = url.parse(req.url, true),
        authors = data.authors;
    if (parsed.query.alive === '1') {
        authors = authors.filter(function (a) { return !a.deceased; });
    }
    res.render('index', { authors: authors });
}

function detail(req, res, next) {
    var id = req.params.id,
        authors = data.authors;

    authors = authors.filter(function (a) { return a.id === id; });
    if (authors.length === 0) {
        res.send(404);
    } else {
        res.render('detail', { author: authors[0] });
    }
}

function coverageData(req, res, next) {
    res.json(global.__coverage__);
}


function startRun (port, needCover) {
      var app = express();
      if (needCover) {
          console.log('Turn on coverage reporting at /coverage');
          app.use('/coverage', istanbulMiddleware.createHandler({ verbose: true, resetOnGet: true }));
          app.use(istanbulMiddleware.createClientHandler(publicDir, { matcher: matcher }));
      
      }

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      app.set('view engine', 'hbs');
      app.engine('hbs', require('hbs').__express);
      app.use(express['static'](publicDir));

      // app.get('/', list);
      // app.get('/authors/:id', detail);

      app.get('/',  testa);
      app.get('/coverageData', coverageData);
    //   var Stringa = app.get('/coverageData', coverageData);
    //   console.log("Stringa");
    //   console.log(Stringa);
      app.listen(port);

  }


startRun(port, coverageRequired);


