//项目核心入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Container from './Container.js';
import Address from './Pages/Address/index.js';
import Rlist from './Pages/Rlist';
import Detail from './Pages/Detail/index.js';
import Search from './Pages/Search/index.js';

import 'whatwg-fetch'

import '~/src/css/index.css';
ReactDOM.render(
	<Router history={browserHistory}>
	    {/*配置组件与路径的依依对应关系*/}
		<Route path="/" component={Container}>
			<IndexRoute component={Address}></IndexRoute>
			<Route path="/rlist/:geohash" component={Rlist}></Route>
			<Route path="/detail/:shopId" component={Detail}></Route>
			<Route path="/search/:keyword" component={Search}></Route>
		</Route>
	</Router>

	, document.getElementById('ele'))