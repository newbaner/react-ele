import {EventEmmit} from '$tool/commonMethod.js';
import SingleCart from './SingleCart.js';

var model = new EventEmmit();
export default class CartView extends React.Component{
	hide(){
		model.dispatch('showCartView',false);
	}
	minus(){

	}

	render(){
		var flag = this.props.show ? 'block' : 'none';
		var list = [];
		for(var key in this.props.data){
			list.push(this.props.data[key]);
		}
		return (
				<div className="cart-view" style={{display:flag}}>
					<div className="cart-layer" onClick={this.hide}></div>
					<div className="cart-list" >
						{
							list.map(function(value,index){
								return (
									<SingleCart item={value} key={index}></SingleCart>
									)
							})
						}
					</div>
				</div>
			)
	}
}