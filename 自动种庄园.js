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
    const timer = setInterval(async () => {
        const res = await axios.get(BASEURL + '/manor/plantAll.asp', {
            params: {
                sid: S_ID,
                seedId: 1,
            }
        })
        const zhongzhi = res.data.includes('没有闲置的土地') || res.data.includes('今日内该种子已达种植上限')
        const res2 = await axios.get(BASEURL + '/manor/pickAll.asp', {
            params: {
                sid: S_ID,
            }
        })
        const shouhuo = res2.data.includes('该土地还没有进行种植')
        if (zhongzhi && shouhuo) {
            console.log('庄园完成')
            clearInterval(timer)
        }
    }, 200)
}
module.exports = {
    zhongzhuangyuan
}