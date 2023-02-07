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

let isLow = true
if (S_ID.startsWith('17')) { isLow = false }
async function canjiazhanchang() {
    axios.get(BASEURL + '/bground/apply.asp', {
        params: {
            sid: S_ID,
            bgid: isLow ? 1 : 2,
            armyId: 0
        }
    }).then(res => {
        axios.get(BASEURL + '/task/takeTaskAward.asp', {
            params: {
                sid: S_ID,
                type: 1,
                id: 1010
            }
        })
    }).catch(err => {
        axios.get(BASEURL + '/task/takeTaskAward.asp', {
            params: {
                sid: S_ID,
                type: 1,
                id: 1010
            }
        })
    })
    axios.get(BASEURL + '/bground/apply.asp', {
        params: {
            sid: S_ID,
            bgid: isLow ? 1 : 2,
            armyId: 1
        }
    }).then(res => {
        axios.get(BASEURL + '/task/takeTaskAward.asp', {
            params: {
                sid: S_ID,
                type: 1,
                id: 1010
            }
        })
    }).catch(err => {
        axios.get(BASEURL + '/task/takeTaskAward.asp', {
            params: {
                sid: S_ID,
                type: 1,
                id: 1010
            }
        })
    })
}
module.exports = {
    canjiazhanchang
}