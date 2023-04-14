/*
 * @Author: yuanchao
 * @Date: 2022-04-04 12:32:41
 * @FilePath: \召唤之王脚本\自动噬魂.js
 * @Description: 
 */
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
const peizhi = {
    id: '835de5ddf7894019951da623c4abc039',
    petId: '75ed6c4e691d40d497bc2122f73f9b56'
}
function getJsessionid(mapStatus) {
    let jsessionid = ''
    if (mapStatus.indexOf(jsessionid) !== -1) {
        jsessionid = mapStatus.slice(mapStatus.indexOf(';jsessionid'), mapStatus.indexOf(';jsessionid') + 44)
    }
    return jsessionid
}
async function jinrushihun() {
    const res = await axios.get(BASEURL + '/devil/petAbsorbIndex.asp', {
        params: {
            sid: S_ID,
            id: peizhi.id,
            petId: peizhi.petId,
        }
    })
    return res.data
}
async function shihun() {
    let data = await jinrushihun()
    const res = await axios.get(BASEURL + '/devil/petOkabsorbIndex.asp', {
        params: {
            sid: S_ID,
            id: peizhi.id,
            petId: peizhi.petId,
        }
    })
    return res.data
}
async function querenshihun() {
    let data = await shihun()
    if (data.indexOf('(天魂)') !== -1) {
        console.log('包含高阶魂')
        return
    }
    const res = await axios.get(BASEURL + '/devil/petOkabsorb.asp' + getJsessionid(data), {
        params: {
            sid: S_ID,
            id: peizhi.id,
            petId: peizhi.petId,
        }
    })
}
const tunshi = () => { 
    setInterval(() => {
        querenshihun()
    }, 500)
}
module.exports = {
    tunshi
}