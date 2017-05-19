/*import React from 'react';*/
import {browserHistory} from 'react-router';
class SearchBox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			text:this.props.keyword ||'科华北路'
		}
	}
	componentDidMount() {
		console.log('组件视图渲染完成, 每次路由视图改变时都会执行');
		if(this.props.type === "jump"){
			return;
		}

		this.getData(); //数据的获取操作
	}
	edit(event){
		this.setState({
			text:event.target.value
		})
	}

	getData(){
		var me = this;
		var url = '';

		if(this.props.type === 'address') {
			url = this.props.url + '?keyword='+ this.state.text +'&offset=0&limit=20';

		}else if(this.props.type === 'search') {
			url = this.props.url + `?latitude=${this.props.lat}&longitude=${this.props.lng}&keyword=${this.state.text}&offset=0&search_item_type=2&limit=20&extras[]=activities`
		}else if(this.props.type === 'jump') {
			//进行跳转页面的操作
			var keyword = encodeURI(this.state.text);

			var path =  `/search/${keyword}`;
			browserHistory.push(path); //利用js控制react路由的跳转
			console.log('跳转到我们商家搜索页---change');
			return;
		}
		fetch(url).then(function(res){
			return res.json()
		}).then(function(data){
			console.log(data);
			me.props.onSearch(data)
		})
	}
	submit(event){
		event.preventDefault();
		this.getData();
	}

	render(){
		return (

			<div className="list list-inset has-header has-footer">
			  <form onSubmit={this.submit.bind(this)}>
			  	<label className="item item-input">
			  	  <i className="icon ion-search placeholder-icon"></i>
			  	  <input onChange={this.edit.bind(this)} value={this.state.text} type="text" placeholder={this.props.children}/>
			  	</label>
			  </form>
			</div>
			)
	}
}
export default SearchBox;
