//存储不同方法的实时价格
var realTimeStorage = {}; //{ methodid: {japanShipment: japanShipment}}

//国际运输方法
var ShippingMethods = React.createClass({
  displayName: "ShippingMethods",

  getInitialState: function () {
    return {};
  },
  handleOtherInput: function (event) {
    var updateState = {};
    var method_id = event.target.name;

    updateState[method_id] = event.target;
    this.setState(updateState);
  },
  render: function () {
    var item = this.props.item;
    var otherInputState = this.state;
    var japanPrice = this.props.japanPrice;
    var that = this;
    return React.createElement(
      "div",
      null,
      this.props.methods.map(function (method) {
        var internationPrice = method.price(item.weight, item.itemKind); //普通计算
        if (otherInputState[method.id]) internationPrice += method.other_input_calc(otherInputState[method.id], item); //基于输入
        if (method.other_price_base_calc) internationPrice += method.other_price_base_calc(internationPrice); //基于已付款
        internationPrice = Math.ceil(internationPrice); //处理以日元结算的整体取整

        var radioValue = that.props.siteid + '-' + method.id;
        //设定各物流的日本方面价格
        realTimeStorage[radioValue] = {
          japanPrice: japanPrice
        };

        return React.createElement(
          "div",
          { key: method.id },
          React.createElement(
            "span",
            null,
            React.createElement(
              "label",
              null,
              React.createElement("input", { type: "radio", name: "ship", value: radioValue }),
              method.name
            ),
            //玛莎或者其他可能的扩展 直发拼团可自定义运费
            method.otherType && method.otherType != 'hidden' ? React.createElement(
              "span",
              null,
              React.createElement("input", { type: method.otherType, name: method.id, onChange: that.handleOtherInput }),
              method.otherUnit
            ) : '',
            React.createElement(
              "span",
              null,
              Number.isNaN(internationPrice) ? ' 超重啦！不能运送哦！' : ' => ' + internationPrice + ' 元 '
            ),
            method.chinaMethod ? React.createElement(
              "span",
              null,
              "此发送方式还需要支付国内运费，暂时无法将国内运费加入比较，请等待版本更新",
              Number.isNaN(internationPrice) ? '' : React.createElement(
                "span",
                null,
                " 总约：",
                japanPrice + internationPrice,
                "元"
              )
            ) : Number.isNaN(internationPrice) ? '' : React.createElement(
              "span",
              null,
              " 总约：",
              japanPrice + internationPrice,
              "元"
            ),
            React.createElement(
              "p",
              null,
              "计算公式： ",
              method.remark
            )
          )
        );
      })
    );
  }
});

//ShoppingSite与ShoppingCartSite通用
//计算物品在当前站点的重量并得到一个Copy
function getRealItem(item) {
  var itemCopy = {};
  for (var key in item) {
    if (item.hasOwnProperty(key)) {
      itemCopy[key] = item[key];
    }
  }
  //获得网站特定item
  //获得计算重量
  itemCopy.weight = this.props.site.weightCalc(itemCopy.weight);
  return itemCopy;
}

//购物网站
var ShoppingSite = React.createClass({
  displayName: "ShoppingSite",

  getRealItem: getRealItem,
  getInitialState: function () {
    return {};
  },
  handleOtherBuyFeesInput: function (event) {
    var otherBuyFee = {};
    var otherBuyFee_id = event.target.name;
    otherBuyFee[otherBuyFee_id] = event.target;
    this.setState(otherBuyFee);
  },
  render: function () {
    var that = this;
    var item = this.getRealItem(this.props.item);
    var site = this.props.site;
    var japanShipmentPrice = site.japanShipmentPrice ? site.japanShipmentPrice(item.japanShipment) : 0;

    var japanPrice = //日本方面运费（人民币）
    site.itemprice(item.price) //价格
    + japanShipmentPrice; //日本国内运费
    for (var key in this.state) {
      //其他费用（来自输入）
      if (this.state.hasOwnProperty(key)) {
        japanPrice += site.otherBuyFees[key].input_calc(this.state[key], item);
      }
    }
    for (var i = 0; i < site.otherBuyFees.length; i++) {
      //其他费用（基于已付款费用）
      if (site.otherBuyFees[i].input_type == 'hidden') japanPrice += site.otherBuyFees[i].input_calc(null, item);
    }
    japanPrice = Math.ceil(japanPrice); //对以日元计算的商品整体取整
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        site.name
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "p",
          null,
          item.price ? item.price : 0,
          "日元",
          //日本国内运费
          japanShipmentPrice ? ' + ' + item.japanShipment + '日元 ' : '',
          //其他可能的手续费等费用
          Array.isArray(site.otherBuyFees) ? site.otherBuyFees.map(function (otherBuyFee) {
            var insert = (() => {
              switch (otherBuyFee.input_type) {
                case 'text':
                  return React.createElement(
                    "span",
                    null,
                    React.createElement("input", { type: "text",
                      name: otherBuyFee.id,
                      defaultValue: otherBuyFee.default_value,
                      onChange: that.handleOtherBuyFeesInput,
                      placeholder: otherBuyFee.name }),
                    otherBuyFee.is_rmb ? '元 ' : '日元 '
                  );
                  break;
                case 'checkbox':
                  return React.createElement(
                    "label",
                    null,
                    React.createElement("input", { type: "checkbox",
                      defaultChecked: otherBuyFee.default_value,
                      name: otherBuyFee.id,
                      onChange: that.handleOtherBuyFeesInput }),
                    otherBuyFee.name
                  );
                  break;
                case 'hidden':
                  return null;
                default:
                  return '看到这个说明你药丸！';
                  break;
              }
            })();
            return React.createElement(
              "span",
              { key: otherBuyFee.id },
              otherBuyFee.input_type != 'hidden' ? ' + ' : null,
              insert
            );
          }) : null,
          "=> ",
          japanPrice,
          "元"
        ),
        React.createElement(
          "p",
          null,
          "计算公式：",
          site.itemremark
        )
      ),
      React.createElement(
        "td",
        null,
        React.createElement(ShippingMethods, { methods: site.methods, item: item, japanPrice: japanPrice, siteid: site.id })
      ),
      React.createElement(
        "td",
        null,
        //根据
        site.accordings.map(function (according) {
          return React.createElement(
            "p",
            { key: according.key },
            React.createElement(
              "a",
              { href: according.value, target: according.newWindow ? '_blank' : null },
              according.key
            )
          );
        })
      )
    );
  }
});

//购物车框架
var ShoppingCart = React.createClass({
  displayName: "ShoppingCart",

  render: function () {
    var cart = this.props.cart;
    var methods = this.props.sites.reduce(function (previous, current) {
      return previous.concat(current.methods.map(function (method) {
        method.siteid = current.id;
        return method;
      }));
    }, []);
    var that = this;
    return React.createElement(
      "div",
      { className: "cart-wrapper" },
      methods.map(function (method) {
        var shipid = method.siteid + '-' + method.id;
        var cartItems = cart.reduce(function (previous, cartItem) {
          return cartItem.shipid == shipid ? previous.concat(cartItem) : previous;
        }, []);
        if (cartItems.length <= 0) return null;
        return React.createElement(ShoppingCartSite, { key: method.siteid + '-' + method.id, site: that.props.sites[method.siteid], methodid: method.id, cartItems: cartItems });
      })
    );
  }
});

//购物车站点（由运输方法分类）
var ShoppingCartSite = React.createClass({
  displayName: "ShoppingCartSite",
  //虽然是Site但以物流的方式分类
  getRealItem: getRealItem,
  getTotalItem: function (items) {
    var that = this;
    items = items.map(function (item) {
      return that.getRealItem(item);
    });
    var item = items.reduce(function (previous, current) {
      return {
        japanPrice: previous.japanPrice + current.japanPrice,
        weight: previous.weight + current.weight,
        itemKind: current.itemKind
      };
    });
    item.weight += this.props.site.wrapperCalc(item.weight);
    return item;
  },
  getTotalInterNational: function (method, items) {
    if (method.total) {
      //发送方法自定义total方法的情况下，注意，items没有经过任何处理
      return method.total(items);
    }
    var item = this.getTotalItem(items);
    var internationPrice = method.price(item.weight, item.itemKind); //普通计算
    if (this.state.otherInputTarget) internationPrice += method.other_input_calc(this.state.otherInputTarget, item); //基于输入
    if (method.other_price_base_calc) internationPrice += method.other_price_base_calc(internationPrice); //基于已付款
    internationPrice = Math.ceil(internationPrice); //以日元结算的整体取整
    return internationPrice;
  },
  getInitialState: function () {
    return {};
  },
  handleOtherInput: function (event) {
    var updateState = {};
    var method_id = event.target.name;

    updateState['otherInputTarget'] = event.target;
    this.setState(updateState);
  },
  render: function () {
    var that = this;
    var methodid = this.props.methodid;
    var method = this.props.site.methods[methodid];
    var totalWeight = this.getTotalItem(this.props.cartItems).weight;
    var totalInterNational = this.getTotalInterNational(method, this.props.cartItems);
    return React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        this.props.site.name,
        " - ",
        method.name
      ),
      this.props.cartItems.map(function (item) {
        var cartItem = that.getRealItem(item);
        return React.createElement(
          "li",
          { key: cartItem.id },
          React.createElement(
            "span",
            null,
            cartItem.japanPrice
          ),
          React.createElement(
            "span",
            null,
            cartItem.weight,
            "g"
          )
        );
      }),
      React.createElement(
        "li",
        null,
        //玛莎或者其他可能的扩展 直发拼团可自定义运费
        method.otherType && method.otherType != 'hidden' ? React.createElement(
          "span",
          null,
          React.createElement("input", { type: method.otherType, name: method.id, onChange: this.handleOtherInput }),
          method.otherUnit
        ) : null,
        method.chinaMethod ? React.createElement(
          "span",
          null,
          "此发送方式还需要支付国内运费，暂时无法将国内运费加入比较，请等待版本更新"
        ) : null
      ),
      React.createElement(
        "li",
        null,
        "合计重量：",
        totalWeight + 'g ',
        "每50g运费：",
        Math.round(totalInterNational / totalWeight * 50 * 100) / 100 + '元 ',
        "合计运费：",
        totalInterNational + '元 '
      )
    );
  }
});

var MainApp = React.createClass({
  displayName: "MainApp",

  getInitialState: function () {
    return {
      price: '',
      weight: '',
      japanShipment: '',
      itemKind: 99
    };
  },
  calc: function (event) {
    var item = {};
    switch (event.target) {
      case this.refs.itempriceInput:
        item.price = Number.parseInt(event.target.value) ? Number.parseInt(event.target.value) : 0;
        break;
      case this.refs.japanShipmentInput:
        item.japanShipment = Number.parseInt(event.target.value) ? Number.parseInt(event.target.value) : 0;
        break;
      case this.refs.itemweightInput:
        item.weight = Number.parseInt(event.target.value) ? Number.parseInt(event.target.value) : 0;
        break;
      default:
        //radio
        item.itemKind = event.target.value;
        break;
    }
    this.setState(item);
  },
  setShip: function (event) {
    if (event.target.name != 'ship' && event.target.checked != true) return;
    this.setState({
      shipid: event.target.value
    });
  },
  addToCart: function (event) {
    var item = this.state;
    var shipid = item.shipid;
    var cart = this.props.app.cart;
    var id = cart.length ? cart[cart.length - 1].id + 1 : 0;

    this.props.app.cart.push({
      id: id,
      japanPrice: realTimeStorage[shipid].japanPrice,
      weight: item.weight,
      itemKind: item.itemKind,
      shipid: shipid
    });
    //清空输入

    this.refs.shoppingCart.forceUpdate();
  },
  render: function () {
    var item = this.state;
    return React.createElement(
      "div",
      { className: "app-wrapper" },
      React.createElement(
        "form",
        { action: "javascript:;", onChange: this.calc },
        React.createElement(
          "div",
          null,
          React.createElement(
            "span",
            null,
            "物品价格（不含税）：",
            React.createElement("input", { type: "text", ref: "itempriceInput", value: item.price }),
            "日元"
          ),
          React.createElement(
            "span",
            null,
            "日本国内运费（税入）：",
            React.createElement("input", { type: "text", ref: "japanShipmentInput", value: item.japanShipment }),
            "日元"
          ),
          React.createElement(
            "span",
            null,
            "物品重量：",
            React.createElement("input", { type: "text", ref: "itemweightInput", value: item.weight }),
            "g"
          )
        ),
        React.createElement(
          "div",
          null,
          //选择物品种类
          this.props.app.itemKinds.map(function (itemKind) {
            return React.createElement(
              "label",
              { key: itemKind.id },
              React.createElement("input", { type: "radio", name: "itemKind", value: itemKind.id, defaultChecked: item.itemKind == itemKind.id }),
              itemKind.name
            );
          })
        ),
        React.createElement(
          "span",
          null,
          "当前汇率：",
          this.props.app.exchange
        )
      ),
      React.createElement(
        "div",
        { className: "table-wrapper" },
        React.createElement(
          "form",
          { action: "javascript:;", onChange: this.setShip },
          React.createElement(
            "table",
            null,
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  null,
                  "商家"
                ),
                React.createElement(
                  "td",
                  null,
                  "商品价格"
                ),
                React.createElement(
                  "td",
                  null,
                  "运送方法"
                ),
                React.createElement(
                  "td",
                  null,
                  "根据"
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              this.props.app.shoppingSite.map(function (site) {
                return React.createElement(ShoppingSite, { key: site.id,
                  site: site,
                  item: item });
              })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "right add-cart" },
        React.createElement(
          "button",
          { onClick: this.addToCart, disabled: item.shipid == undefined || !item.price || !item.weight },
          "加入购物车"
        )
      ),
      React.createElement(ShoppingCart, { ref: "shoppingCart", cart: this.props.app.cart, sites: this.props.app.shoppingSite }),
      React.createElement(
        "ol",
        { className: "remark-wrapper" },
        "备注：",
        this.props.app.remarks.map(function (remark) {
          return React.createElement(
            "li",
            { key: remark.id, id: 'according-' + remark.id },
            remark.words,
            " ",
            remark.link ? React.createElement(
              "a",
              { href: remark.link },
              "详情链接"
            ) : ''
          );
        })
      )
    );
  }
});
ReactDOM.render(React.createElement(MainApp, { app: app }), document.getElementById('react-main'));
//# sourceMappingURL=../maps/app-template.js.map
