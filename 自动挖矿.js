const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
const WAKUANG = CONFIG['挖矿']
async function wakuang() {
    const timer = setInterval(async () => {
        const res = await axios.get(BASEURL + '/mining/miningItemInfo.asp', {
            params: {
                sid: S_ID,
                id: WAKUANG
            }
        })
        const reg = /矿位[0-9]+:[\s\S]*?占位/g
        const list = res.data.match(reg)
        const newList = []
        list.map((item, index) => {
            const reg = /矿位[0-9]+:空/
            if (reg.test(item)) {
                newList.push(index + 1)
            }
        })
        newList.map(async (item) => {
            const res = await axios.get(BASEURL + '/mining/occupy.asp', {
                params: {
                    sid: S_ID,
                    id: WAKUANG,
                    index: item
                }
            })
            if (res.data.includes('今日您在此矿脉的采矿次数已达上限')) {
                console.log('\x1B[31m%s\x1B[0m', '低等级：今日您在此矿脉的采矿次数已达上限')
                clearInterval(timer)
            }
            if (res.data.includes('采矿所需道具不足')) {
                console.log('\x1B[31m%s\x1B[0m', '低等级：采矿所需道具不足')
                clearInterval(timer)
            }
        })
    }, 5000)
}
module.exports = {
    wakuang
}