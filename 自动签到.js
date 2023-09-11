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
async function qiandao() {
    const res = await axios.get(BASEURL + '/note/note.asp', {
        params: {
            sid: S_ID,
        }
    })
    return res.data
}
async function zhuhe() {
    const res = await axios.get(BASEURL + '/dare/worship.asp', {
        params: {
            sid: S_ID,
        }
    })
    return res.data
}
async function viplibao() {
    const res = await axios.get(BASEURL + '/vip/drawDayVipGift.asp', {
        params: {
            sid: S_ID,
            seedId: 1,
        }
    })
    return res.data
}
async function meirirenwu() {
    const timer = setInterval(async () => {
        const res = await qiandao()
        const res2 = await zhuhe()
        const res3 = await viplibao()
        if (res.includes('今日已签到') && res2.includes('您今天已经膜拜过幻王') && res3.includes('你今日已经领取过')) {
            console.log('每日任务完成')
            clearInterval(timer)
            return '每日任务'
        }
    }, 300)
}
module.exports = {
    meirirenwu
}