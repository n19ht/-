const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
async function yabiao() {
    const res = await axios.get(BASEURL + '/transport/takeSendAwards.asp', {
        params: {
            sid: '173922_73582b8b884a166bb605',
        }
    })
    await axios.get(BASEURL + '/transport/send.asp', {
        params: {
            sid: '173922_73582b8b884a166bb605',
            id: 101
        }
    })
}
async function yabiao2() {
    const res = await axios.get(BASEURL + '/transport/takeSendAwards.asp', {
        params: {
            sid: '167928_8a75c532d495dae2b129',
        }
    })
    await axios.get(BASEURL + '/transport/send.asp', {
        params: {
            sid: '167928_8a75c532d495dae2b129',
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