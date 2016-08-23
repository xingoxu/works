//购物车框架
var ShoppingCart = React.createClass({
  render: function () {
    var cart = this.props.cart;
    var methods = this.props.sites.reduce(function (previous,current) {
      return previous.concat(current.methods.map(function (method) {
        method.siteid=current.id;
        return method;
      }));
    },[]);
    var that = this;
    return <div className="cart-wrapper">
    {
      methods.map(function (method) {
        var shipid = method.siteid+'-'+method.id;
        var cartItems = cart.reduce(function (previous,cartItem) {
          return cartItem.shipid==shipid ? previous.concat(cartItem) : previous;
        },[]);
        if(cartItems.length <=0 ) return null;
        return <ShoppingCartSite key={method.siteid+'-'+method.id} site={that.props.sites[method.siteid]} methodid={method.id} cartItems={cartItems}/>;
      })
    }
    </div>
  }
});
