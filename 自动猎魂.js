/*
 * @Author: yuanchao
 * @Date: 2022-04-04 12:07:18
 * @FilePath: \召唤之王脚本\自动猎魂.js
 * @Description: 
 */
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
async function yijianliehun() {
    const res = await axios.get(BASEURL + '/devil/okhunt.asp', {
        params: {
            sid: S_ID,
            type: 0
        }
    })
    if (res.data.indexOf('天魂') !== -1) {
        console.log('猎到天魂' + new Date().toLocaleTimeString())
    }
    if (res.data.indexOf('龙魂') !== -1) {
        console.log('猎到龙魂' + new Date().toLocaleTimeString())
    }
}
function liehun() {
    setInterval(yijianliehun, 500)
}
module.exports = {
    liehun
}