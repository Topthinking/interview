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

app.listen(3000,()=>{
  console.log(`
打开浏览器 http://127.0.0.1:3000/
尝试修改middleware文件夹内的js文件中ctx.body的内容
再刷新浏览器，可以看到变化，服务端开发无需重启服务，完成热更新
  `)
});
