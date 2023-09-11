const { meirirenwu } = require("./自动签到");
const { zhongzhuangyuan } = require("./自动种庄园");
const { xinyunxing } = require("./自动领取幸运星");
const { canjiazhanchang } = require("./自动参加战场");
const { shuatu } = require("./自动挑战地图");
const { lianshengwang } = require("./自动连胜");
const { zidongchuangta } = require("./自动闯塔");
const { shuafuben, chuansongditu } = require("./自动刷副本");
const { wakuang } = require("./自动挖矿");
const { zhengyao } = require("./自动镇妖");
const { leitai } = require("./自动擂台");
const { liehun } = require("./自动猎魂");
const { tunshi } = require("./自动噬魂");

// meirirenwu()//签到、祝贺幻王、每日礼包
// zhongzhuangyuan()//自动种庄园
// xinyunxing()//自动幸运星
// canjiazhanchang()//自动参加战场
// shuatu()//自动挑战龙宫
// zidongchuangta(); //自动闯塔
// lianshengwang()//自动连胜
// leitai()//自动刷擂台
// zhuochongwu()//捉宠物
// zhengyao()//镇妖
wakuang(); //挖矿
// liehun()//猎魂
// tunshi()//噬魂
process.on("uncaughtException", function (err) {});

async function zhuochongwu() {
  await chuansongditu();
  setInterval(shuafuben, 500);
}
