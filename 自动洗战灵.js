/*
 * @Author: yuanchao
 * @Date: 2022-02-17 20:56:50
 * @FilePath: \召唤之王脚本\自动洗战灵.js
 * @Description: 
 */
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const mapName = CONFIG['地图序号']
const S_ID = CONFIG['账号']
async function jinruzhanling() {
const res = await axios.get(BASEURL + '/soul/soulPositionInfo.asp', {
        params: {
            sid: S_ID,
            petId: '19451d0039134f75b4999e74f5202e8d',
            positionId:2
        }
    })
    return res.data
}
async function xizhanling(mapStatus) {
    console.log(mapStatus);
    if (mapStatus.indexOf('当前洗练包含战灵传奇属性')!==-1) { 
        console.log('有传奇了');
        return
    }
    const res = await axios.get(BASEURL + '/soul/waskSoul.asp', {
        params: {
            sid: S_ID,
            petId: '19451d0039134f75b4999e74f5202e8d',
            positionId:2
        }
    })
    console.log('洗战灵中！');
    return res.data
}
setInterval(async () => {
    const res = await jinruzhanling()
    xizhanling(res)
},500)