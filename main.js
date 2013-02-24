var videos = ["a.webm", "b.webm", "c.webm", "d.webm"];

function downloadUrl(url, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			callback(request.responseText, request.status);
		}
	};
	request.open('GET', url, true);
	request.send(null);
}

var n = 0;
var video = document.createElement('video');
document.body.appendChild(video);
video.src = videos[n];
video.addEventListener('ended', function() {
	console.log("Played " + video.src);
	n++;
	this.src = videos[n];
	this.play();
	if (n == 3) n = - 1;
});
video.play();

if (!window.applicationCache) {
	setTimeout(function() {
		_gaq.push(['_trackEvent', 'Appcache', 'Version', 'n/a']);
	},
	1000);
	document.body.style.background = "red";
}

var appCache = window.applicationCache;

// "Naturally" reload when an update is available
window.applicationCache.addEventListener('updateready', function() {
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		console.log("Reloading...");
		window.applicationCache.swapCache();
		location.reload();
	}
},
false);

setInterval(function() {
	try { // There's nothing to update for first-time load, browser freaks out :/
		window.applicationCache.update();
	} catch(e) {
		console.log("Failed to update...");
	}
},
1000 * 60 * 1); // Every minute
// Use GA to track the update rate of this manifest appcache thing
// and see how fast users are updated to the latest cache/version
if (typeof _gaq != 'undefined') window.addEventListener('load', function() {
	setTimeout(function() {
		var r = new XMLHttpRequest();
		r.open('GET', 'manifest.appcache', true);
		r.onload = function() {
			var text = this.responseText;
			if (!text) return;
			var version = (text.match(/#\s\d[^\n\r]+/) || [])[0];
			if (version) _gaq.push(['_trackEvent', 'Appcache', 'Version', version.replace(/^#\s/, '')]);
		};
		r.send();
	},
	1000);
},
false);

if (appCache.status === 0) document.body.style.background = "red";
// Cached event is fired when initially caching
appCache.addEventListener('cached', function() {
	document.body.style.background = "green";
},
false);

// No update is fired when an existing Appcache is found to have no update
appCache.addEventListener('noupdate', function(e) {
	console.log("noupdate");
	console.log(e);
	console.log(appCache.status);
	if (appCache.status == 1) {
		document.body.style.background = "green";
	}
	else {
		document.body.style.background = "red";
	}
},
false);

function handleCacheEvent(e) {
	console.log(e);
	console.log(appCache.status);
}
function handleCacheError(e) {
	console.log('Error: Cache failed to update!');
}

// Fired after the first cache of the manifest.
appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
appCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
// appCache.addEventListener('noupdate', handleCacheEvent, false);
// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);

