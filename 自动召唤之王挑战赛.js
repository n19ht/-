// /zhzw/dare/pk.asp?sid=173922_b998ae995fd42d04c14d&otherId=389980
const axios = require('axios')
const CONFIG = require('./config')
const BASEURL = CONFIG['区服务器']
const S_ID = CONFIG['账号']
async function tiaozhuan() {
    const res = await axios.get(BASEURL + '/dare/pk.asp', {
        params: {
            sid: S_ID,
            otherId:389980
        }
    })
    return res.data
}
setInterval(tiaozhuan,1000)
process.on('uncaughtException', function (err) {
    console.log('uncaughtException出错')
});