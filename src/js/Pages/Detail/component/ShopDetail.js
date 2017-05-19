
import {Store,EventEmmit} from '$tool/commonMethod.js';
import classNames from 'classnames';
var model = new EventEmmit();
export default class ShopDetail extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data:{}
		}
	}
	componentDidMount(){
		var loc = Store('curDetail');
		
		var url = `https://mainsite-restapi.ele.me/shopping/restaurant/${this.props.shopId}?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=${loc.lat}&longitude=${loc.lng}`;
		var me = this;
		
		model.register('getHeaderInfo',function(data){
			console.log(data,"$$$$$")
			me.setState({
				data:data
			})
		});
		fetch(url).then(function(res){
			return res.json()
		}).then(function(data){
			
			model.dispatch('getHeaderInfo',data)
		})
	}
	render(){

		/*var imgPath = '';
			if (this.data.image_path) {
				imgPath = "//fuss10.elemecdn.com/"+this.data.image_path+"."+this.data.image_path.substr(32)+"?imageMogr/format/webp/";
		}*/
		return (
		
					
				)		
	}
				
}