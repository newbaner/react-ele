export default class FoodList extends React.Component{
	constructor(props){
		super(props);
	}
	shouldComponentUpdata(){
		console.log('保证组件每次都会更新');
		return true;
	}
	render() {
		return (
			<div className="food-item" ref = "item">
				<div className="food-title">
					{this.props.name}
				</div>
				{
					this.props.children
				}
				
			</div>		
		)
	}
	componentDidUpdate(){
		var height = this.refs.item.offsetHeight;
		if(this.context.heightList.length>0){
			height += this.context.heightList[this.context.heightList.length - 1];
		}
		console.log(height);
		this.context.heightList.push(height);
		console.log(this.context.heightList);

	}
}
FoodList.contextTypes = {

	// ???????????????
	heightList:React.PropTypes.array
}