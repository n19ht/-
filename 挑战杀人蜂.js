/*
 * @Author: yuanchao
 * @Date: 2022-02-24 20:01:51
 * @FilePath: \召唤之王脚本\挑战杀人蜂.js
 * @Description: 
 */
{/* <a href="/zhzw/monstre/fight.asp?sid=167928_4b4525513fd5e53fa5f0&amp;activityId=sshd021">挑战(15活力)</a> */ }
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const mapName = CONFIG['地图序号']
const S_ID = CONFIG['账号']

async function shiyonghuolicao(mapStatus) {
    if (mapStatus.indexOf('活力') === -1) return
    const res = await axios.get(BASEURL + '/power/addPower.asp', {
        params: {
            sid: S_ID,
            id: 20005,
            count: 30
        }
    })
    return res.data
}
async function tiaozhansharenfeng() {
    const res = await axios.get(BASEURL + '/monstre/fight.asp', {
        params: {
            sid: S_ID,
            activityId: 'sshd021'
        }
    })
    return res.data
}
setInterval(async () => {
    const res = await tiaozhansharenfeng()
    console.log(res)
    await shiyonghuolicao(res)
}, 5000)