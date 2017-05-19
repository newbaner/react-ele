/*商家搜索页*/

import React from 'react'; //es6的导入    es6导出 export default App
import SearchBox from '~/src/js/common/SearchBox.js';
import List from '~/src/js/common/List.js';
import ItemLi from '~/src/js/common/ItemLi.js';
import {Link} from 'react-router'
import {Store} from '~/src/js/tool/commonMethod.js';
import FilterNav from './FilterNav.js';
class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}
	search(data) {
		/*var t = [1,2,3]
		var arr = [...t, ...t];
		console.log('arr--->', arr);*/
		// data = {0: {r:[1,2,3]}, 1: {r: [4,5,6]}}
		var t = []
		//list = [1,2,3,4,5,6]; 
		for(var key in data) {
			t.push(...data[key].restaurant_with_foods)
		}
		//t = [[1,2,3], [4,5,6]] // t = [1,2,3,4,5,6]
		console.log(t);
		this.setState({
			list: t
		})
	}
	changeList(filterType) {
		//filterType --> distance order_num  rating
		console.log(filterType);
		var list = this.state.list;
		var t = list.sort(function(a, b){
			// a-b 升序
			if(filterType === "distance"){
				return a.restaurant[filterType] - b.restaurant[filterType] 	
			}else if(filterType === "rating"||filterType==="recent_order_num"){
				return b.restaurant[filterType] -a.restaurant[filterType] 	
			}
			
		})
		this.setState({
			list: t
		})
	}
	render() {
		var search_url = "https://mainsite-restapi.ele.me/shopping/v1/restaurants/search";
		
		let {lat, lng} = Store('curLoc'); //es6的解析赋值
		return (
			<div>
				<div className="bar bar-header bar-light">
					<h1 className="title">商家搜索页</h1>
				</div>
				<SearchBox 
				type="search" 
				url={search_url}
				lat={lat}
				lng={lng}
				onSearch={this.search.bind(this)}
				keyword={this.props.params.keyword}
				></SearchBox>
				<FilterNav onFilter={this.changeList.bind(this)}></FilterNav>
				<List>
					{
						this.state.list.map(function(value, index){
							var item = value.restaurant;
							var link = `/detail/${item.id}`
							return (

								<ItemLi key={index} type="rlist" lat={item.latitude} lng={item.longitude}>
									<div className="desc">
										<p>距离:{item.distance}--销量：{item.recent_order_num}--评分：{item.rating}</p>
										<Link to={link}>{item.name}</Link>
									</div>

								</ItemLi>
							)	 	
						})
					}
				</List>
			</div>
		)
	}
}

export default Search