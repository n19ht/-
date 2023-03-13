/*
 * @Author: yuanchao
 * @Date: 2022-02-17 20:56:50
 * @FilePath: \召唤之王脚本\自动洗战灵.js
 * @Description: 
 */
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
async function leitai(n = 0, info = '') {
    if (n === 15 || info.includes('上限')) return console.log('擂台挑战完成✅')
    let count = n
    const res = await axios.get(BASEURL + '/stage/pk.asp', {
        params: {
            sid: S_ID,
            type: 2,
            subType: 1,
            level: S_ID.startsWith('16') ? 2 : 4
        }
    })
    if (res.data.includes('失败')) {
        count++
    }
    leitai(count, res.data)
}
module.exports = {
    leitai
}