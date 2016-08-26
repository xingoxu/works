Number.parseInt = window.parseInt;
Number.parseFloat = window.parseFloat;
Number.isNaN = window.isNaN;
var app={
  exchange: 0,
  set_exchange: function (exchange) {
    this.exchange = exchange.rates['CNY'];
    app.react_callback();
  },
  itemKinds: [{
    id: 0,
    name: '漫画单行本/小说/大型本/画集写真',
  },{
    id: 1,
    name: '杂志',
  },{
    id: 2,
    name: 'DVD/CD/BD/光盘游戏',
  },{
    id: 3,
    name: '玩具、模型',
  },{
    id: 99,
    name: '其他',
  }],
  generalPrices: {
    'EMS': function (weight) {
      'use strict';
      if(weight<=500)
        return 1400;
      if(weight<=600)
        return 1540;
      if(weight<=700)
        return 1680;
      if(weight<=800)
        return 1820;
      if(weight<=900)
        return 1960;
      if(weight<=1000)
        return 2100;
      if(weight<=1250)
        return 2400;
      if(weight<=1500)
        return 2700;
      if(weight<=1750)
        return 3000;
      if(weight<=5500){
        var singlePrice = [3300,3800,4300,4800,5300,5800,6300,6800];
        return singlePrice[Math.ceil(weight/500)-4];
      }
      if(weight<=30000){
        var singlePrice = [7300,8100,8900,9700,10500,11300,12100,12900
          ,13700,14500,15300,16100,16900,17700,18500,19300,20100,20900,21700,22500,23300,24100,24900,25700,26500];
        return singlePrice[Math.ceil(weight/1000)-6];
      }
    },
    'SAL': function (weight) {
      var singlePrice = [1800,2400,3000,3600,4200,4700,5200,5700,6200,6700
        ,7000,7300,7600,7900,8200,8500,8800,9100,9400,9700,10000,10300,10600
        ,10900,11200,11500,11800,12100,12400,12700]
      return singlePrice[Math.ceil((weight == 0 ? 1 : weight)/1000)-1];
    },
    'AIR': function (weight) {
      'use strict';
      if(weight<=10000){
        var singlePrice=[1700,2050,2400,2750,3100,3450,3800,4150,4500
          ,4850,5150,5450,5750,6050,6350,6650,6950,7250,7550,7850];
        return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/500)-1]
      }
      var singlePrice=[8250,8650,9050,9450,9850,10250,10650,11050,11450
        ,11850,12250,12650,13050,13450,13850,14250,14650,15050,15450,15850];
      return singlePrice[Math.ceil(weight/1000)-11];
    },
    'mSAL': function (weight) {
      'use strict';
      var singlePrice = [160,240,320,400,480,560,640,720,800,880,960,1040,1120,1200,1280,1360,1440,1520,1600,1680];
      return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/100)-1];
    },
    'mAIR': function (weight) {
      'use strict';
      if(weight<=1000){
        var singlePrice = [120,190,260,330,400,470,540,610,680,750,820,890,960,1030,1100,1170,1240,1310,1380,1450];
        return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/50)-1];
      }
      var singlePrice = [1625,1800,1975,2150];
      return singlePrice[Math.ceil(weight/250)-5];
    },
    'SHIP': function (weight) {
      'use strict';
      var singlePrice = [1600,1900,2200,2500,2800,3100,3400,3700,4000,4300,4550,4800,5050,5300,5550,5800,6050,6300,6550,6800,7050,7300,7550,7800,8050,8300,8550,8800,9050,9300];
      return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/1000)-1];
    }
  },
  shoppingSite: [{
    id: 0,
    name: '萌购',
    itemremark: '(商品价格* 8%（+日本国内运费）)* 支付宝汇率[1] + 代购手续费 0%~6%',
    itemprice: function (price) {
      return Math.ceil(price*1.08*app.exchange*1.03);
    },
    japanShipmentPrice: function (shipment) {
      return Math.ceil(shipment*app.exchange*1.03);
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value) : 0;
      },
      is_rmb: true,
    }],
    //重量计算
    weightCalc: function (weight) {
      return Math.ceil(weight/50)*50;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      if(weight<=3000)
        return 300;
      return weight*0.1;
    },
    methods: [{
      id: 0,
      name: '萌购团发',
      price: function (weight,itemKind) {
        //设定单价
        var singlePrice = [3,2.5,5,3];
        singlePrice[99] = 5;

        return Math.ceil(Math.ceil(weight/50)*singlePrice[itemKind]);
      },
      remark: '物品重量/50g*团发单价',
      chinaMethod: [{

      }],
      total: function (items) {
        var that = this;//萌购团发对象
        return items.reduce(function (previous,current) {
          return previous + that.price(current.weight,current.itemKind);
        },0);
      },
      no_wrapper: true,
    },{
      id: 1,
      name: '萌购直发（EMS）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[0].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['EMS'](weight)*app.exchange*1.03);
      },
      remark: '日本邮政EMS价格*支付宝汇率',
    },{
      id: 2,
      name: '萌购直发（SAL）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return Math.ceil(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 3,
      name: '萌购直发（AIR）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return Math.ceil(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 4,
      name: '萌购国际小包',
      price: function (weight) {
        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        if(weight<=500){
          return 30;
        }
        return Math.ceil((weight-500)/100)*5+30;
      },
      remark: '萌购国际小包价格'
    },{
      id: 5,
      name: '香港邮政E特快',
      price: function (weight) {
        //设定单价
        var singlePrice = [60,85,110,135,160,185,210,235,260,285,310,335,360];

        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return singlePrice[(Math.ceil((weight<=500 ? 501 : weight)/500)-2)];
      },
      remark: '萌购E特快价格'
    }],
    accordings: [{
      key: '费用构成/代购手续费',
      value: 'http://www.030buy.net/help/article?article_id=31',
      newWindow: true
    },{
      key: '团发运费',
      value: 'http://www.030buy.net/help/article?article_id=30',
      newWindow: true
    },{
      key: '重量计算/包装重量计算 [2]',
      value: 'http://www.030buy.cc/help/article?article_id=34',
      newWindow: true
    }]
  },{                                                                        // 030buy end masadora start
    id: 1,
    name: '玛沙多拉',
    itemremark: '(商品价格*8%(+日本国内运费)+ 手续费(+2%保价费))* 支付宝汇率[1]',
    itemprice: function (price) {
      return price*1.08*app.exchange*1.03;
    },
    japanShipmentPrice: function (shipment) {
      return shipment*app.exchange*1.03;
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value)*app.exchange*1.03 : 0;
      },
      is_rmb: false,
    },{
      id: 1,
      name: '保价费',
      default_value: false,
      input_type: 'checkbox',
      input_calc: function (elem,item) {
        if(!elem.checked)
          return 0;
        return item.price*0.02>=20 ? Math.ceil(item.price*0.02)*app.exchange*1.03 : 20*app.exchange*1.03;
      },
      is_rmb: false,
    }],
    finalPriceProc: function (price) {
      return Math.ceil(price);
    },
    //重量计算
    weightCalc: function (weight) {
      return Math.ceil(weight/50)*50;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      if(weight<=1000)
        return 200;
      return weight*0.2;
    },
    methods: [{
      id: 0,
      name: '玛沙直发拼团',
      price: function (weight,itemKind) {
        return 0;
      },
      otherType: 'text',
      other_input_calc: function (elem,item) {
        return Number.parseFloat(elem.value)*Math.ceil(item.weight/50);
      },
      otherUnit: '元/50g',
      remark: '物品重量*直发拼团单价',
      chinaMethod: [{

      }],
      no_wrapper: true,
    },{
      id: 1,
      name: '玛沙直发（EMS）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);//1 is masadora's id
        return Math.ceil(app.generalPrices['EMS'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政EMS价格*1.1包装手续费*支付宝汇率',
    },{
      id: 2,
      name: '玛沙直发（SAL）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);//1 is masadora's id
        return Math.ceil(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 3,
      name: '玛沙直发（AIR航空便）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 4,
      name: '玛沙直发（SAL小型包裹）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['mSAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政小型包裹SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 5,
      name: '玛沙直发（AIR小型包裹）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['mAIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政小型包裹AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 6,
      name: '玛沙直发（海运）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['SHIP'](weight)*1.2*app.exchange*1.03);
      },
      remark: '海运*1.2包装手续费*支付宝汇率',
    }],
    accordings: [{
      key: '费用构成/包装手续费',
      value: 'http://www.masadora.net/help/%E8%B4%AD%E7%89%A9%E6%8C%87%E5%8D%97-%E8%B4%B9%E7%94%A8%E6%9E%84%E6%88%90.htm',
      newWindow: true
    },{
      key: '重量计算/包装重量计算 [3]',
      value: 'http://www.masadora.net/help/%E5%8F%91%E9%80%81%E8%AF%B4%E6%98%8E-%E5%8F%91%E9%80%81%E6%96%B9%E5%BC%8F.htm',
      newWindow: true
    }]
  },{                                                                          //masadora end 任你购start
    id: 2,
    name: '任你购',
    itemremark: '(商品价格* 8%（+日本国内运费）)* 支付宝汇率[1] (+ 代购手续费 5%)',
    itemprice: function (price) {
      return Math.ceil(price*1.08*app.exchange*1.03);
    },
    japanShipmentPrice: function (shipment) {
      return Math.ceil(shipment*app.exchange*1.03);
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value) : 0;
      },
      is_rmb: true,
    }],
    //重量计算
    weightCalc: function (weight) {
      return Math.ceil(weight/50)*50;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      if(weight<=3000)
        return 300;
      return weight*0.1;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['EMS'](weight)*app.exchange*1.03);
      },
      remark: 'EMS价格*支付宝汇率',
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: 'SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: 'AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 3,
      name: '萌购国际小包',
      price: function (weight) {
        weight += app.shoppingSite[2].wrapperCalc(weight);
        if(weight<=500){
          return 30;
        }
        return Math.ceil((weight-500)/100)*5+30;
      },
      remark: '萌购国际小包价格'
    },{
      id: 4,
      name: '香港邮政E特快',
      price: function (weight) {
        //设定单价
        var singlePrice = [60,85,110,135,160,185,210,235,260,285,310,335,360];

        weight += app.shoppingSite[2].wrapperCalc(weight);
        return singlePrice[(Math.ceil((weight<=500 ? 501 : weight)/500)-2)];
      },
      remark: '萌购E特快价格'
    },{
      id: 5,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil((app.generalPrices['mSAL'](weight)+200)*app.exchange*1.03);
      },
      remark: '小型包裹SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 6,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil((app.generalPrices['mAIR'](weight)+200)*app.exchange*1.03);
      },
      remark: '小型包裹AIR价格*1.1包装手续费*支付宝汇率',
    }],
    accordings: [{
      key: '费用构成/代购手续费',
      value: 'http://rennigou.jp/help/01_03',
      newWindow: true
    }],
  },{                                                                                         //任你购end 2poi start
    id: 3,
    name: '2poi',
    itemremark: '(商品价格* 8%（+日本国内运费）)* 汇率*1.04（国际结算手续费）(+代购手续费 5%)',
    itemprice: function (price) {
      return price*1.08*app.exchange*1.04;
    },
    japanShipmentPrice: function (shipment) {
      return shipment*app.exchange*1.04;
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value) : 0;
      },
      is_rmb: true,
    }],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return app.generalPrices['EMS'](weight)*app.exchange*1.04;//处理总体以日元结算的费用时，精确到小数点后3位
      },
      remark: 'EMS价格*汇率*1.04（国际结算手续费）',
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return app.generalPrices['SAL'](weight)*1.1*app.exchange*1.04;
      },
      remark: 'SAL价格*1.1包装手续费*汇率*1.04（国际结算手续费）',
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return app.generalPrices['AIR'](weight)*1.1*app.exchange*1.04;
      },
      remark: 'AIR价格*1.1包装手续费*汇率*1.04（国际结算手续费）',
    },{
      id: 3,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return (app.generalPrices['mSAL'](weight)+200)*app.exchange*1.04;
      },
      remark: '（小型包裹SAL价格+200日元）*汇率*1.04（国际结算手续费）',
    },{
      id: 4,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return (app.generalPrices['mAIR'](weight)+200)*app.exchange*1.04;
      },
      remark: '（小型包裹AIR价格+200日元）*汇率*1.04（国际结算手续费）',
    }],
    accordings: [{
      key: '费用构成/代购手续费/国际结算手续费',
      value: 'http://2poi.jp/help/02_03',
      newWindow: true
    },{
      key: '2poi备注',
      value: '#according-4'
    },{
      key: '2poi包裹使用实际称重 [9]',
      value: '#according-9',
    }],
  },{                                                                                         //2poi end fromJapan start
    id: 4,
    name: 'fromJapan',
    itemremark: '（商品价格*8%（+日本国内运费）)*汇率[5]*1.05（系统使用费）',
    itemprice: function (price) {
      return price*1.08*app.exchange*1.05;
    },
    japanShipmentPrice: function (shipment) {
      return shipment*app.exchange*1.05;
    },
    otherBuyFees: [],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[4].wrapperCalc(weight);
        return app.generalPrices['EMS'](weight)*app.exchange*1.05;
      },
      remark: 'EMS价格*1.05（系统使用费）',
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[4].wrapperCalc(weight);
        return app.generalPrices['SAL'](weight)*app.exchange*1.05;
      },
      remark: 'SAL价格*1.05（系统使用费）',
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[4].wrapperCalc(weight);
        return app.generalPrices['AIR'](weight)*app.exchange*1.05;
      },
      remark: 'AIR价格*1.05（系统使用费）',
    },{
      id: 3,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[4].wrapperCalc(weight);
        return app.generalPrices['mSAL'](weight)*app.exchange*1.05;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return 410*app.exchange*1.05;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹SAL价格*1.05（系统使用费）',
    },{
      id: 4,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[4].wrapperCalc(weight);
        return app.generalPrices['mAIR'](weight)*app.exchange*1.05;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return 410*app.exchange*1.05;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹AIR价格*1.05（系统使用费）',
    }],
    accordings: [{
      key: '费用构成',
      value: 'http://www.fromjapan.co.jp/cn/title/charge',
      newWindow: true
    },{
      key: 'fromJapan备注',
      value: '#according-6'
    },{
      key: 'fromJapan包裹使用实际称重 [9]',
      value: '#according-9',
    }],
  },{                                                                                         //fromJapan end cdJapan start
    id: 5,
    name: 'cdJapan',
    itemremark: '商品价格*汇率[5]',
    itemprice: function (price) {
      return price*app.exchange;
    },
    japanShipmentPrice: function (shipment) {
      return 0;
    },
    otherBuyFees: [],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[5].wrapperCalc(weight);
        return app.generalPrices['EMS'](weight)*app.exchange;
      },
      remark: 'EMS价格',
    },{
      id: 1,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[5].wrapperCalc(weight);
        return app.generalPrices['mSAL'](weight)*app.exchange;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return 410*app.exchange;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹SAL价格',
    },{
      id: 2,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[5].wrapperCalc(weight);
        return app.generalPrices['mAIR'](weight)*app.exchange;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return 410*app.exchange;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹AIR价格',
    }],
    accordings: [{
      key: '运费计算',
      value: 'http://www.cdjapan.co.jp/guide/help/shipping/shipping_charge',
      newWindow: true
    },{
      key: 'cdJapan备注',
      value: '#according-7'
    },{
      key: 'cdJapan包裹使用实际称重 [9]',
      value: '#according-9',
    }],
  },{                                                                                         //cdJapan end and tenso Start
    id: 6,
    name: 'tenso转运',
    itemremark: '（商品价格*8%（+日本国内运费）)*汇率[5]',
    itemprice: function (price) {
      return price*1.08*app.exchange;
    },
    japanShipmentPrice: function (shipment) {
      return shipment*app.exchange;
    },
    otherBuyFees: [],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        function tensoEMS(weight) {
          if (weight<=1000) {
            var singlePrice = [1450,1500,1550,1700,1750,1800,1900,1910,1920,1930,2080,2090,2240,2250,2400,2410,2560,2560,2700,2700]//定义单价
            return singlePrice[Math.ceil((weight!=0 ? weight : 1)/50)-1];
          }
          if(weight<=1100)
            return 3100;
          if(weight<=1200)
            return 3180;
          if(weight<=1250)
            return 3190;
          if(weight<=1300)
            return 3500;
          if(weight<=1500)
            return 3600;
          if(weight<=1600)
            return 3940;
          if(weight<=1700)
            return 3960;
          if(weight<=1750)
            return 3970;
          if(weight<=1800)
            return 4280;
          if(weight<=1900)
            return 4300;
          if(weight<=10000){
            var singlePrice = [4320,4950,5620,6230,6830,7430,8120,8820,9500,10470,10650,11730,11800,12780,12950,13930,14100]
            return singlePrice[Math.ceil(weight/500)-4];
          }
          var singlePrice = [15250,16400,17550,18700,19500,20300,21100,21900,22700,23500,24300,25100,25900,26700,27500,28300,29100,29900,30700,31500];
          return singlePrice[Math.ceil(weight/1000)-11];
        }

        //包装计算
        weight += app.shoppingSite[6].wrapperCalc(weight);
        return tensoEMS(weight)*app.exchange;
      },
      remark: 'EMS价格+tenso手续费',
      total: function (items) {//集中包装需要手续费
        var itemLength = items.length;
        var totalWeight = items.reduce(function (previous,current) {
          return previous+current.weight;
        },0);
        return (this.price(totalWeight)+itemLength*300+200)*app.exchange;
      },
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        function tensoSAL(weight) {
          if (weight<=1000) {
            var singlePrice = [1850,1900,1950,2100,2150,2200,2300,2310,2320,2330,2340,2350,2360,2370,2380,2390,2400,2400,2400,2400]//定义单价
            return singlePrice[Math.ceil((weight!=0 ? weight : 1)/50)-1];
          }
          if(weight<=1100)
            return 3100;
          if(weight<=1200)
            return 3180;
          if(weight<=1250)
            return 3190;
          if(weight<=1300)
            return 3200;
          if(weight<=1500)
            return 3300;
          if(weight<=1600)
            return 3340;
          if(weight<=1700)
            return 3360;
          if(weight<=1750)
            return 3370;
          if(weight<=1800)
            return 3380;
          if(weight<=1900)
            return 3400;
          if(weight<=10000){
            var singlePrice = [3420,4150,4320,5030,5130,5830,6020,6720,6900,7570,7750,8530,8600,9280,9450,10130,10300]
            return singlePrice[Math.ceil(weight/500)-4];
          }
          var singlePrice = [10950,11600,12250,12900,13200,13500,13800,14100,14400,14700,15000,15300,15600,15900,16200,16500,16800,17100,17400,17700];
          return singlePrice[Math.ceil(weight/1000)-11];
        }

        //包装计算
        weight += app.shoppingSite[6].wrapperCalc(weight);
        return tensoSAL(weight)*app.exchange;
      },
      remark: 'SAL价格+tenso手续费',
      total: function (items) {//集中包装需要手续费
        var itemLength = items.length;
        var totalWeight = items.reduce(function (previous,current) {
          return previous+current.weight;
        },0);
        return (this.price(totalWeight)+itemLength*300+200)*app.exchange;
      },
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        function tensoAIR(weight) {
          if (weight<=1000) {
            var singlePrice = [1750,1800,1850,2000,2050,2100,2200,2210,2220,2230,2590,2600,2610,2620,2630,2640,2650,2650,2650,2650]//定义单价
            return singlePrice[Math.ceil((weight!=0 ? weight : 1)/50)-1];
          }
          if(weight<=1100)
            return 3100;
          if(weight<=1200)
            return 3180;
          if(weight<=1250)
            return 3190;
          if(weight<=1300)
            return 3200;
          if(weight<=1500)
            return 3300;
          if(weight<=1600)
            return 3690;
          if(weight<=1700)
            return 3710;
          if(weight<=1750)
            return 3720;
          if(weight<=1800)
            return 3730;
          if(weight<=1900)
            return 3750;
          if(weight<=10000){
            var singlePrice = [3770,4250,4770,5230,5680,6130,6670,7170,7650,8120,8600,9180,9550,10030,10050,10980,11450]
            return singlePrice[Math.ceil(weight/500)-4];
          }
          var singlePrice = [12200,12950,13700,14450,14850,15250,15650,16050,16450,16850,17250,17650,18050,18450,18850,19250,19650,20050,20450,20850];
          return singlePrice[Math.ceil(weight/1000)-11];
        }

        //包装计算
        weight += app.shoppingSite[6].wrapperCalc(weight);
        return tensoAIR(weight)*app.exchange;
      },
      remark: 'AIR价格+tenso手续费',
      total: function (items) {//集中包装需要手续费
        var itemLength = items.length;
        var totalWeight = items.reduce(function (previous,current) {
          return previous+current.weight;
        },0);
        return (this.price(totalWeight)+itemLength*300+200)*app.exchange;
      },
    },{
      id: 3,
      name: '船运',
      price: function (weight) {
        function tensoShip(weight) {
          if (weight<=1000) {
            var singlePrice = [1650,1700,1750,1900,1950,2000,2100,2110,2120,2130,2140,2150,2160,2170,2180,2190,2200,2200,2200,2200]//定义单价
            return singlePrice[Math.ceil((weight!=0 ? weight : 1)/50)-1];
          }
          if(weight<=1100)
            return 2600;
          if(weight<=1200)
            return 2680;
          if(weight<=1250)
            return 2690;
          if(weight<=1300)
            return 2700;
          if(weight<=1500)
            return 2800;
          if(weight<=1600)
            return 2840;
          if(weight<=1700)
            return 2860;
          if(weight<=1750)
            return 2870;
          if(weight<=1800)
            return 2880;
          if(weight<=1900)
            return 2900;
          if(weight<=10000){
            var singlePrice = [2920,3350,3520,3930,4030,4430,4620,5120,5300,5770,5950,6530,6600,7080,7250,7730,7900]
            return singlePrice[Math.ceil(weight/500)-4];
          }
          var singlePrice = [8500,9100,9700,10300,10550,10800,11050,11300,11550,11800,12050,12300,12550,12800,13050,13300,13550,13800,14050,14300];
          return singlePrice[Math.ceil(weight/1000)-11];
        }

        //包装计算
        weight += app.shoppingSite[6].wrapperCalc(weight);
        return tensoShip(weight)*app.exchange;
      },
      remark: '船运价格+tenso手续费',
      total: function (items) {//集中包装需要手续费
        var itemLength = items.length;
        var totalWeight = items.reduce(function (previous,current) {
          return previous+current.weight;
        },0);
        return (this.price(totalWeight)+itemLength*300+200)*app.exchange;
      },
    },{
      id: 4,
      name: 'SAL小型包裹带挂号',
      price: function (weight) {
        function tenso_mSAL(weight) {
          if (weight<=1000) {
            var singlePrice = [620,670,800,950,1080,1130,1310,1320,1410,1420,1510,1520,1610,1620,1710,1720,1810,1810,1890,1890]//定义单价
            return singlePrice[Math.ceil((weight!=0 ? weight : 1)/50)-1];
          }
          if(weight<=1100)
            return 2070;
          if(weight<=1200)
            return 2230;
          if(weight<=1250)
            return 2320;
          if(weight<=1300)
            return 2330;
          if(weight<=1400)
            return 2510;
          if(weight<=1500)
            return 2590;
          if(weight<=1600)
            return 2710;
          if(weight<=1700)
            return 2810;
          if(weight<=1750)
            return 2900;
          if(weight<=1800)
            return 2910;
          if(weight<=1900)
            return 3010;
          if(weight<=2000){
            return 3110;
          }
        }

        //包装计算
        weight += app.shoppingSite[6].wrapperCalc(weight);
        return tenso_mSAL(weight)*app.exchange*1.05;
      },
      remark: '小型包裹SAL挂号价格+tenso手续费',
      total: function (items) {//集中包装需要手续费
        var itemLength = items.length;
        var totalWeight = items.reduce(function (previous,current) {
          return previous+current.weight;
        },0);
        return (this.price(totalWeight)+itemLength*300+200)*app.exchange;
      },
    },{
      id: 5,
      name: 'AIR小型包裹带挂号',
      price: function (weight) {
        function tenso_mAIR(weight) {
          if (weight<=1000) {
            var singlePrice = [580,700,820,1040,1160,1280,1450,1530,1610,1690,1770,1850,1930,2010,2090,2170,2250,2320,2390,2460]//定义单价
            return singlePrice[Math.ceil((weight!=0 ? weight : 1)/50)-1];
          }
          if(weight<=1100)
            return 2735;
          if(weight<=1200)
            return 2815;
          if(weight<=1250)
            return 2825;
          if(weight<=1300)
            return 3010;
          if(weight<=1500)
            return 3110;
          if(weight<=1600)
            return 3325;
          if(weight<=1700)
            return 3345;
          if(weight<=1750)
            return 3355;
          if(weight<=1800)
            return 3540;
          if(weight<=1900)
            return 3560;
          if(weight<=2000){
            return 3580;
          }
        }

        //包装计算
        weight += app.shoppingSite[6].wrapperCalc(weight);
        return tenso_mAIR(weight)*app.exchange*1.05;
      },
      remark: '小型包裹AIR挂号价格+tenso手续费',
      total: function (items) {//集中包装需要手续费
        var itemLength = items.length;
        var totalWeight = items.reduce(function (previous,current) {
          return previous+current.weight;
        },0);
        return (this.price(totalWeight)+itemLength*300+200)*app.exchange;
      },
    }],
    accordings: [{
      key: 'tenso转运服务费',
      value: 'http://www.tenso.com/chs/static/guide_fee_index#tabNavi_detail_region_1',
      newWindow: true
    },{
      key: 'tenso包裹使用实际称重 [9]',
      value: '#according-9',
    }],
  }],                                                                       //shoppingSite end
  remarks: [{
    id: 1,
    words: '支付宝汇率：萌购与玛沙使用支付宝平台转换日元并以日元结算，支付宝需要支付3%国际结算手续费，即汇率*1.03，由于本站汇率实时更新，可能会与支付宝汇率相差0.5%',
    link:'https://global.alipay.com/product/websitepayment.htm'
  },{
    id: 2,
    words: '包装重量：萌购与玛沙与一些代购平台打包后会重新称重，并使用包装重量计算，此工具已计入包装重量'
  },{
    id: 3,
    words: '玛沙多拉的包装计算方式为：少于1000g为200g，大于1000g为20%'
  },{
    id: 4,
    words: '2poi的虎穴无代购手续费与日本国内运费，其他网站代购手续费正实行免费，代购手续费一栏可以保持为0。'
  },{
    id: 5,
    words: '汇率：银行卡汇率，各银行不同（即时购汇），使用信用卡支付时也有可能会被银行收取货币转换费，计算器使用的汇率为当前实时汇率，因此可能会比真实费用少，请向发卡行咨询更多信息。'
  },{
    id: 6,
    words: 'fromJapan存在会员等级折扣，由FJ点数支付的部分也免除5%系统使用费，暂时未提供计算。'
  },{
    id: 7,
    words: 'cdJapan的小型SAL与AIR与实际付款可能存在50日元+的误差，请以官方计算器为准。'
  },{
    id: 8,
    words: '此发送方式还需要支付国内运费，暂时无法将国内运费加入比较，请等待版本更新。',
  },{
    id: 9,
    words: '实际称重：计算重量为实际重量，计算器所算得包裹重量与运费未计入包装，包装重量一般约为30~100g，实际国际运费会比计算器中的费用略大，请注意。'
  },{
    id: 10,
    words: '除团发以外的直邮方法均有可能会被海关收税，请您参阅链接的进境物品归类表。',
    link: 'http://www.customs.gov.cn/Portals/0/hgzs_zfs/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E8%BF%9B%E5%A2%83%E7%89%A9%E5%93%81%E5%BD%92%E7%B1%BB%E8%A1%A8.doc'
  },{
    id: 11,
    words: '此计算器数值仅供参考，并非代表真实价格，可能存在不可抗力的费用或是计算误差等。'
  }],
  cart:[],
};

app.ajax_load_exchange = function () {
  return $.ajax({
    url: 'https://api.fixer.io/latest?base=JPY&symbols=CNY',
    dataType: 'jsonp',
    jsonpCallback: 'app.set_exchange',
    timeout: 5000,
  });
};
