module.exports = async (ctx, next) => {
  console.log('b中间件执行');
  ctx.body += '\nhello b1';
  await next();
};
