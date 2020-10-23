const { override, fixBabelImports, addLessLoader,addWebpackAlias  } = require('customize-cra');
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}


module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#2DAC91'},
  }),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src")
  }),
);