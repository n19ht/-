const { required } = require("nodemon/lib/config")

/*
 * @Author: yuanchao
 * @Date: 2022-02-12 17:02:19
 * @FilePath: \召唤之王脚本\config.js
 * @Description: 
 */
// 高等级账号：
// S_ID = '173922_b998ae995fd42d04c14d'
// 低等级账号：
// S_ID = '167928_e70d3d56cd1517064887'
// 回音之谷：8
// 死亡沼泽：9

// 龙骨墓地：12
// 巨龙冰原：13

//普通捕捉球20006强力20007

//区服务器
// 一区：'http://47.108.60.249/zhzw'
// 二区：'http://47.108.60.249/nzh'
const CONFIG = 0
module.exports = {
    '账号': CONFIG ? '173922_b998ae995fd42d04c14d' : '167928_e70d3d56cd1517064887',
    '地图序号': CONFIG ? 13 : 9,
    '使用的捕捉球': '20007',
    '区服务器': 'http://129.204.193.135:8036/zhzw',
    '连胜战力': CONFIG ? 14000 : 6000
}