var videos = [
    "a.webm",
    "b.webm",
    "c.webm",
    "d.webm"
];
function playArray(index,ele,array,listener){
	if (listener) { ele.removeEventListener(listener); }
    ele.src = array[index];
    ele.load();
    ele.play();
    index++;
    if(index>=array.length){
        index=0;
    }
    listener = ele.addEventListener('ended',function(){
        playArray(index,ele,array,listener);
    },false);
}
playArray(0,document.getElementById("myVid"),videos);
