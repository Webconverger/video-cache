var videos = ["a.webm", "b.webm", "c.webm", "d.webm"];
function playArray(index, ele, array, listener) {
	if (listener) {
		ele.removeEventListener(listener);
	}
	ele.src = array[index];
	// Is this a memory leak?
	// ele.load();
	ele.play();
	index++;
	if (index >= array.length) {
		index = 0;
	}
	listener = ele.addEventListener('ended', function() {
		playArray(index, ele, array, listener);
	},
	false);
}
playArray(0, document.getElementById("myVid"), videos);

var appCache = window.applicationCache;

if (typeof appCache != 'undefined') {
	// Cached event is fired when initially caching
	appCache.addEventListener('cached', function() {
		document.body.style.background = "green";
	},
	false);
	// No update is fired when an existing Appcache is found to have no update
	appCache.addEventListener('noupdate', function() {
		if (appCache.status == 1) document.body.style.background = "green";
	},
	false);
}

window.applicationCache.addEventListener('updateready', function(e) {
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		// Browser downloaded a new app cache.
		// Swap it in and reload the page to get the new hotness.
		window.applicationCache.swapCache();
		window.location.reload();
	}
});

function handleCacheEvent(e) {
	console.log(e);
	console.log(appCache.status);
}

function handleCacheError(e) {
	alert('Error: Cache failed to update!');
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
appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener('progress', handleCacheEvent, false);

// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener('updateready', handleCacheEvent, false);

