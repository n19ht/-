/*
 * @Author: yuanchao
 * @Date: 2022-04-02 21:02:06
 * @FilePath: \召唤之王脚本\myShell.js
 * @Description: 
 */const shell = require('shelljs')
setInterval(() => {
    try {
        // shell.exec('node ./自动闯塔.js')
        shell.exec('node ./自动连胜.js')
        // shell.exec('node ./自动刷副本.js')
        // shell.exec('node ./自动洗战灵.js')
    } catch (error) {
        console.log(error)
    }
}, 800)