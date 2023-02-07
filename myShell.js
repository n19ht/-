/*
 * @Author: yuanchao
 * @Date: 2022-04-02 21:02:06
 * @FilePath: \召唤之王脚本\myShell.js
 * @Description: 
 */
const { qiandao } = require('./自动签到')
const { zhuhe } = require('./自动祝贺幻王')
const { viplibao } = require('./自动领取vip礼包')
const { zhongzhuangyuan } = require('./自动种庄园')
const { xinyunxing } = require('./自动领取幸运星')
const { canjiazhanchang } = require('./自动参加战场')
const { shuatu } = require('./自动挑战地图')
const { lianshen } = require('./自动连胜')
const { longwenta, zhanlingta, tiankongta } = require('./自动闯塔')
const { chushouzhangu } = require('./自动出售战骨')
const { shuafuben } = require('./自动刷副本')

// qiandao()//自动签到
// setTimeout(() => { zhuhe().catch(res => { });console.log('祝贺'); }, 0)//自动祝贺幻王
// setTimeout(() => { viplibao().catch(res => { });console.log('vip礼包') }, 0)//自动领取vip礼包
// setTimeout(() => { zhongzhuangyuan().catch(res => { });console.log('庄园') }, 0)//自动种庄园
// setTimeout(() => { xinyunxing().catch(res => { });console.log('幸运星') }, 0)//自动幸运星
// setTimeout(() => { canjiazhanchang().catch(res => { });console.log('战场') }, 0)//自动参加战场
// setTimeout(() => { shuatu().catch(res => { });console.log('龙宫') }, 0)//自动挑战龙宫
// zidongliansheng().catch(res => { });console.log('连胜')//自动连胜
chuangta().catch(res => { });console.log('闯塔')//自动闯塔
setInterval(shuafuben, 500)//捉宠物









async function chuanglongwenta() {
    return new Promise((resolve, reject) => {
        setInterval(async () => {
            try {
                const res = await longwenta()
                await chushouzhangu()
                resolve('true')
            } catch (error) {
                reject('false')
            }
        }, 300)
    })
}
async function chuangta() {
    const res = await chuanglongwenta()
    setInterval(zhanlingta, 300)
    setInterval(tiankongta, 300)
}
async function zidongliansheng() {
    let id
    const cb = () => {
        lianshen().then(res => {
            if (res === 'over') {
                clearInterval(id)
            }
        }).catch(err => { })
    }
    id = setInterval(cb, 300)
} 