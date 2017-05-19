/*import React from 'react'; //es6的导入    es6导出 export default App*/
import SearchBox from '~/src/js/common/SearchBox.js';
import List from '~/src/js/common/List.js';
import ItemLi from '~/src/js/common/ItemLi.js';
import {Link} from 'react-router';
class Address extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list:[]
		}
	}
	changeList(data){
		this.setState({
			list:data
		})
	}
	render(){
		var url = 'https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby';
		var me = this;
		return (
			<div >
				<div className="bar bar-header bar-light">
					<h1 className="title has-header has-footer">地址搜索页</h1>
					
				</div>
				<SearchBox type='address' url={url} onSearch = {this.changeList.bind(this)}></SearchBox>
				<List>
					{
						this.state.list.map(function(value,index){
							var link = `/rlist/${value.geohash}`;
							return (
							  <ItemLi key={index} lat={value.latitude} lng={value.longitude}>

									<Link to={link}> <p>{value.name}</p>{value.address}</Link>
									
								</ItemLi>

								)
						})
					}
				</List>
			</div>
			)
	}
}
export default Address;
