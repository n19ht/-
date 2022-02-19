/*
 * @Author: yuanchao
 * @Date: 2022-02-13 11:35:27
 * @FilePath: \召唤之王脚本\自动连胜.js
 * @Description: 
 */

const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
const ZHANLI = CONFIG['连胜战力']

async function jinruliansheng() {
    const res = await axios.get(BASEURL + '/sport/index.asp', {
        params: {
            sid: S_ID
        }
    })
    const pkStatus = res.data
    if (iscaozuoguokuai(pkStatus)) return
    const linkArr = pkStatus.match(/href='\/zhzw\/user\/userInfo.asp[\s\S]*?'/g)
    linkArr.splice(0, 1)//pk的两个人的链接
    let jsessionid = getJsessionid(linkArr[1])
    let p1UserId = getUserId(linkArr[0])
    let p2UserId = getUserId(linkArr[1])
    return {
        jsessionid,
        p1UserId,
        p2UserId
    }
}
// 点击操作过快
function iscaozuoguokuai(mapStatus) {
    return mapStatus.indexOf('点击操作过快') !== -1
}
async function chakanzhanji(jsessionid, userId) {
    const res = await axios.get(BASEURL + '/user/userInfo.asp' + jsessionid, {
        params: {
            sid: S_ID,
            userId: userId
        }
    })
    return res.data
}
function getJsessionid(mapStatus) {
    let jsessionid = ''
    if (mapStatus.indexOf(jsessionid) !== -1) {
        jsessionid = mapStatus.slice(mapStatus.indexOf(';jsessionid'), mapStatus.indexOf(';jsessionid') + 44)
    }
    return jsessionid
}
function getUserId(mapStatus) {
    let userId = ''
    if (mapStatus.indexOf('userId') !== -1) {
        userId = mapStatus.slice(mapStatus.indexOf('userId') + 7, mapStatus.indexOf('userId') + 13)
    }
    return userId
}
function getzhanli(pInfo) {
    return pInfo.match(/战力:[0-9]*/)[0].slice(3) * 1
}

async function tiaozhan(jsessionid, userId) {
    const res = await axios.get(BASEURL + '/sport/pk.asp' + jsessionid, {
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
    const p1Info = await chakanzhanji(info.jsessionid, info.p1UserId)
    const p2Info = await chakanzhanji(info.jsessionid, info.p2UserId)
    const p1zhanli = getzhanli(p1Info)
    const p2zhanli = getzhanli(p2Info)
    console.log(p1zhanli, p2zhanli);
    if (p1zhanli < ZHANLI) {
        const res = await tiaozhan(info.jsessionid, info.p1UserId)
        shiyonghuolicao(res)
    } else if (p2zhanli < ZHANLI) {
        const res = await tiaozhan(info.jsessionid, info.p2UserId)
        shiyonghuolicao(res)
    } else {
        console.log('挑战列表的这两个你都打不过！');
    }
}
setInterval(() => {
    lianshen()
}, 1000)