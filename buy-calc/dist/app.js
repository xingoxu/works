"use strict";var ShoppingCart=React.createClass({displayName:"ShoppingCart",handleDeleteItem:function handleDeleteItem(index){var that=this;return function(event){that.props.cart.splice(index,1);that.forceUpdate()}},render:function render(){var cart=this.props.cart;var methods=this.props.sites.reduce(function(previous,current){return previous.concat(current.methods.map(function(method){method.siteid=current.id;return method}))},[]);var that=this;return React.createElement("div",{className:"cart-wrapper",id:"shopping-cart"},methods.map(function(method){var shipid=method.siteid+"-"+method.id;var cartItems=cart.reduce(function(previous,cartItem,index){cartItem.id=index;return cartItem.shipid==shipid?previous.concat(cartItem):previous},[]);if(cartItems.length<=0)return null;return React.createElement(ShoppingCartSite,{key:method.siteid+"-"+method.id,site:that.props.sites[method.siteid],methodid:method.id,cartItems:cartItems,handleDeleteItem:that.handleDeleteItem})}))}});
"use strict";var ShoppingCartSite=React.createClass({displayName:"ShoppingCartSite",getRealItem:getRealItem,getTotalItem:function getTotalItem(items){var that=this;items=items.map(function(item){return that.getRealItem(item)});var item=items.reduce(function(previous,current){return{japanPrice:previous.japanPrice+current.japanPrice,weight:previous.weight+current.weight,itemKind:current.itemKind}});if(!this.props.site.methods[this.props.methodid].no_wrapper)item.weight+=this.props.site.wrapperCalc(item.weight);return item},getTotalInterNational:function getTotalInterNational(method,items){if(method.total){return method.total(items)}var item=this.getTotalItem(items);var internationPrice=method.price(item.weight,item.itemKind);if(this.state.otherInputTarget)internationPrice+=method.other_input_calc(this.state.otherInputTarget,item);if(method.other_price_base_calc)internationPrice+=method.other_price_base_calc(internationPrice);internationPrice=Math.ceil(internationPrice);return internationPrice},getInitialState:function getInitialState(){return{}},handleOtherInput:function handleOtherInput(event){var updateState={};var method_id=event.target.name;updateState["otherInputTarget"]=event.target;this.setState(updateState)},render:function render(){var that=this;var methodid=this.props.methodid;var method=this.props.site.methods[methodid];var totalItem=this.getTotalItem(this.props.cartItems);var totalWeight=totalItem.weight;var totalInterNational=this.getTotalInterNational(method,this.props.cartItems);return React.createElement("ul",{className:"shopping-one-cart"},React.createElement("li",{className:"title"},this.props.site.name," - ",method.name,React.createElement("span",{className:"cart-right pull-right"},"购物车")),this.props.cartItems.map(function(item){var cartItem=that.getRealItem(item);return React.createElement("li",{key:cartItem.id,className:"cart-item"},React.createElement("span",{className:"japan-price"},cartItem.japanPrice," 元"),React.createElement("span",{className:"weight"},cartItem.weight,"g"),React.createElement("button",{className:"delete-item",title:"删除此项",onClick:that.props.handleDeleteItem(cartItem.id)},"×"))}),React.createElement("li",{className:"other-type-price"},method.otherType&&method.otherType!="hidden"?React.createElement("span",null,React.createElement("input",{type:method.otherType,name:method.id,onChange:this.handleOtherInput}),method.otherUnit):null,method.chinaMethod?React.createElement("span",{className:"inline-tip"},"*需国内运费 ",React.createElement("a",{href:"#according-8"},"[8]")):null),React.createElement("li",{className:"total-price"},"合计重量：",React.createElement("label",{className:"price"},totalWeight+"g "),"每50g运费：",React.createElement("label",{className:"price"},!Number.isNaN(Math.round(totalInterNational/totalWeight*50*100)/100)?Math.round(totalInterNational/totalWeight*50*100)/100+"元 ":"超重啦！"),!Number.isNaN(totalInterNational)?React.createElement("span",null,"合计运费：",React.createElement("label",{className:"price"},Math.round(totalInterNational*100)/100+"元 ")):null,!Number.isNaN(totalInterNational)?React.createElement("span",null,"合计金额：",React.createElement("label",{className:"price"},Math.round((totalItem.japanPrice+totalInterNational)*100)/100+"元")):null))}});
"use strict";var ShippingMethods=React.createClass({displayName:"ShippingMethods",getInitialState:function getInitialState(){return{}},handleOtherInput:function handleOtherInput(event){var updateState={};var method_id=event.target.name;updateState[method_id]=event.target;this.setState(updateState);event.stopPropagation()},render:function render(){var item=this.props.item;var otherInputState=this.state;var japanPrice=this.props.japanPrice;var that=this;return React.createElement("div",{className:"methods-wrapper"},this.props.methods.map(function(method){var internationPrice=method.price(item.weight,item.itemKind);if(otherInputState[method.id])internationPrice+=method.other_input_calc(otherInputState[method.id],item);if(method.other_price_base_calc)internationPrice+=method.other_price_base_calc(internationPrice);internationPrice=Math.round(internationPrice*100)/100;var radioValue=that.props.siteid+"-"+method.id;realTimeStorage[radioValue]={japanPrice:japanPrice};return React.createElement("div",{key:method.id,className:"method-wrapper"},React.createElement("span",{className:"method-upper"},React.createElement("label",null,React.createElement("input",{type:"radio",name:"ship",value:radioValue}),method.name),method.otherType&&method.otherType!="hidden"?React.createElement("span",{className:"method-other-type-price"},React.createElement("input",{type:method.otherType,name:method.id,onChange:that.handleOtherInput}),method.otherUnit):null,React.createElement("span",{className:"price internation-price"},Number.isNaN(internationPrice)?" 超重啦！不能运送哦！":" => "+internationPrice+" 元 "),method.chinaMethod?React.createElement("span",{className:"inline-tip"},"*需国内运费 ",React.createElement("a",{href:"#according-8"},"[8]")):null,Number.isNaN(internationPrice)?null:React.createElement("span",{className:"price total-price pull-right"}," 总约：",Math.round((japanPrice+internationPrice)*100)/100,"元")),React.createElement("p",{className:"remark"},"计算公式： ",method.remark))}))}});
"use strict";var ShoppingSite=React.createClass({displayName:"ShoppingSite",getRealItem:getRealItem,getInitialState:function getInitialState(){return{}},handleOtherBuyFeesInput:function handleOtherBuyFeesInput(event){var otherBuyFee={};var otherBuyFee_id=event.target.name;otherBuyFee[otherBuyFee_id]=event.target;this.setState(otherBuyFee)},render:function render(){var that=this;var item=this.getRealItem(this.props.item);var site=this.props.site;var japanShipmentPrice=site.japanShipmentPrice?site.japanShipmentPrice(item.japanShipment):0;var japanPrice=site.itemprice(item.price)+japanShipmentPrice;for(var key in this.state){if(this.state.hasOwnProperty(key)){japanPrice+=site.otherBuyFees[key].input_calc(this.state[key],item)}}for(var i=0;i<site.otherBuyFees.length;i++){if(site.otherBuyFees[i].input_type=="hidden")japanPrice+=site.otherBuyFees[i].input_calc(null,item)}if(site.finalPriceProc){japanPrice=site.finalPriceProc(japanPrice)}japanPrice=Math.round(japanPrice*100)/100;return React.createElement("li",{id:site.name},React.createElement("div",{className:"site-name"},React.createElement("h3",null,"商家"),site.name),React.createElement("div",{className:"japan-price"},React.createElement("h3",null,"商品价格"),React.createElement("div",{className:"japan-price-wrapper"},item.price?item.price:0,"日元",japanShipmentPrice?" + "+item.japanShipment+"日元 ":null,Array.isArray(site.otherBuyFees)?site.otherBuyFees.map(function(otherBuyFee){var insert=function(){switch(otherBuyFee.input_type){case"text":return React.createElement("span",null,React.createElement("input",{type:"text",name:otherBuyFee.id,defaultValue:otherBuyFee.default_value,onChange:that.handleOtherBuyFeesInput,placeholder:otherBuyFee.name}),otherBuyFee.is_rmb?"元 ":"日元 ");break;case"checkbox":return React.createElement("label",null,React.createElement("input",{type:"checkbox",defaultChecked:otherBuyFee.default_value,name:otherBuyFee.id,onChange:that.handleOtherBuyFeesInput}),otherBuyFee.name);break;case"hidden":return null;default:return"看到这个说明你药丸！";break;}}();return React.createElement("span",{key:otherBuyFee.id},otherBuyFee.input_type!="hidden"?" + ":null,insert)}):null,"=> ",React.createElement("span",{className:"price japan-price"},japanPrice," 元")),React.createElement("p",null,"计算公式：",site.itemremark)),React.createElement("div",{className:"site-method"},React.createElement("h3",null,"运送方法"),React.createElement(ShippingMethods,{methods:site.methods,item:item,japanPrice:japanPrice,siteid:site.id})),React.createElement("div",{className:"site-according"},React.createElement("h3",null,"根据"),site.accordings.map(function(according){return React.createElement("p",{key:according.key},React.createElement("a",{href:according.value,target:according.newWindow?"_blank":null},according.key))})))}});
'use strict';var realTimeStorage={};function getRealItem(item){var itemCopy={};for(var key in item){if(item.hasOwnProperty(key)){itemCopy[key]=item[key]}}itemCopy.weight=this.props.site.weightCalc(itemCopy.weight);return itemCopy}var MainApp=React.createClass({displayName:'MainApp',getInitialState:function getInitialState(){return{price:0,weight:'',japanShipment:'',itemKind:99,itemInputOpen:'open',itemKindOpen:'open',exchange_ajaxing:true,exchange_editing:false}},componentDidMount:function componentDidMount(){this.props.app.react_callback=function(){if(!this.isMounted()||this.state.exchange_editing)return;this.setState({exchange_ajaxing:false})}.bind(this);this.reload_live_exchange()},reload_live_exchange:function reload_live_exchange(){this.setState({exchange_ajaxing:true});this.exchange_request=this.props.app.ajax_load_exchange()},calc:function calc(event){var item={};switch(event.target){case this.refs.itempriceInput:item.price=Number.parseInt(event.target.value)?Number.parseInt(event.target.value):0;break;case this.refs.japanShipmentInput:item.japanShipment=Number.parseInt(event.target.value)?Number.parseInt(event.target.value):0;break;case this.refs.itemweightInput:item.weight=Number.parseInt(event.target.value)?Number.parseInt(event.target.value):0;break;default:item.itemKind=event.target.value;break;}this.setState(item)},getItem:function getItem(){return{price:this.state.price,weight:this.state.weight,japanShipment:this.state.japanShipment,itemKind:this.state.itemKind,shipid:this.state.shipid}},setShip:function setShip(event){if(event.target.name!='ship'||event.target.checked!=true)return;this.setState({shipid:event.target.value})},addToCart:function addToCart(event){var item=this.getItem();var shipid=item.shipid;var cart=this.props.app.cart;this.props.app.cart.push({japanPrice:realTimeStorage[shipid].japanPrice,weight:item.weight,itemKind:item.itemKind,shipid:shipid});this.setState({price:0,weight:'',japanShipment:''});$(window).scrollTop($('#shopping-cart').offset().top)},switchItemInput:function switchItemInput(event){var isOpen='open';if(this.state.itemInputOpen){isOpen=false}this.setState({itemInputOpen:isOpen})},switchItemKind:function switchItemKind(event){var isOpen='open';if(this.state.itemKindOpen){isOpen=false}this.setState({itemKindOpen:isOpen})},switchSideSites:function switchSideSites(event){var isOpen='open';if(this.state.sideSiteOpen){isOpen=false}this.setState({sideSiteOpen:isOpen})},toTop:function toTop(event){window.scrollTo(null,0)},switchMobileSideBar:function switchMobileSideBar(event){var isOpen='open';if(this.state.mobileSideBar){isOpen=false}this.setState({mobileSideBar:isOpen})},edit_exchange:function edit_exchange(event){if(this.exchange_request)this.exchange_request.abort();this.setState({exchange_editing:true})},change_exchange:function change_exchange(event){this.props.app.exchange=Number.parseFloat(this.refs.exchangeInput.value)?Number.parseFloat(this.refs.exchangeInput.value):this.props.app.exchange;this.setState({exchange_editing:false})},render:function render(){var item=this.getItem();return React.createElement('div',{className:'app-wrapper'},React.createElement('div',{className:'top'},React.createElement('div',{className:'app-title'},React.createElement('img',{src:'dist/title-pic.jpg'}),React.createElement('h1',null,'日系剁手网站',React.createElement('br',null),'综合价格对比工具')),React.createElement('div',{className:'center-exchange-wrapper pull-right'},React.createElement('div',{className:'exchange-wrapper '+(this.state.exchange_editing?'editing':'')},React.createElement('div',{className:'exchange'},React.createElement('p',null,'当前汇率：',this.props.app.exchange?this.props.app.exchange:'需要手动更新汇率'),React.createElement('button',{className:'edit',onClick:this.edit_exchange,title:'手动修改汇率'}),React.createElement('button',{className:'reload '+(this.state.exchange_ajaxing?'loading':''),onClick:this.reload_live_exchange,disabled:this.state.exchange_ajaxing||this.state.exchange_editing,title:'请求实时汇率'})),React.createElement('div',{className:'exchange editor'},React.createElement('p',null,'当前汇率：',React.createElement('input',{type:'text',ref:'exchangeInput'})),React.createElement('button',{onClick:this.change_exchange,title:'确认'}))))),React.createElement('form',{className:'app-right-inputs '+this.state.mobileSideBar,action:'javascript:;',onChange:this.calc},React.createElement('section',{className:'item-inputs '+this.state.itemInputOpen},React.createElement('div',{className:'switch',onClick:this.switchItemInput}),React.createElement('h3',null,'输入物品基本信息'),React.createElement('div',{className:'inputs'},React.createElement('label',{className:'item-input-label'},'物品价格（不含税）：'),React.createElement('div',null,React.createElement('input',{type:'text',ref:'itempriceInput',value:item.price}),React.createElement('label',{className:'item-input-unit'},'日元')),React.createElement('label',{className:'item-input-label'},'日本国内运费（税入）：'),React.createElement('div',null,React.createElement('input',{type:'text',ref:'japanShipmentInput',value:item.japanShipment}),React.createElement('label',{className:'item-input-unit'},'日元')),React.createElement('label',{className:'item-input-label'},'物品重量：'),React.createElement('div',null,React.createElement('input',{type:'text',ref:'itemweightInput',value:item.weight}),React.createElement('label',{className:'item-input-unit small-unit'},'g')))),React.createElement('section',{className:'itemKind-inputs '+this.state.itemKindOpen},React.createElement('div',{className:'switch',onClick:this.switchItemKind}),React.createElement('h3',null,'选择物品种类'),React.createElement('div',{className:'inputs'},React.createElement('ul',null,this.props.app.itemKinds.map(function(itemKind){return React.createElement('li',null,React.createElement('label',{key:itemKind.id},React.createElement('input',{type:'radio',name:'itemKind',value:itemKind.id,defaultChecked:item.itemKind==itemKind.id}),itemKind.name))})))),React.createElement('section',{className:'select-ship'},React.createElement('h3',null,React.createElement('span',{className:'mobile-none'},'←'),' 选择商家的运送方法')),React.createElement('section',{className:'add-cart'},React.createElement('button',{onClick:this.addToCart,disabled:!item.shipid||!item.weight},'加入购物车')),React.createElement('section',{className:'side-sites '+this.state.sideSiteOpen},React.createElement('div',{className:'switch',onClick:this.switchSideSites}),React.createElement('h3',null,'快速跳转商家'),React.createElement('div',{className:'inputs'},this.props.app.shoppingSite.map(function(site){return React.createElement('a',{href:'#'+site.name},site.name)})))),React.createElement('button',{id:'menu',onClick:this.switchMobileSideBar}),React.createElement('button',{id:'totop',onClick:this.toTop}),React.createElement('div',{className:'table-wrapper'},React.createElement('form',{action:'javascript:;',onChange:this.setShip},React.createElement('ul',null,this.props.app.shoppingSite.map(function(site){return React.createElement(ShoppingSite,{key:site.id,site:site,item:item})})))),React.createElement(ShoppingCart,{ref:'shoppingCart',cart:this.props.app.cart,sites:this.props.app.shoppingSite}),React.createElement('ol',{className:'remark-wrapper'},'备注：',this.props.app.remarks.map(function(remark){return React.createElement('li',{key:remark.id,id:'according-'+remark.id},remark.words,' ',remark.link?React.createElement('a',{href:remark.link},'详情链接'):'')})),React.createElement('footer',null,React.createElement('span',null,'© ',new Date().getFullYear()),React.createElement('span',null,' xingo | '),React.createElement('a',{href:'https://github.com/xingoxu/works/tree/master/buy-calc'},'GitHub Repo'),React.createElement('span',null,' | '),React.createElement('a',{href:'https://github.com/xingoxu/works/blob/master/buy-calc/changelog.md'},'更新日志')))}});ReactDOM.render(React.createElement(MainApp,{app:app}),document.getElementById('react-main'));
//# sourceMappingURL=../maps/app.js.map
