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
async function shuatu() {
    await longgong()
    await baoshi()
    await jinling()
    console.log('今日刷图完成')
}
async function longgong() {
    console.log('开始刷龙宫')
    const res = await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 1
        }
    })
    const res2 = await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 2
        }
    })
    const res3 = await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 1
        }
    })
    const res4 = await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 2
        }
    })
    console.log('龙宫完成')
    return true
}
async function baoshi() {
    console.log('开始刷宝石图')
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 1
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 2
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 3
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 4
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 5
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 6
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 1
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 2
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 3
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 4
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 5
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 6
        }
    })
    console.log('宝石图完成')
    return true
}
async function jinling() {
    console.log('开始刷精灵图')
    const res= await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 3,
            floor: 1
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 3,
            floor: 2
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 3,
            floor: 1
        }
    })
    await axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 3,
            floor: 2
        }
    })
    console.log('精灵图完成')
    return true
}
module.exports = {
    shuatu
}