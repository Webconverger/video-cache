manifest.appcache: main.js
	@# Stamp appcache with a new timestamp
	@printf '%s\n' '2c' "# $$(date)" . w | ex -s manifest.appcache
