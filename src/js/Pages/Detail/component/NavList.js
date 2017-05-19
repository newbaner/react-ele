import {Store,EventEmmit} from '$tool/commonMethod.js';
import classNames from 'classnames';
var model = new EventEmmit();
export default class NavList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			curIndex:0
		}
	}
	componentDidMount(){
		var loc = Store('curDetail');
		
		var url = `https://mainsite-restapi.ele.me/shopping/restaurant/${this.props.shopId}?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=${loc.lat}&longitude=${loc.lng}`
		var me = this;
		
		model.register('changeCurIndex',function(index){
			me.setState({
				curIndex:index
			})
		})
		fetch(url).then(function(res){
			return res.json()
		}).then(function(data){
			
			model.dispatch('getHeaderInfo',data)
		})
	}
	handle(index){
		/*console.log('左边导航条内容进行点击',index);*/
		this.setState({
			curIndex:index
		})
		var curIndex = index -1;
		var offsetHeight = this.context.heightList[curIndex];
		if(curIndex === -1){
			offsetHeight = 0;
		}
		
		this.props.onJump(offsetHeight);
	}
	render(){
		var me = this;
		return(
				<ul id="navlist">
					{
						this.props.data.map(function(value,index){
							return <li key={index} className = {classNames({active:me.state.curIndex === index})} onClick = {me.handle.bind(me,index)}>{value.name}</li>
						})
					}
				</ul>
		)
	}
}
NavList.contextTypes = {
	heightList:React.PropTypes.array
}