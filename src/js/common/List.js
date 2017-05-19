
class List extends React.Component{

		render(){
			return(
				<div className="list has-header">
		     		{this.props.children}
		     	</div>
	     	)
		}
}
export default List;