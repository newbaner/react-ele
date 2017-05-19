

import ReactSwipe from 'react-swipe';

import classNames from 'classnames'

export default class HeaderIcon extends React.Component{
	constructor(props){
		super(props);
		this.state={
			index:0
		}
	}
	slideChange(index){
		console.log("我滑动了",index);
		this.setState({
			index:index%2
		})
	}
	render(){
		var me = this ;
		var list = this.props.data;
		var new_list = [];
		var len = Math.ceil(list.length/8);
		for(var i = 0;i<len;i++){
			var arr =list.slice(0+(i*8),8+(i*8));
			new_list.push(arr);
		}
		console.log(new_list.length)
		return (

			<div  className='has-header has-footer' style={{position:'relative'}}>
				<div classNames="upwrapper " >
					<ReactSwipe key={new_list.length} className="carousel" swipeOption={{

						continuous:true,
						callback:this.slideChange.bind(this)
					}}>
					{
	               	   new_list.map(function(value, index){
	               	   	   return (
		               	   	   	<div key={index} className="item-pane">
		               	   	   		PANE {index}
		               	   	   	</div>
	               	   	   )
	               	   })
	               }
					</ReactSwipe>
					 <ul className="position">
	            	{
	            		new_list.map(function(value, index){
		            		return <li key={index} className={classNames({dot: true, cur: me.state.index === index})}></li>	 	
		            	})
	            	}
	            </ul>
				</div>

			</div>
			)
	}
}