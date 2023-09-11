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

function xinyunxing() {
    return new Promise((resolve) => { 
        const timer = setInterval(async () => {
            let xinyunxinghaoma = false
            let xingyunxingjiangli = false
            let gushuhaoma = false
            let gushujianghli = false
            const res = await axios.get(BASEURL + '/luckystar/takeNum.asp', {
                params: {
                    sid: S_ID,
                }
            })
            if (res.data.includes('今天已领取过幸运号码')) {
                xinyunxinghaoma = true
            }
            const res2 = await axios.get(BASEURL + '/luckystar/getAward.asp', {
                params: {
                    sid: S_ID,
                }
            })
            if (res2.data.includes('您已领取过奖励') || res2.data.includes('您并没有中奖')) {
                xingyunxingjiangli = true
            }
            const res3 = await axios.get(BASEURL + '/luckytree/takeNum.asp', {
                params: {
                    sid: S_ID,
                }
            })
            if (res3.data.includes('今日已领取')) {
                gushuhaoma = true
            }
            const res4 = await axios.get(BASEURL + '/luckytree/award.asp', {
                params: {
                    sid: S_ID,
                }
            })
            if (res4.data.includes('您已领取奖励') || res4.data.includes('您并没有中奖')) {
                gushujianghli = true
            }
            if (xinyunxinghaoma && xingyunxingjiangli && gushuhaoma && gushujianghli) {
                console.log('幸运星完成')
                clearInterval(timer)
                resolve('幸运星完成')
            }
        }, 300)
    })
}
module.exports = {
    xinyunxing
}