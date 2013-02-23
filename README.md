# Aiding DOOH video distribution using the Web

Video distribution by DOOH vendors is typically done by:

1. "Sneakernet", a weekly round of USB key updates sent out to screens
* IPTV which can fail if there is a loss of network

# Using the Web can help mitigate failure and aid distribution

Once a manifest of videos is cached, a network failure should go unnoticed.

Furthermore if power loss occurs and the [Neon](http://neon.webconverger.com/)
display is rebooted, the
[window.applicationCache](www.whatwg.org/specs/web-apps/current-work/multipage/offline.html)
should persist. Appcache should also facilitate faster load times.
