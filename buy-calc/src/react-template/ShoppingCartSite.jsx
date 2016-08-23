//购物车站点（由运输方法分类）
var ShoppingCartSite = React.createClass({//虽然是Site但以物流的方式分类
  getRealItem: getRealItem,
  getTotalItem: function (items) {
    var that = this;
    items = items.map(function (item) {
      return that.getRealItem(item);
    });
    var item = items.reduce(function (previous,current) {
      return {
        japanPrice: (previous.japanPrice + current.japanPrice),
        weight: (previous.weight + current.weight),
        itemKind: current.itemKind,
      };
    });
    item.weight += this.props.site.wrapperCalc(item.weight);
    return item;
  },
  getTotalInterNational: function (method,items) {
    if(method.total){//发送方法自定义total方法的情况下，注意，items没有经过任何处理
      return method.total(items);
    }
    var item = this.getTotalItem(items);
    var internationPrice = method.price(item.weight,item.itemKind);//普通计算
    if(this.state.otherInputTarget)
      internationPrice += method.other_input_calc(this.state.otherInputTarget,item);//基于输入
    if(method.other_price_base_calc)
      internationPrice += method.other_price_base_calc(internationPrice);//基于已付款
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
    var totalInterNational =  this.getTotalInterNational(method,this.props.cartItems);
    return <ul>
      <li>{this.props.site.name} - {method.name}</li>
      {
        this.props.cartItems.map(function (item) {
          var cartItem = that.getRealItem(item);
          return <li key={cartItem.id}>
            <span>{cartItem.japanPrice}</span>
            <span>{cartItem.weight}g</span>
          </li>
        })
      }
      <li>
      {//玛莎或者其他可能的扩展 直发拼团可自定义运费
        (method.otherType&&method.otherType!='hidden') ?
        <span><input type={method.otherType} name={method.id} onChange={this.handleOtherInput} />{method.otherUnit}</span> :
        null
      }
      {
        method.chinaMethod ?
          <span>
          此发送方式还需要支付国内运费，暂时无法将国内运费加入比较，请等待版本更新
          </span> : null
      }
      </li>
      <li>
        合计重量：{totalWeight+'g '}
        每50g运费：{Math.round(totalInterNational/totalWeight*50*100)/100+'元 '}
        合计运费：{totalInterNational+'元 '}
      </li>
    </ul>;
  }
});
