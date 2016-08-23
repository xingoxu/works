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
  },
  render: function () {
    var item = this.props.item;
    var otherInputState = this.state;
    var japanPrice = this.props.japanPrice;
    var that = this;
    return <div>
        {
          this.props.methods.map(function (method) {
            var internationPrice = method.price(item.weight,item.itemKind);//普通计算
            if(otherInputState[method.id])
              internationPrice += method.other_input_calc(otherInputState[method.id],item);//基于输入
            if(method.other_price_base_calc)
              internationPrice += method.other_price_base_calc(internationPrice);//基于已付款
            internationPrice = Math.ceil(internationPrice); //处理以日元结算的整体取整

            var radioValue = that.props.siteid+'-'+method.id;
            //设定各物流的日本方面价格
            realTimeStorage[radioValue] = {
              japanPrice: japanPrice,
            };

            return <div key={method.id}>
              <span>
                <label><input type="radio" name="ship" value={radioValue} />{method.name}</label>
                {//玛莎或者其他可能的扩展 直发拼团可自定义运费
                  (method.otherType&&method.otherType!='hidden') ?
                  <span><input type={method.otherType} name={method.id} onChange={that.handleOtherInput} />{method.otherUnit}</span> :
                  ''
                }
                <span>{Number.isNaN(internationPrice) ? ' 超重啦！不能运送哦！' : ' => '+internationPrice+' 元 '}</span>
                {
                  method.chinaMethod ?
                    <span>
                    *需国内运费 <a href="#according-8">[8]</a>
                      {
                        Number.isNaN(internationPrice) ? '' : <span> 总约：{japanPrice + internationPrice}元</span>
                      }
                    </span> :
                    (Number.isNaN(internationPrice) ? '' : <span> 总约：{japanPrice + internationPrice}元</span>)
                }
                <p>计算公式： {method.remark}</p>
              </span>
            </div>
          })
        }
    </div>
  }
});
