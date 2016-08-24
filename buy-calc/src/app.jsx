//存储不同方法的实时价格
var realTimeStorage = {};//{ methodid: {japanShipment: japanShipment}}

//ShoppingSite与ShoppingCartSite通用
//计算物品在当前站点的重量并得到一个Copy
function getRealItem(item) {
  var itemCopy = {};
  for (var key in item) {
    if (item.hasOwnProperty(key)) {
      itemCopy[key]=item[key];
    }
  }
  //获得网站特定item
  //获得计算重量
  itemCopy.weight = this.props.site.weightCalc(itemCopy.weight);
  return itemCopy;
}

var MainApp = React.createClass({
  getInitialState: function () {
    return {
      price: '',
      weight: '',
      japanShipment: '',
      itemKind: 99,
      itemInputOpen: 'open',
      itemKindOpen: 'open'
    }
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
      default://radio
        item.itemKind = event.target.value;
        break;
    }
    this.setState(item);
  },
  getItem: function () {
    return {
      price: this.state.price,
      weight: this.state.weight,
      japanShipment: this.state.japanShipment,
      itemKind: this.state.itemKind,
      shipid: this.state.shipid
    }
  },
  setShip: function (event) {
    if(event.target.name!='ship' || event.target.checked!=true)
      return;
    this.setState({
      shipid: event.target.value
    });
  },
  addToCart: function (event) {
    var item = this.getItem();
    var shipid = item.shipid;
    var cart = this.props.app.cart;
    var id = cart.length ? (cart[cart.length-1].id+1) : 0;

    this.props.app.cart.push({
      id: id,
      japanPrice: realTimeStorage[shipid].japanPrice,
      weight: item.weight,
      itemKind: item.itemKind,
      shipid: shipid,
    });
    //清空输入
    this.setState({
      price: '',
      weight: '',
      japanShipment: ''
    });

    // this.refs.shoppingCart.forceUpdate();//设置了state就不需要再forceUpdate了
  },
  switchItemInput: function (event) {
    var isOpen = 'open';
    if(this.state.itemInputOpen){
      isOpen = false;
    }
    this.setState({
      itemInputOpen: isOpen
    });
  },
  switchItemKind: function (event) {
    var isOpen = 'open';
    if(this.state.itemKindOpen){
      isOpen = false;
    }
    this.setState({
      itemKindOpen: isOpen
    });
  },
  render: function () {
    var item = this.getItem();
    return <div className="app-wrapper">
      <div className="top">
        <div className="app-title">
          <img src="dist/title-pic.jpg"></img>
          <h1>日系剁手网站<br />综合价格对比工具</h1>
        </div>
        <p className="exchange" >当前汇率：{this.props.app.exchange}</p>
      </div>
      <form className="app-right-inputs" action="javascript:;" onChange={this.calc}>
        <section className={"item-inputs "+this.state.itemInputOpen}>
          <div className="switch" onClick={this.switchItemInput}></div>
          <h3>输入物品基本信息</h3>
          <div className="inputs">
            <label className="item-input-label">物品价格（不含税）：</label>
            <div>
              <input type="text" ref="itempriceInput" value={item.price}/>
              <label className="item-input-unit">日元</label>
            </div>
            <label className="item-input-label">日本国内运费（税入）：</label>
            <div>
              <input type="text" ref="japanShipmentInput" value={item.japanShipment}/>
              <label className="item-input-unit">日元</label>
            </div>
            <label className="item-input-label">物品重量：</label>
            <div>
              <input type="text" ref="itemweightInput" value={item.weight}/>
              <label className="item-input-unit small-unit">g</label>
            </div>
          </div>
        </section>
        <section className={"itemKind-inputs "+this.state.itemKindOpen}>
          <div className="switch" onClick={this.switchItemKind}></div>
          <h3>选择物品种类</h3>
          <div className="inputs">
            <ul>
            {//选择物品种类
              this.props.app.itemKinds.map(function (itemKind) {
                return <li>
                  <label key={itemKind.id}>
                    <input type="radio" name="itemKind" value={itemKind.id}  defaultChecked={item.itemKind==itemKind.id}/>{itemKind.name}
                  </label>
                </li>
              })
            }
            </ul>
          </div>
        </section>
        <section className="add-cart"><button onClick={this.addToCart} disabled={ !item.shipid||!item.price||!item.weight }>加入购物车</button></section>
      </form>
      <div className="table-wrapper">
        <form action="javascript:;" onChange={this.setShip}>
          <table cellspacing="0">
            <thead>
              <tr>
                <td>商家</td>
                <td>商品价格</td>
                <td>运送方法</td>
                <td>根据</td>
              </tr>
            </thead>
            <tbody>
            {
              this.props.app.shoppingSite.map(function (site) {
                return <ShoppingSite key={site.id}
                                     site={site}
                                     item={item} />
              })
            }
            </tbody>
          </table>
        </form>
      </div>

      <ShoppingCart ref='shoppingCart' cart={this.props.app.cart} sites={this.props.app.shoppingSite} />
      <ol className="remark-wrapper">
        备注：
        {
          this.props.app.remarks.map(function (remark) {
            return <li key={remark.id} id={'according-'+remark.id}>{remark.words} {remark.link ? <a href={remark.link}>详情链接</a> : '' }</li>
          })
        }
      </ol>
      <footer>
        <span>©{(new Date()).getFullYear()}</span>
        <span> xingo | </span>
        <a href="https://github.com/xingoxu/works/tree/master/buy-calc">GitHub Repo</a>
      </footer>
    </div>
  }
})
ReactDOM.render(
  <MainApp app={app} />,
  document.getElementById('react-main')
);