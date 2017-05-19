import SearchBox from '~/src/js/common/SearchBox.js';

import {Store} from '~/src/js/tool/commonMethod.js';

import {browserHistory, Link} from 'react-router'

import List from '~/src/js/common/List.js';

import ItemLi from '~/src/js/common/ItemLi.js';

import ReactSwipe from 'react-swipe';

import HeaderIcon from './component/headerIcon.js'
class Rlist extends React.Component {
	constructor(props){
		super(props)
		this.state={
			list:[],
			iconList:[]
		}
	}
	componentDidMount(){
		var me = this;
		var url = `/v2/index_entry?geohash=${this.props.params.geohash}&group_type=1&flags[]=F`;
		fetch(url).then(function(res){
			return res.json()

		}).then(function(data){
			console.log(data)
			me.setState({
				iconList:data
			})
		})
		var loc = Store('curLoc');
		if(!loc){
			alert("请搜索地址");
			browserHistory.push('/');
		}
		var url = `https://mainsite-restapi.ele.me/shopping/restaurants?latitude=${loc.lat}&longitude=${loc.lng}&offset=0&limit=20&extras[]=activities&terminal=h5`;
		fetch(url).then(function(res){
			return res.json()
		}).then(function(data){
			
			me.setState({
				list:data
			})
		})
	}
	render() {
		console.log(this.props.params.lat, this.props.params.lng);
		return (
			<div className="rlist">
				<div className="bar bar-header bar-light">
					<h1 className="title">商家列表页</h1>
				</div>
				<SearchBox keyword="kfc" type="jump"></SearchBox>
				<HeaderIcon data={this.state.iconList}></HeaderIcon>
				<List>
					{

						this.state.list.map(function(value,index){
							var link = `/detail/${value.id}` ;
							var imgPath = '';
							if (value.image_path) {
								imgPath = "//fuss10.elemecdn.com/"+value.image_path+"."+value.image_path.substr(32)+"?imageMogr/format/webp/";
							}
							return (
							
									<ItemLi type="rlist" key={index} lat={value.latitude} lng={value.longitude}>
										<Link to={link}>
											<div className='shoplist'>
												<div className='pic'>
													<img src={imgPath}/>
												</div>
												<div className='shoplist_center'>
													<p className='shoplist_row1'><b className='shoplist_name'></b>{value.name}</p>
													<p className='shoplist_row2'><span className='stars'>星星 </span><span className='rating'>{value.rating}</span> <span className='yueshou'>月售{value.recent_order_num}单</span></p>
													<p className='shoplist_row3'><span className='minimum_order_amount'>￥{value.float_minimum_order_amount}元起送 </span><span className='piecewise_agent_fee'>{value.piecewise_agent_fee.tips}</span></p>
												</div>
												<div className='shoplist_right'>
													<p className='right_row1'>保 准</p>
													<p className='right_row2'><span className='ontime'>准时达</span><span className='fee'>蜂鸟专送</span></p>
													<p className='right_row3'><span className='distance'> {value.distance}m </span><em>|</em><span className='order_lead_time'> {value.order_lead_time}分钟</span></p>
												</div>
												
											</div>
									
										</Link>
									</ItemLi>
								)
						})
					}
				</List>
			</div>
		)
	}
}

export default Rlist