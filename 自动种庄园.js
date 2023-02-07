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
async function zhongzhuangyuan() {
    const res = await axios.get(BASEURL + '/manor/plantAll.asp', {
        params: {
            sid: S_ID,
            seedId: 1,
        }
    })
    await axios.get(BASEURL + '/manor/pickAll.asp', {
        params: {
            sid: S_ID,
        }
    })
    return res.data
}
module.exports = {
    zhongzhuangyuan
}