import {EventEmmit} from '$tool/commonMethod.js';
var model = new EventEmmit();

export default class PriceBar extends React.Component{
	render(){
		var sum = 0;
		for(var key in this.props.data){
			sum += this.props.data[key].specfoods[0].price * this.props.data[key].num
		}
		return (
			<div className="price-bar" onClick = {this.handle}>
				<div className="cart-img"></div>
				<div className="pric-info">
					总价：{sum}元 <span id="clear">清空</span>
				</div>
			</div>

			)
	}
	handle(){
		//展示购物车列表
		model.dispatch('showCartView');
	}
}