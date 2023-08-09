const fs = require('fs-extra')
const path = require('path')
const packages = require('./packages')

function transferTypes (dir, dir2) {
  let srcDir = path.resolve(__dirname, `../${dir}/${dir2 || dir}`)
  if (!fs.existsSync(srcDir)) {
    srcDir = path.resolve(__dirname, `../${dir}/packages/${dir2 || dir}`)
  }
  const dts = path.resolve(__dirname, `../${dir}/index.d.ts`)
  if (!fs.existsSync(dts) && fs.existsSync(srcDir)) {
    const destDir = path.resolve(__dirname, `../${dir}`)
    const tmpDir = path.resolve(__dirname, `../${dir}/__tmp__`)
    fs.moveSync(srcDir, tmpDir)
    if (fs.existsSync(path.resolve(__dirname, `../${dir}/packages`))) {
      fs.removeSync(path.resolve(__dirname, `../${dir}/packages`))
    }
    const files = fs.readdirSync(tmpDir)
    files.forEach((filename) => {
      fs.moveSync(path.join(tmpDir, filename), path.join(destDir, filename))
    })
    fs.rmdirSync(tmpDir)
  }
}

module.exports = function () {
  // console.log('transfer types file start...')
  fs.removeSync(path.resolve(__dirname, '../dist/packages'))
  packages.forEach((dir) => transferTypes(dir, dir))
  transferTypes('dist', 'src')
  // console.log('transfer types file end!')
}