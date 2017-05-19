import React from 'react'; //es6的导入    es6导出 export default App
import {Store} from '~/src/js/tool/commonMethod.js';

class ItemLi extends React.Component {
	updateLoc(){
		console.log('点击，缓存当前的经纬度')
		var lat  = this.props.lat,
			lng = this.props.lng;
			if(this.props.type === 'rlist'){
				Store('curDetail',{
					lat:lat,
					lng:lng
				})
			}else {
				Store("curLoc",{
					lat:lat,
					lng:lng
				})
			}
	}
	render(){
		return(
				<li onClick={this.updateLoc.bind(this)} className="item">{this.props.children}</li>

				
			)
	}
}
export default ItemLi