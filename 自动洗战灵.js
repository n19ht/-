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
const config = {
    petId: '75ed6c4e691d40d497bc2122f73f9b56',
    positionId: 3,
}
async function jinruzhanling() {
    const res = await axios.get(BASEURL + '/soul/soulPositionInfo.asp', {
        params: {
            sid: S_ID,
            petId: config.petId,
            positionId: config.positionId
        }
    })
    return res.data
}
async function xizhanling(mapStatus) {
    if (mapStatus.indexOf('当前洗练包含战灵传奇属性') !== -1) {
        return
    }
    const res = await axios.get(BASEURL + '/soul/waskSoul.asp', {
        params: {
            sid: S_ID,
            petId: config.petId,
            positionId: config.positionId
        }
    })
    return res.data
}
setInterval(async () => {
    const res = await jinruzhanling()
    xizhanling(res)
}, 500)