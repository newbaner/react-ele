/*import React from 'react';*/ //es6的导入    es6导出 export default App
import SplitPane from './Component/splitPane.js';
import NavList from './Component/NavList.js';
import FoodList from './Component/FoodList.js';
import PriceBar from './Component/PriceBar.js';
import CartView from './Component/CartView.js';
/*import ShopDetail from './Component/ShopDetail.js';
*/import {EventEmmit,Store} from '$tool/commonMethod.js';
class Detail extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			navlist:[],
			list:[],
			title:'',
			shopId: this.props.params.shopId,
			toggle: false
		}
	}
	getChildContext() {
		return {
			heightList: [],
			shopId: this.state.showId
		}
	}
	componentDidMount(){
		//组件渲完成时注册事件
		var model =  new EventEmmit();
		var me = this;
		model.register('getHeaderInfo',function(data){
			console.log(data)
			me.setState({
				name:data.name,
				order_lead_time:data.order_lead_time,
				piecewise_agent_fee:data.piecewise_agent_fee,
				tips:data.piecewise_agent_fee.tips,
				promotion_info:data.promotion_info,
				icon_name:data.activities[0].icon_name,
				actips:data.activities[0].tips,
				aclength:data.activities.length,
				img:data.image_path
			})

		});
		model.register('changeListByItem', function(item){
			var t = me.state.list;
			for(var i = 0; i < t.length; i++) {
				for(var j = 0; j < t[i].foods.length; j++) {
					if(t[i].foods[j].item_id === item.item_id) {
						t[i].foods[j].num = item.num
					}
				}
			}
			me.setState({
				list: t
			})	
		});
		model.register('showCartView',function(flag){
			me.setState({
				toggle:flag || !me.state.toggle
			})
		})
		var url = `https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=${this.props.params.shopId}`;
		fetch(url).then(function(res){
			return res.json()
		}).then(function(data){
			console.log(data)

			var cartViewList = Store(me.state.shopId);
			for(var i = 0;i<data.length;i++){
				for(var j = 0;j<data[i].foods.length;j++){
					for(var key in cartViewList){
						if(cartViewList[key].item_id===data[i].foods[j].item_id){
							data[i].foods[j].num = cartViewList[key].num;
						}
					}
				}
			}
			me.setState({
				list:data
			})

		})

	}
	render() {
		var cartViewList = Store(this.state.shopId) || {};
		
		for(var i=0;i<this.state.list.length;i++){ //9
			for(var j=0;j<this.state.list[i].foods.length;j++){
				
				if(this.state.list[i].foods[j].num>0){
					cartViewList[this.state.list[i].foods[j].item_id] = this.state.list[i].foods[j];
				}
			}
		}
		Store(this.state.shopId,cartViewList);
		console.log(cartViewList)

		var img = "";
		if (this.state.img) {
				img = "//fuss10.elemecdn.com/"+this.state.img+"."+this.state.img.substr(32)+"?imageMogr/format/webp/";
		}
		return (
			<div id="detail" style = {{height:window.innerHeight}} className="foodDetail section">
				  <div  className="detail-wrapper">
				  	{/*<div style={{position:'relative'}} className="bar bar-header bar-light">
				  		<h1 className="title">{this.state.title}</h1>
							
				  	</div> */}
				  	<div className="detail-header">	
						<p>&lt;</p>
						<div className="detail-header-content">
							<div className="detail-header-left">
								<img src={img} />
							</div>
							<div className="detail-header-center">
								<p className="detail-name">{this.state.name}</p>
								<p className="detail-fee"><span className="fee-method">商家配送</span> / <span className="fee-time">{this.state.order_lead_time}</span>分钟送达 / <span className="fee-money">{this.state.tips}</span><span className="moreInfo"><a href="#"></a>></span></p>
								<p className="notice">
						            {this.state.promotion_info}
						        </p>	
							</div>

						</div>
						<div className="detail-header-active"><span className="newActive">{this.state.icon_name}</span><span className="activeContent">{this.state.actips}</span><span className="activeNum"><span className="numb">{this.state.aclength}</span>个活动</span>
						</div>
					

					</div>	

					<div className="detail-tab">
						<p className='wrap-tab'><a href="" className="tab">商品</a></p>
						<p className='wrap-tab'><a href="" className="tab">评价</a></p>
					</div>

				  	{/*<ShopDetail data={this.state.list} shopId={this.props.params.shopId}></ShopDetail>*/}
				  	<SplitPane left={<NavList data={this.state.list} shopId={this.props.params.shopId}/>} right={<FoodList data={this.state.list}/>}></SplitPane>
				  	<div className="price-wrapper">
				  		<CartView data={cartViewList} show={this.state.toggle}></CartView>
				  		<PriceBar data={cartViewList}></PriceBar>
				  	</div>

				  </div>
				  
			</div>
			
		)
	}
}
Detail.childContextTypes = {
	heightList:React.PropTypes.array,
	shopId:React.PropTypes.number
}
export default Detail