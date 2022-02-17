/**
 * 模版 初始化信息配置
* */
const info = {
  title: '这是一个定制模板demo',
  description: '定制模板demo描述',
  preview_img_url: 'https://web.bldimg.com/cblued/static/blued_editor_custom_demo.1fkr1d3691s7j08.png',
  share_img_url: 'https://web.bldimg.com/cblued/static/chat-heartbeat-banner.1ffp4o4v52gg5lf.png',
  author: '范金艳',
}

const config = {
  // 活动模板名称，必须存在且唯一，和文件夹名保持一致
  name: 'demo',
  // 活动首页入口
  enter: '/custom/demo/home',
  // 活动基本配置
  basic: {
    option_menu: true,
    // 默认活动创建时开始
    startTime: new Date().getTime(),
    // 三天后活动结束
    endTime: new Date().getTime() + 86400000 * 3,
  },
  // 首页配置
  home: {
    bannerUrl: 'https://web.bldimg.com/cblued/static/chat-heartbeat-banner.1ffp4o4v52gg5lf.png',
    ruleBtn: 'https://web.bldimg.com/cblued/static/chat-heartbeat-rulebtn.1ffp4o4f52kuuc9.png',
    backgroundColor: '#FFDFE6',
    footerImg: 'https://web.bldimg.com/cblued/static/chat-heartbeat-foot.1ffp4o4g7vuj3i.png',
  },
  // 规则页配置
  rule: {
    bannerUrl: 'https://web.bldimg.com/cblued/static/chat-heartbeat-banner.1ffp4o4v52gg5lf.png',
    backBtn: 'https://web.bldimg.com/cblued/static/chat-heartbeat-backbtn.1ffpa9ce0u324d.png',
    backgroundColor: '#FFDFE6',
    ruleColor: '#f2557e',
    footerImg: 'https://web.bldimg.com/cblued/static/chat-heartbeat-foot.1ffp4o4g7vuj3i.png',
    text: `本次聊天室活动分为心动房推荐和心动榜单，其中心动榜以活动打榜期间主播开启心动房收到的付费礼物的弯豆数值综合计算进行计榜。
        心动榜单取排名前30的心动房主播，榜单每1分钟更新一次。
        心动值：主播在开启「心动」房型直播时，主播房间每收到1弯豆礼物增加1心动值。即心动值=1*房间礼物弯豆数
        注：「礼物周星榜」指定的活动礼物将不计入本次活动榜单值。
        活动时间：10.15 12:00-10.18 24:00，其中打榜时间：10.15 12:00-10.18 24:00`,
    rewards: `心动榜第一名主播获得聊天室Banner推荐*1天和活动打榜期间房间流水奖励6%，其最佳支持者获得Blued双肩背包*1，Yio积木钥匙扣*1
        心动榜第二名获得活动打榜期间房间流水奖励4%，其最佳支持者获得Blued双肩背包*1
        心动榜第三名获得活动打榜期间房间流水奖励2%，其最佳支持者获得23寸满头大汉伞*1
        心动榜第四名和第五名获得活动打榜期间房间流水奖励1%，其最佳支持者获得Yio积木钥匙扣*1`,
  },
  // 分享配置 必须有
  share: {
    title: '定制模板demo分享标题',
    description: '定制模板demo分享描述',
    image: 'https://web.bldimg.com/cblued/static/chat-heartbeat-banner.1ffp4o4v52gg5lf.png',
  },

}

export default { config, info }
