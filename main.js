var videos = ["a.webm", "b.webm", "c.webm", "d.webm"];

// Play videos one after another in a loop
var n = 0;
var video = document.createElement('video');
document.body.appendChild(video);
video.src = videos[n];
video.addEventListener('ended', function() {
	console.log("Played " + video.src);
	if (n >= videos.length) n = 0;
	this.src = videos[n];
	this.play();
	n++;
});
video.play();

// "Naturally" reload when an update is available
window.applicationCache.addEventListener('updateready', function() {
	//if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		console.log("updateready Reloading...");
		try { window.applicationCache.swapCache(); } catch(e) {} // This might fail on FF
		location.reload();
	//}
},
false);

setInterval(function() {
	try { // There's nothing to update for first-time load, browser freaks out :/
		window.applicationCache.update();
	} catch(e) {
		console.log("Failed to update...");
	}
},
1000 * 60 * 1); // Every minute check for an update

//if (applicationCache.status === 0) document.body.style.background = "red"; // Firefox doesn't do this correctly

// Cached event is fired when initially caching or after failed previous caching
applicationCache.addEventListener('cached', function() {
	// Firefox has incorrect values of applicationCache.status, so we are are not checking
	document.body.style.background = "green";

	console.log("cached Reloading...");
	try { window.applicationCache.swapCache(); } catch(e) {} // This might fail on FF
	location.reload();

},
false);

// No update is fired when an existing applicationCache is found to have no update
applicationCache.addEventListener('noupdate', function(e) {
	console.log("noupdate");
	console.log(e);
	console.log(applicationCache.status);
	document.body.style.background = "green";
	//if (applicationCache.status == 1) {
	//}
	// Firefox has incorrect values of applicationCache.status
	//else { // On first load applicationCache.status===applicationCache.UNCACHED, so cached event should take precendence
	//	document.body.style.background = "red";
	//}
},
false);

// DEBUG

function handleCacheEvent(e) {
	console.log(e);
	console.log(applicationCache.status);
}
function handleCacheError(e) {
	console.log('Error: Cache failed to update!');
}

// Fired after the first cache of the manifest.
applicationCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
applicationCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
applicationCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
applicationCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
// applicationCache.addEventListener('noupdate', handleCacheEvent, false);
// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
applicationCache.addEventListener('obsolete', handleCacheEvent, false);

