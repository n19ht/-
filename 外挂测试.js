/*
 * @Author: yuanchao
 * @Date: 2022-02-13 11:46:35
 * @FilePath: \召唤之王脚本\外挂测试.js
 * @Description: 
 */
// /zhzw/dare / worship.asp ? sid =173922_c5826623f356ff8e1560
const axios = require('axios')
async function test() {
    const res = await axios.get('http://47.108.60.249/zhzw/dare/worship.asp;jsessionid=72E234F333ADE3D80AD0737B14724429', {
        sid: '173922_c5826623f356ff8e1560'
    })
    console.log(res.data);
}
setInterval(() => {
    test()
}, 500)