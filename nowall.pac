var PROXY_URL = 'PROXY 127.0.0.1:8087';
var white_hosts = {};
var blocked_urls = {};
var blocked_hosts = {};

// 白名单, 将常访问的网站置于此处效率更高
;[
    'weibo.com',
    'baidu.com',
].forEach(function(host) {
    white_hosts[host] = 1;    
});

// GFW屏蔽的URL
;[].forEach(function(url) {
   blocked_urls[url] = 1; 
});

// GFW屏蔽的网站，只需要写根域名即可
;[
    // slow site
    'testflighapp.com',
    // unstable site
    'ecosia.org',
	// blocked site
    'blogspot.com',
    'facebook.com',
    'facebook.net',
    'fbcdn.net',
    'feedburner.com',
    //google
    'gmail.com',
    'goo.gl',
    'google.com',
    'google.cn',
    'google.com.hk',
    'googleusercontent.com',
    'googleapis.com',
    'gstatic.com',
    'docs.google.com',
    'appspot.com',
    // twitter
    'img.ly',
    't.co',
    'twitlonger.com',
    'twimg.com',
    'twitpic.com',
    'twitter.com',
    // wiki
    'wikipedia.org',
    'worldjournal.com',
    // youtube
    'youtube.com',
    'ytimg.com',
    // slideshare
    'slideshare.net',
    'linkedin.com',
    'scorecardresearch.com',
    // trello.com
    'trellocdn.com',
    // stackoverflow
    'sstatic.net',
    // wikia.com
    'wikia.com',
    'digitalocean.com',
    // github cdn
    'fastly.net',
    'ghconduit.com',
    // x
    'sex.com',
    'redtube.com',
    'xvideos.com'
].forEach(function(host) {
    blocked_hosts[host] = 1;
})

function FindProxyForURL(url, host) {
    if(blocked_hosts[host]) {
        return PROXY_URL;
    }
    var parts = host.split('.');
    var host2 = parts.slice(-2).join('.');
    if(blocked_hosts[host2]) {
        return PROXY_URL;
    }
    if(parts.length > 3) {
        var host3 = parts.slice(-3).join('.');
        if(blocked_hosts[host3]) {
            return PROXY_URL;
        }
    }
    var i = url.indexOf('?');
    if (i != -1) url = url.substring(0, i);
    if (blocked_urls[url]) return PROXY_URL;
    return 'DIRECT';
}
