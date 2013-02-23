# Aiding DOOH video distribution using the Web

Video distribution by DOOH vendors is typically done by:

1. "Sneakernet", a weekly round of USB key updates sent out to screens
* IPTV which can fail if there is a loss of network

There is a need for efficient fault tolerant online distribution.

# Using Web-based digital signage can help mitigate failure and aid distribution

The Web has benefits of caching facilities, video playback, all based on [open
standards](http://whatwg.org/html) and therefore avoid proprietary lock in.

Once a manifest of videos (a schedule) is cached, a network failure should go unnoticed.

Furthermore if power loss occurs and the [Neon](http://neon.webconverger.com)
display is rebooted, the
[window.applicationCache](www.whatwg.org/specs/web-apps/current-work/multipage/offline.html)
should persist. The application cache should also facilitate faster load times.
