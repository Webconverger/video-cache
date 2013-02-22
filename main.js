var video = document.createElement('video');
video.src = 'a.webm';
video.controls = true;
document.body.appendChild(video);
video.play();

video.ontimeupdate = function(e) {
	console.log(video.currentTime);
}
