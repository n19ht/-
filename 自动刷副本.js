/*
 * @Author: yuanchao
 * @Date: 2022-02-12 09:19:30
 * @FilePath: \召唤之王脚本\自动刷副本.js
 * @Description: 
 */
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
//石工矿场：6幻灵湖畔：7回音之谷：8死亡沼泽：9日落海峡：10聚灵孤岛：11龙骨墓地：12巨龙冰原：13
const mapName = CONFIG['图序号']
//普通捕捉球20006强力20007
const BALL = CONFIG['使用的捕捉球']
const S_ID = CONFIG['账号']

async function jinruditu(mapIndex) {
    const res = await axios.get(BASEURL + '/enterNode.asp', {
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
    await axios.get(BASEURL + `/stepIndex.asp${jsessionid}`, {
        params: {
            sid: S_ID,
        }
    })
    //点击停止
    await axios.get(BASEURL + `/step.asp${jsessionid}`, {
        params: {
            sid: S_ID,
        }
    })
}

async function tiaozhanhuanshou(mapStatus) {
    if (mapStatus.indexOf('挑战幻') === -1) return
    let jsessionid = getJsessionid(mapStatus)
    await axios.get(BASEURL + `/pk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
        }
    })
}

async function shiyongbuzhuoqiu(mapStatus) {
    if (mapStatus.indexOf('捕捉') === -1) return
    let jsessionid = getJsessionid(mapStatus)
    const res = await axios.get(BASEURL + `/grabPet.asp${jsessionid}`, {
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
    await axios.get(BASEURL + `/pkBoss.asp`, {
        params: {
            sid: S_ID,
        }
    })
}

async function caiquan(mapStatus) {
    if (mapStatus.indexOf('猜拳') === -1) return
    await axios.get(BASEURL + '/event1.asp', {
        params: {
            sid: S_ID,
            type: 0
        }
    })
}

async function huoquzhanlipin(mapStatus) {
    if (mapStatus.indexOf('BOSS') !== -1 && mapStatus.indexOf('打开') !== -1) {
        let jsessionid = getJsessionid(mapStatus)
        await axios.get(BASEURL + `/openBox.asp${jsessionid}`, {
            params: {
                sid: S_ID,
                type: 0
            }
        })
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
    try {
        const res = await jinruditu(mapName)
        await shiyongbuzhuoqiu(res).catch((err) => {
            console.log(err);
        })
        await touzicaozuo(res).catch((err) => {
            console.log(err);
        })
        await tiaozhanhuanshou(res).catch((err) => {
            console.log(err);
        })
        await tiaozhanboss(res).catch((err) => {
            console.log(err);
        })
        await caiquan(res).catch((err) => {
            console.log(err);
        })
        await huoquzhanlipin(res).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log('出错了：', error);
    }
}
setInterval(() => { shuafuben() }, 500)