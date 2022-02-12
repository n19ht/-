/*
 * @Author: yuanchao
 * @Date: 2022-02-12 17:27:07
 * @FilePath: \召唤之王脚本\自动闯塔.js
 * @Description: 
 */

const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const mapName = CONFIG['图序号']
const BALL = CONFIG['使用的捕捉球']
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
async function longwenta() {
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
    jsessionid = getJsessionid(result.data)
    await axios.get(BASEURL + `/pagoda/oncepk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 2
        }
    })
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
    jsessionid = getJsessionid(result.data)
    await axios.get(BASEURL + `/pagoda/oncepk.asp${jsessionid}`, {
        params: {
            sid: S_ID,
            id: 3
        }
    })
}
setInterval(() => {
    longwenta()
}, 500)
setInterval(() => {
    zhanlingta()
}, 500)