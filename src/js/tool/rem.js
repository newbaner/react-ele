export function calSize(){
	var clientWidth = window.innerWidth || document.documentElement.clientWidth;
	var Htmlsize = clientWidth/3.75;
	document.documentElement.style.fontSize = Htmlsize + 'px';
	// window.addEventListener('resize', calSize);
}