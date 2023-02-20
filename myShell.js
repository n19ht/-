/*
 * @Author: yuanchao
 * @Date: 2022-04-02 21:02:06
 * @FilePath: \召唤之王脚本\myShell.js
 * @Description: 
 */
const { meirirenwu } = require('./自动签到')
const { zhongzhuangyuan } = require('./自动种庄园')
const { xinyunxing } = require('./自动领取幸运星')
const { canjiazhanchang } = require('./自动参加战场')
const { shuatu } = require('./自动挑战地图')
const { lianshengwang } = require('./自动连胜')
const { zidongchuangta } = require('./自动闯塔')
const { shuafuben } = require('./自动刷副本')
const { wakuang } = require('./自动挖矿')
const { zhengyao } = require('./自动镇妖')

// meirirenwu()//签到、祝贺幻王、每日礼包
// zhongzhuangyuan()//自动种庄园
// xinyunxing()//自动幸运星
// canjiazhanchang()//自动参加战场
// shuatu()//自动挑战龙宫
// lianshengwang()//自动连胜
// zidongchuangta()//自动闯塔
// setInterval(shuafuben, 500)//捉宠物
// zhengyao()//镇妖
// wakuang()//挖矿
process.on('uncaughtException', function (err) {
    // console.log('uncaughtException出错')
});