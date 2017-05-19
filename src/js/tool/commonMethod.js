var callbackLists = {}

export function Store(nameSpace,data){
	if(data){
		localStorage.setItem(nameSpace,JSON.stringify(data))
		return;
	}
	return JSON.parse(localStorage.getItem(nameSpace)) ||null;
}
export function EventEmmit(){
	
}
EventEmmit.prototype.register=function(eventName,callback){
	callbackLists[eventName] = callback
}

EventEmmit.prototype.dispatch=function(eventName,data){
	//根据具体的事件名称进行事件分发
	callbackLists[eventName](data);
	
}
