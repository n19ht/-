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
async function jifeng() {
    const res = await axios.get(BASEURL + '/pointsrace/grabSite.asp', {
        params: {
            sid: S_ID,
            raceId: 1002,
            index:3
        }
    })
    return res.data
}
setInterval(jifeng,1000)