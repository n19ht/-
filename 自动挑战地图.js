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
    longgong()
    setTimeout(() => { baoshi() }, 0)
    setTimeout(() => { jinling() }, 1000)
}
async function longgong() {
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 1
        }
    })
    await axios.get(BASEURL + '/ncopy/pk.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 2
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 1
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 1,
            floor: 2
        }
    })
}
async function baoshi() {
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
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 1
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 2
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 3
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 4
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 5
        }
    })
    axios.get(BASEURL + '/ncopy/takeAward.asp', {
        params: {
            sid: S_ID,
            id: 2,
            floor: 6
        }
    })
}
async function jinling() {
    await axios.get(BASEURL + '/ncopy/pk.asp', {
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
}
module.exports = {
    shuatu
}