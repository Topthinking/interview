const remove = require('./remove');

const loadMiddleware = function(middlewares, app) {
  middlewares.map((path) => {
    app.use(require(path));
    remove(path);
  });
  return middlewares.length;
};

module.exports = (middlewares) => {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }

  return (app) => {
    app.use(async (ctx, next) => {
      const appLength = app.middleware.length;
      loadMiddleware(middlewares, app);
      const middlewareLength = middlewares.length;
      await next();
      app.middleware.splice(appLength, middlewareLength);
    });
  };
};
