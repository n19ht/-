/*
 * @Author: yuanchao
 * @Date: 2022-02-12 09:19:30
 * @FilePath: \召唤之王脚本\自动刷副本.js
 * @Description: 
 */
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
let mapName = CONFIG['地图序号']
let chuansongid = CONFIG['传送']
const BALL = CONFIG['使用的捕捉球']
const S_ID = CONFIG['账号']

async function jinruditu(mapIndex) {
    const res = await axios.get(BASEURL + '/nmap/enterNode.asp', {
        params: {
            sid: S_ID,
            nodeId: mapIndex
        }
    })
    return res.data
}
async function touzicaozuo(mapStatus) {
    if (mapStatus.indexOf('前进') === -1) return
    //点击前进
    //提取jsessionid
    let jsessionid = getJsessionid(mapStatus)
    await axios.get(BASEURL + `/nmap/stepIndex.asp${jsessionid}`, {
        params: {
            sid: S_ID,
        }
    })
    //点击停止
    const res = await axios.get(BASEURL + `/nmap/step.asp${jsessionid}`, {
        params: {
            sid: S_ID,
        }
    })
    await zengjiatouzi(res.data)
}
async function zengjiatouzi(mapStatus) {
    if (!mapStatus.includes('骰子不足')) return
    await axios.get(BASEURL + `/nmap/addDice.asp`, {
        params: {
            sid: S_ID,
            pageType: 0
        }
    })
    const res = await axios.get(BASEURL + `/nmap/addDice2Node.asp`, {
        params: {
            sid: S_ID,
            nodeId: mapName
        }
    })
}
async function chuansong() {
    const res = await axios.get(BASEURL + `/nmap/shiftTown.asp`, {
        params: {
            sid: S_ID,
            id: chuansongid
        }
    })
    mapName++
    chuansongid++
    if (res.data.includes('等级不足')) return console.log('地图挑战完成')
}
async function chongzhiditu(mapStatus) {
    if (!mapStatus.includes('重置副本')) return
    const res = await axios.get(BASEURL + `/nmap/resetNode.asp`, {
        params: {
            sid: S_ID,
            nodeId: mapName
        }
    })
    if (res.data.includes('今天重置次数已达到最大值')) {
        if (mapName % 2 === 1) {
            await chuansong()
        } else {
            mapName++
        }
    }
}
async function tiaozhanhuanshou(mapStatus) {
    if (mapStatus.indexOf('挑战幻') === -1) return
    let jsessionid = getJsessionid(mapStatus)
    await axios.get(BASEURL + `/nmap/pk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
        }
    })
}
async function shiyongbuzhuoqiu(mapStatus) {
    let jsessionid = getJsessionid(mapStatus)
    const res = await axios.get(BASEURL + `/nmap/grabPet.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            ballId: BALL
        }
    })
    if (res.data.indexOf('成功捕捉') !== -1) {
        const chongwu = res.data.slice(res.data.indexOf('恭喜你！'), res.data.indexOf('恭喜你！') + 16)
        console.log(chongwu);
    }
}
async function tiaozhanboss(mapStatus) {
    if (mapStatus.indexOf('boss') === -1) return
    await axios.get(BASEURL + `/nmap/pkBoss.asp`, {
        params: {
            sid: S_ID,
        }
    })
}
async function caiquan(mapStatus) {
    if (mapStatus.indexOf('猜拳') === -1) return
    await axios.get(BASEURL + '/nmap/event1.asp', {
        params: {
            sid: S_ID,
            type: 0
        }
    })
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
async function huoquzhanlipin(mapStatus) {
    if (mapStatus.indexOf('BOSS') !== -1 && mapStatus.indexOf('打开') !== -1) {
        let jsessionid = getJsessionid(mapStatus)
        const res = await axios.get(BASEURL + `/nmap/openBox.asp${jsessionid}`, {
            params: {
                sid: S_ID,
                type: 0
            }
        })
        shiyonghuolicao(res.data)
    }
}
function getJsessionid(mapStatus) {
    let jsessionid = ''
    if (mapStatus.indexOf(jsessionid) !== -1) {
        jsessionid = mapStatus.slice(mapStatus.indexOf(';jsessionid'), mapStatus.indexOf(';jsessionid') + 44)
    }
    return jsessionid
}
async function shuafuben() {
    const res = await jinruditu(mapName)
    await chongzhiditu(res)
    await shiyongbuzhuoqiu(res)
    await touzicaozuo(res)
    await tiaozhanhuanshou(res)
    await tiaozhanboss(res)
    await caiquan(res)
    await huoquzhanlipin(res)
}
module.exports = {
    shuafuben
}
