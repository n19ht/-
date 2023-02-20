const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
async function zhengyao() {
    const timer = setInterval(async () => {
        const res = await axios.get(BASEURL + '/pagoda/todemon.asp', {
            params: {
                sid: S_ID,
                id: 1,
                pvpType: 1
            }
        })
        const reg = /第[0-9]+?层[\s\S]*?(挑战|占领)/g
        const list = res.data.match(reg).reverse()
        const newList = list.map(item => {
            const reg = /floor=([0-9]+)/
            const floor = Number(item.match(reg)[1])
            return {
                floor,
                kong: item.includes('层&nbsp;空.')
            }
        })
        newList.map(async (item) => {
            if (item.kong) {
                const res2 = await axios.get(BASEURL + '/pagoda/grabSite.asp', {
                    params: {
                        sid: S_ID,
                        id: 1,
                        floor: item.floor
                    }
                })
                if (res2.data.includes('镇妖符不足')) {
                    console.log('\x1B[31m%s\x1B[0m', '低等级：⚠️⚠️⚠️⚠️镇妖符不足')
                    clearInterval(timer)
                }
                if (res2.data.includes('成功占领第')) {
                    console.log('低等级：🎉占领聚魂阵成功')
                }
                if (res2.data.includes('次数不足')) {
                    console.log('\x1B[31m%s\x1B[0m', '低等级：镇妖次数不足')
                    clearInterval(timer)
                }
            }
        })
    }, 5000)
}
module.exports = {
    zhengyao
}