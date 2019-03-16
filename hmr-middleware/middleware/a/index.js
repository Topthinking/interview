const help = require('./help');

module.exports = async (ctx, next) => {
  console.log('a中间件执行');
  ctx.body += '\nhello a1' + help();
  await next();
};
