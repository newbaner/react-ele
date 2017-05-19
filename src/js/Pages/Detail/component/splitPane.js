/*import React from 'react'*/
import ReactIScroll from 'react-iscroll';
import {EventEmmit} from '$tool/commonMethod.js';

var iScroll = require('iscroll/build/iscroll-probe.js');

var model = new EventEmmit();

export default class SplitPane extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			y : 0
		}
	}
	scrollRight(height){
		height = 0-height;
		/*console.log('此时scrollRight该方法被执行了',height);*/
		this.refs.rightPaneScroll.withIScroll(function(iScroll){
			iScroll.scrollTo(0,height,1000);
		})
	}
	onRefresh(iScrollInstance){
		var yScroll = iScrollInstance.y;
		console.log("vertical position:"+ yScroll)

		if(this.state.y != yScroll){
			this.setState({y:yScroll})
		}
	}
	onScroll(iScrollInstance){
		/*console.log('我正在滚动',iScrollInstance.y);*/
		var offset = Math.abs(iScrollInstance.y);
		for(var i = 0 ;i<this.context.heightList.length;i++){
			model.dispatch('changeCurIndex',i);
			break;
		}
	}
	render(){
		var options = {
	        mouseWheel: true,
	        scrollbars: true,
	        bounce: false,
	        probeType:2
	    }
		return (
			<div className="food-wrapper">
				<div className="left-pane">
					<ReactIScroll iScroll={iScroll}
                      options={options}>
						{
							this.props.left && React.cloneElement(this.props.left,{
								onJump:this.scrollRight.bind(this)
							})
						}
					 </ReactIScroll>
				</div>
				<div className="right-pane">
					<ReactIScroll onScroll={this.onScroll.bind(this)} ref = "rightPaneScroll" iScroll={iScroll}
                      options={options}>
						{
							this.props.right
						}
					 </ReactIScroll>
				</div>
			</div>

		)
	}
}

SplitPane.contextTypes = {
	heightList:React.PropTypes.array
}