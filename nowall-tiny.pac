var PROXY_URL = 'SOCKS5 socks5host:10080';
var DIRECT_OR_PROXY = 'DIRECT; ' + PROXY_URL;
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
    'wordpress.com',
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
    'android.com',
    'angularjs.org',
    'chrome.com',
    // twitter
    'img.ly',
    't.co',
    'bit.ly',
    'twitlonger.com',
    'twimg.com',
    'twitpic.com',
    'twitter.com',
    'dw.de',
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
    if(host.indexOf('google') >= 0) {
        return PROXY_URL;
    }
    if(host.indexOf('thepiratebay') >= 0) {
        return PROXY_URL;
    }
    var i = url.indexOf('?');
    if (i != -1) url = url.substring(0, i);
    if (blocked_urls[url]) return PROXY_URL;
    return DIRECT_OR_PROXY;
}

if(typeof exports != 'undefined') {
    // test pac
    console.log(FindProxyForURL('http://www.google.com.jp/1234', 'www.google.com.jp'));
}
