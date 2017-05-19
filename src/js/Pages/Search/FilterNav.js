
export default class FilterNav extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			status: ''
		}
	}
	change(event) {
		var me = this;
		this.setState({
			status: event.target.value
		}, function(){
			me.props.onFilter(this.state.status)	 	
		})
	}
	render() {
		return (
			<div className="nav-item has-header has-footer" style={{position:"relative"}} >
				<label className="item item-input item-select">
				   <span className="input-label">
				     排序
				   </span>
				   <select onChange={this.change.bind(this)} value={this.state.status}>
				     <option value="">请选择</option>
				     <option value="distance">距离排序</option>
				     <option value="recent_order_num">销量排序</option>
				     <option value="rating">评分排序</option>
				   </select>
				 </label>
			</div>

		)
	}
}