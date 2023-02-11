const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
let timer = null
async function shiyonghuolicao() {
    const res = await axios.get(BASEURL + '/power/addPower.asp', {
        params: {
            sid: S_ID,
            id: 20005,
            count: 1
        }
    })
    return res.data
}
async function zhanlingta() {
    await shiyonghuolicao()
    const res = await axios.get(BASEURL + '/pagoda/newbeginpk.asp', {
        params: {
            sid: S_ID,
            id: 3,
        }
    })
    if (res.data.includes('今天挑战次数达到上限')) {
        console.log('战灵塔完成')
        return '战灵塔完成'
    }
    timezhanlingta()
}
function timezhanlingta() {
    timer = setInterval(() => {
        axios.get(BASEURL + '/pagoda/oncepk.asp', {
            params: {
                sid: S_ID,
                id: 3,
            }
        }).then(res => {
            if (res.data.includes('当前不是闯塔状态')) {
                zhanlingta()
                clearInterval(timer)
            }
        })
    }, 300)
}

async function tiankongta() {
    await shiyonghuolicao()
    await axios.get(BASEURL + '/pagoda/newbeginpk.asp', {
        params: {
            sid: S_ID,
            id: 4,
        }
    })
    await timetiankongta()
    return '天空塔完成'
}
function timetiankongta() {
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            axios.get(BASEURL + '/pagoda/oncepk.asp', {
                params: {
                    sid: S_ID,
                    id: 4,
                }
            }).then(res => {
                if (res.data.includes('当前不是闯塔状态')) {
                    console.log('天空塔完成')
                    resolve()
                    clearInterval(timer)
                }
            })
        }, 300)
    })
}

async function longwenta() {
    await shiyonghuolicao()
    const res = await axios.get(BASEURL + '/pagoda/newbeginpk.asp', {
        params: {
            sid: S_ID,
            id: 2,
        }
    })
    if (res.data.includes('今天挑战次数达到上限')) {
        console.log('龙纹塔完成')
        return '龙纹塔完成'
    }
    timelongwenta()
}
function timelongwenta() {
    const timer = setInterval(() => {
        axios.get(BASEURL + '/pagoda/oncepk.asp', {
            params: {
                sid: S_ID,
                id: 2,
            }
        }).then(async (res) => {
            await chushouzhangu()
            if (res.data.includes('当前不是闯塔状态')) {
                longwenta()
                clearInterval(timer)
            }
        })
    }, 300)
}

async function chushouzhangu() {
    const res = await axios.get(BASEURL + '/pack/sellAll.asp', {
        params: {
            sid: S_ID,
            bagType: 4,
        }
    })
    return res.data
}
async function zidongchuangta() { 
    await longwenta()
    await zhanlingta()
    await tiankongta()
}
module.exports = {
    zidongchuangta
}