/*
 * @Author: yuanchao
 * @Date: 2022-02-12 17:27:07
 * @FilePath: \召唤之王脚本\自动闯塔.js
 * @Description: 
 */

const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']


function getJsessionid(mapStatus) {
    let jsessionid = ''
    if (mapStatus.indexOf(jsessionid) !== -1) {
        jsessionid = mapStatus.slice(mapStatus.indexOf(';jsessionid'), mapStatus.indexOf(';jsessionid') + 44)
    }
    return jsessionid
}
//自动闯通天塔
async function tongtianta() {
    const res = await axios.get(BASEURL + '/pagoda/index.asp', {
        params: {
            sid: S_ID,
        }
    })
    let jsessionid = getJsessionid(res.data)
    const result = await axios.get(BASEURL + `/pagoda/autopk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 1
        }
    })
}
function longwenta() {
    return new Promise(async (resolve, reject) => {
        const res = await axios.get(BASEURL + '/pagoda/index.asp', {
            params: {
                sid: S_ID,
            }
        })
        let jsessionid = getJsessionid(res.data)
        const result = await axios.get(BASEURL + `/pagoda/newbeginpk.asp${jsessionid}`, {
            params: {
                sid: S_ID,
                id: 2
            }
        })
        await shiyonghuolicao(result.data)
        jsessionid = getJsessionid(result.data)
        const jieguo = await axios.get(BASEURL + `/pagoda/oncepk.asp${jsessionid}`, {
            params: {
                sid: S_ID,
                id: 2
            }
        })
        if (jieguo.data.indexOf('2/2') !== -1 || jieguo.data.indexOf('当前不是闯塔状态') !== -1) {
            // console.log('龙纹塔完成');
            resolve('true')
        }
        reject('false')
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
async function zhanlingta() {
    const res = await axios.get(BASEURL + '/pagoda/index.asp', {
        params: {
            sid: S_ID,
        }
    })
    let jsessionid = getJsessionid(res.data)
    const result = await axios.get(BASEURL + `/pagoda/newbeginpk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 3
        }
    })
    await shiyonghuolicao(result.data)
    jsessionid = getJsessionid(result.data)
    const jieguo = await axios.get(BASEURL + `/pagoda/oncepk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 3
        }
    })
    if (jieguo.data.indexOf('2/2') !== -1) {
        console.log('战灵塔完成');
    }
}
async function tiankongta() {
    const res = await axios.get(BASEURL + '/pagoda/index.asp', {
        params: {
            sid: S_ID,
        }
    })
    let jsessionid = getJsessionid(res.data)
    const result = await axios.get(BASEURL + `/pagoda/newbeginpk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 4
        }
    })
    await shiyonghuolicao(result.data)
    jsessionid = getJsessionid(result.data)
    const jieguo = await axios.get(BASEURL + `/pagoda/oncepk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 4
        }
    })
}
module.exports = {
    longwenta,
    zhanlingta,
    tiankongta
}
