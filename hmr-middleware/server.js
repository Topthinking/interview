const Koa = require('koa');
const path = require('path');
const hmr = require('./hmr');
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.request.url === '/') {
    ctx.body = 'hello hmr';
    await next();
  } else {
    ctx.body = '';
  }
});

hmr([
  path.join(__dirname, './middleware/a'),
  path.join(__dirname, './middleware/b'),
])(app);

app.listen(3000);
