 export function Changepic(res){
 	var str = '';
	for(var i = 0;i<res.length;i++){
	  		var picPath = '//fuss10.elemecdn.com/';
							 
			 picPath += res[i].image_path.substring(0,1)+"/"+res[i].image_path.substring(1,3)+"/"+res[i].image_path.substring(3);

			 if(res[i].image_path.indexOf("jpeg") !== -1){
			 	 picPath+= '.jpeg';
			 }else{
			 	picPath += '.png';
			 }
			picPath += "?imageMogr/format/webp/";
			str += "<div class='shoplist'><a href= '#detail-"+ res[i].id +"-"+ res[i].latitude +"-"+ res[i].longitude +"'><div class='pic'><img src='"+picPath+"'></div><div class='shoplist_center'><p class='shoplist_row1'><b class='shoplist_name'></b>"+res[i].name+"</p><p class='shoplist_row2'><span class='stars'>星星 </span><span class='rating'>"+res[i].rating+" </span class='yueshou'> 月售"+res[i].recent_order_num+"单 <span></span></p><p class='shoplist_row3><span class='minimum_order_amount'>￥"+res[i].float_minimum_order_amount+"元起送 </span><span class='piecewise_agent_fee'>"+res[i].piecewise_agent_fee.tips+"</span></p></div><div class='shoplist_right'><p class='right_row1'>保 准</p><p class='right_row2'><span class='ontime'>准时达</span><span class='fee'>蜂鸟专送</span></p><p class='right_row3'><span class='distance'> "+res[i].distance+"m </span><em>|</em><span class='order_lead_time'> "+res[i].order_lead_time+"分钟</span></p></div></a></div>";

	}
	
}