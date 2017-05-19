
import{EventEmmit,Store} from '$tool/commonMethod.js';
var model = new EventEmmit();
export default class SingleCart extends React.Component{
	minus(){
		this.props.item.num --;
		model.dispatch('changeListByItem',this.props.item)
	}
	plus(){
		this.props.item.num ++;
		model.dispatch('changeListByItem',this.props.item)
	}
	render() {
		var item = this.props.item;
		if(this.props.type === "normal"){
			var imgPath = '';
			if (item.image_path) {
				imgPath = "//fuss10.elemecdn.com/"+item.image_path+"."+item.image_path.substr(32)+"?imageMogr/format/webp/";
			}
			return (
				<div className="food-info">
					<div className="left-img">
						<img src={imgPath} alt="" />
					</div>
					<div className="food-detail">
						<h4>{item.name}</h4>
						<div className="food-view">
							<span className="price">{item.specfoods[0].price}元</span>
							<span onClick = {this.minus.bind(this)} className="minus">-</span>
							<span className="num">{item.num}</span>
							<span onClick = {this.plus.bind(this)} className="plus">+</span>
						</div>
					</div>
				</div>
			)
		}else{
			return (

					<div className="cart-info" data-itemid="${this.id}">
		            	<span>{item.name}</span>
		            	<span>{item.specfoods[0].price}元</span>
		            	<span className="minus" onClick={this.minus.bind(this)}>-</span>
		            	<span className="num">{item.num}</span>
		            	<span className="plus" onClick={this.plus.bind(this)}>+</span>
		            </div>
				)
		}
		
	}
}
SingleCart.contextTypes = {
	shopId:React.PropTypes.number
}