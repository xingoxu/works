//国际运输方法
var ShippingMethods = React.createClass({
  getInitialState: function () {
    return {};
  },
  handleOtherInput: function (event) {
    var updateState = {};
    var method_id = event.target.name;

    updateState[method_id] = event.target;
    this.setState(updateState);
    event.stopPropagation();
  },
  render: function () {
    var item = this.props.item;
    var otherInputState = this.state;
    var japanPrice = this.props.japanPrice;
    var that = this;
    return <div className="methods-wrapper">
        {
          this.props.methods.map(function (method) {
            var internationPrice = method.price(item.weight,item.itemKind);//普通计算
            if(otherInputState[method.id])
              internationPrice += method.other_input_calc(otherInputState[method.id],item);//基于输入
            if(method.other_price_base_calc)
              internationPrice += method.other_price_base_calc(internationPrice);//基于已付款

            internationPrice = Math.round(internationPrice*100)/100; //处理以日元结算的整体取整

            var radioValue = that.props.siteid+'-'+method.id;
            //设定各物流的日本方面价格
            realTimeStorage[radioValue] = {
              japanPrice: japanPrice,
            };

            return <div key={method.id} className="method-wrapper">
              <span className="method-upper">
                <label><input type="radio" name="ship" value={radioValue} />{method.name}</label>
                {//玛莎或者其他可能的扩展 直发拼团可自定义运费
                  (method.otherType&&method.otherType!='hidden') ?
                  <span className="method-other-type-price"><input type={method.otherType} name={method.id} onChange={that.handleOtherInput} />{method.otherUnit}</span> :
                  null
                }
                <span className="price internation-price">{Number.isNaN(internationPrice) ? ' 超重啦！不能运送哦！' : ' => '+internationPrice+' 元 '}</span>
                {
                  method.chinaMethod ?
                    <span className="inline-tip">
                    *需国内运费 <a href="#according-8">[8]</a>
                    </span> :
                    null
                }
                {
                  (Number.isNaN(internationPrice) ? null :
                  <span className="price total-price pull-right"> 总约：{Math.round((japanPrice + internationPrice)*100)/100}元</span>)
                }
              </span>
              <p className="remark">计算公式： {method.remark}</p>
            </div>
          })
        }
    </div>
  }
});
