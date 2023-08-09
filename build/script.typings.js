const vue = require('vue')
const path = require('path')
const fs = require('fs-extra')
const { upperFirst } = require('lodash/upperFirst')

function buildGlobalTypes() {
  const contents = []
  contents.push('export {}')
  contents.push('')
  contents.push("declare global 'vue' {")
  contents.push('  export interface GlobalComponents {')
  // 先判断文件是否存在，不存在则创建，并创建相应的目录
  const globalFile = path.resolve(__dirname, '../typings/global.d.ts')
  if (!fs.existsSync(globalFile)) {
    fs.createFileSync(globalFile)
  }
  // 先把文件内容清空
  fs.writeFileSync(globalFile, '')
  const basePath = path.resolve(__dirname, '../src/components')
  const components = fs.readdirSync(basePath)
  components.forEach((filename) => {
    const name = upperFirst(vue.camelize(filename))
    const componentPath = path.join(basePath, `${filename}`)
    if (fs.statSync(componentPath).isDirectory()) {
    }
  });
}

module.exports = buildGlobalTypes