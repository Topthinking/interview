/**
 * 遍历缓存来查找通过特定模块名缓存下的模块
 */
function searchCache(moduleName, callback) {
  //  通过指定的名字resolve模块
  let mod = require.resolve(moduleName);
  const mods = [];
  // 检查该模块在缓存中是否被resolved并且被发现
  if (mod) {
    mod = require.cache[mod];
    if (mod) {
      // 递归的检查结果
      (function traverse(_mod) {
        // 检查该模块的子模块并遍历它们
        if (_mod.children.length) {
          _mod.children.forEach((child) => {
            /**
             * 1. 当前module不在node_modules里面  且
             * 2. 当前module未删除
             */
            if (
              !/\/node_modules\//.test(child.id) &&
              mods.indexOf(child.id) === -1
            ) {
              mods.push(child.id);
              traverse(child);
            }
          });
        }
        callback(_mod);
      })(mod);
    }
  }
}

/**
 * 从缓存中移除module
 */
module.exports = (moduleName) => {
  // 遍历缓存来找到通过指定模块名载入的文件
  searchCache(moduleName, (mod) => {
    delete require.cache[mod.id];
  });

  // 删除模块缓存的路径
  if (module.constructor._pathCache) {
    Object.keys(module.constructor._pathCache).forEach((cacheKey) => {
      if (cacheKey.indexOf(moduleName) > 0) {
        delete module.constructor._pathCache[cacheKey];
      }
    });
  }
};
