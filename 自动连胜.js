const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
const ZHANLI = CONFIG['连胜战力']
const LIANSHENG = CONFIG['连胜']
function getUserId(mapStatus) {
    const reg = /userId=([0-9]*)/
    return Number(mapStatus.match(reg)[1])
}
async function huoquliangji() {
    const res = await axios.get(BASEURL + '/sport/takeWinCountAward.asp', {
        params: {
            sid: S_ID,
            count: 5,
        }
    })
    if (res.data.includes('条件未达到')) return
    const res2 = await axios.get(BASEURL + '/sport/takeWinCountAward.asp', {
        params: {
            sid: S_ID,
            count: 15,
        }
    })
    if (res2.data.includes('条件未达到')) return
    const res3 = await axios.get(BASEURL + '/sport/takeWinCountAward.asp', {
        params: {
            sid: S_ID,
            count: 25,
        }
    })
    if (res3.data.includes('条件未达到')) return
    await axios.get(BASEURL + '/sport/takeWinCountAward.asp', {
        params: {
            sid: S_ID,
            count: 50,
        }
    })
}
async function jinruliansheng() {
    const res = await axios.get(BASEURL + '/sport/index.asp', {
        params: {
            sid: S_ID
        }
    })
    if (res.data.includes('你的请求过快')) return
    const pkStatus = res.data
    await huoquliangji()
    if (pkStatus.includes(`当前连胜:${LIANSHENG}`)) {
        console.log(`已经获得${LIANSHENG}连胜`)
        return 'over'
    }
    if (pkStatus.includes('点击操作过快')) return
    const linkArr = pkStatus.match(/href='\/zhzw\/user\/userInfo.asp[\s\S]*?'/g)
    let link1 = null
    let link2 = null
    if (linkArr.length === 3) {
        link1 = linkArr[1]
        link2 = linkArr[2]
    } else {
        link1 = linkArr[0]
        link2 = linkArr[1]
    }
    let p1UserId = getUserId(link1)
    let p2UserId = getUserId(link2)
    return {
        p1UserId,
        p2UserId
    }
}
async function chakanzhanji(userId) {
    const res = await axios.get(BASEURL + '/user/userInfo.asp', {
        params: {
            sid: S_ID,
            userId: userId
        }
    })
    return res.data
}
function getzhanli(pInfo) {
    if (pInfo.indexOf('点击操作过快') !== -1) return
    return Number(pInfo.match(/战力:([0-9]*)/)[1])
}

async function tiaozhan(userId) {
    const res = await axios.get(BASEURL + '/sport/pk.asp', {
        params: {
            sid: S_ID,
            otherId: userId
        }
    })
    return res.data
}

async function shiyonghuolicao(mapStatus) {
    if (mapStatus.indexOf('活力不足') === -1) return
    const res = await axios.get(BASEURL + '/power/addPower.asp', {
        params: {
            sid: S_ID,
            id: 20005,
            count: 30
        }
    })
    return res.data
}
async function lianshen() {
    const info = await jinruliansheng()
    if (info === 'over') return 'over'
    if (info === undefined) return
    const p1Info = await chakanzhanji(info.p1UserId)
    const p2Info = await chakanzhanji(info.p2UserId)
    const p1zhanli = p1Info.includes('点击操作过快') ? undefined : getzhanli(p1Info)
    const p2zhanli = p2Info.includes('点击操作过快') ? undefined : getzhanli(p2Info)
    if (p1zhanli === undefined && p2zhanli === undefined) return
    if (p1zhanli < ZHANLI) {
        const res = await tiaozhan(info.p1UserId)
        if (res.includes('点击操作过快') || res.includes('对方不在对手列表中')) return
        const res1 = await shiyonghuolicao(res)
        if (res1.includes('的请求过快')) return
    } else if (p2zhanli < ZHANLI) {
        const res = await tiaozhan(info.p2UserId)
        if (res.includes('点击操作过快') || res.includes('对方不在对手列表中')) return
        const res1 = awaitshiyonghuolicao(res)
        if (res1.includes('的请求过快')) return
    } else {
        return
    }
}
function lianshengwang() {
    const timer = setInterval(async () => {
        const res = await lianshen()
        if (res === 'over') {
            console.log(`已经获取${LIANSHENG}连胜`)
            clearInterval(timer)
        }
    }, 300)
}
module.exports = {
    lianshengwang
}