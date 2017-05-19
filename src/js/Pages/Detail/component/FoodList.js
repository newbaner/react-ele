import SingleCart from './SingleCart.js'
import FoodItem from './FoodItem.js'
export default class FoodList extends React.Component{
	render(){
		return (

				<div className="inner-wrapper">
					{
						this.props.data.map(function(value,index){
							return (

								<FoodItem name={value.name} key={index}>
									{
										value.foods.map(function(val,innerIndex){
											if(!val.num){
												val.num =0;
											}
											return (

												<SingleCart type="normal" item ={val} key={innerIndex}></SingleCart>
												)
										})
									}
								</FoodItem>
								)
						})

					}
					{/*<FoodItem>
						<SingleCart></SingleCart>
						<SingleCart></SingleCart>
						<SingleCart></SingleCart>
						<SingleCart></SingleCart>
						<SingleCart></SingleCart>
						<SingleCart></SingleCart>
						<SingleCart></SingleCart>
					</FoodItem>*/}
				</div>
			)
	}
}