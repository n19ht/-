const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
async function yabiao() {
    const res = await axios.get(BASEURL + '/transport/takeSendAwards.asp', {
        params: {
            sid: '173922_b998ae995fd42d04c14d',
        }
    })
    await axios.get(BASEURL + '/transport/send.asp', {
        params: {
            sid: '173922_b998ae995fd42d04c14d',
            id: 101
        }
    })
}
async function yabiao2() {
    const res = await axios.get(BASEURL + '/transport/takeSendAwards.asp', {
        params: {
            sid: '167928_e70d3d56cd1517064887',
        }
    })
    await axios.get(BASEURL + '/transport/send.asp', {
        params: {
            sid: '167928_e70d3d56cd1517064887',
            id: 101
        }
    })
}
setInterval(() => {
    yabiao()
    yabiao2()
}, 5000)
process.on('uncaughtException', function (err) {
    // console.log('uncaughtException出错')
});