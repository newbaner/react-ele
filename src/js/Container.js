import React from 'react';
class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loc:{
				lat:0,
				lng:0
			}
		}
	}
	changeLoc(newloc){
		this.setState({
			loc:newloc
		})
	}
	getChildContext(){
		return {
			lat:this.state.loc.lat,
			lng:this.state.loc.lng
		}
	}
	render(){
		return (
			<div>
				
				{this.props.children}
			</div>
			)
	}
}

Container.childContextTypes = {
	lat:React.PropTypes.number,
	lng:React.PropTypes.number
}

export default Container