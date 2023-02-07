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
async function xinyunxing() {
    axios.get(BASEURL + '/luckytree/takeNum.asp', {
        params: {
            sid: S_ID,
        }
    })
    axios.get(BASEURL + '/luckystar/takeNum.asp', {
        params: {
            sid: S_ID,
        }
    })
    setTimeout(() => {
        axios.get(BASEURL + '/luckytree/award.asp', {
            params: {
                sid: S_ID,
            }
        })
        axios.get(BASEURL + '/luckystar/getAward.asp', {
            params: {
                sid: S_ID,
            }
        })
     },2000)
    return 'res.data'
}
module.exports = {
    xinyunxing
}