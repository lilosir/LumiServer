'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
	// 'authority':'weather.com',
	// 'method':'GET',
	// 'path':'/weather/today/l/CAXX0498:1:CA',
	// 'scheme':'https',
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'accept-encoding': 'gzip, deflate, sdch',
	'accept-language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
	'cookie': 'screenSize=desktopSized; __gads=ID=d0f856e68042b568:T=1462770054:S=ALNI_MbqEihyKUJSJZxpKCJyNxJfwuAvCA; userid=14F26BAC-C13A-8F76-A466-CB8540467291; TrackJS=8ec5e5bd-660d-4d45-8564-4571bf81a8e5; bm_monthly_unique=true; SSLB=0; screenSize=desktopSized; cto_weather=; OX_plg=swf|shk|pm; _tly=s=1464120803932&r=https%3A//weather.com/; bm_daily_unique=true; bm_sample_frequency=1; has_js=1; fv=3; cto_weather=; bm_last_load_status=NOT_BLOCKING; OX_sd=3; dsx="LkNbY2%2F4A9QauBHX0pnxBlcp9ZAT3F6azzOZgTlqmO5SdxsuFyv8EMQAgwg%2F0MWFMnYxa6I6CF%2BcAKPxiPNyvMrKMrdAiBzkUjw2m3RCJ8hLdjMNTUS%2BIkZMUmkqxqiPX6aFIwYospW3lxt9h4rdWsXiX9f5j2sM2xy9Q1ONuUrAY86VMUHoIt6%2BUHS0O1tW8C%2F5gdVaqckGDyrxAYa%2BRMsDpLlOxbn3sQk8AwqNcIQQa9Q%2B0c7WMjZ1qm9FXifIW41WCWXL963AjWnb1GfAkBJD48KXc7li07%2FtSh3yhzk%3D"; utag_main=v_id:015493e39eb0001ed5c13d929c5d0506d001406500bd0$_sn:3$_ss:0$_st:1464122677159$_pn:3%3Bexp-session$ses_id:1464120785136%3Bexp-session; s_vi=[CS]v1|2B980CC285011DF2-4000013220000247[CE]; fromStr=today-forecast_hdr_recentsearchresolved; s_pers=%20s_vnum%3D1620450054147%2526vn%253D3%7C1620450054147%3B%20s_nr%3D1464120877124-Repeat%7C1466712877124%3B%20s_invisit%3Dtrue%7C1464122677130%3B%20s_nr2%3D1464120877133-Repeat%7C1621800877133%3B%20s_fid%3D6DB0AAC434555011-0A1A65FCBBF91F46%7C1527193237350%3B; s_sess=%20s_cc%3Dtrue%3B%20s_sq%3D%3B; RT="sl=3&ss=1464120784016&tt=22438&obo=0&sh=1464120880419%3D3%3A0%3A22438%2C1464120811000%3D2%3A0%3A15398%2C1464120792373%3D1%3A0%3A8354&dm=weather.com&si=dee214a5-641a-4b5a-a62d-9e6bb590e295&bcn=%2F%2F36f1f08e.mpstat.us%2F&ld=1464120880419&r=https%3A%2F%2Fweather.com%2Fweather%2Ftoday%2Fl%2FCAXX0498%3A1%3ACA&ul=1464121237391"',
	'upgrade-insecure-requests': 1,
	'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'

	// 'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	// 'accept-encoding':'gzip, deflate, sdch',
	// 'accept-language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
	// 'cookie':'B=06gtm4lbi31vk&b=3&s=bl',
	// 'referer':'https://ca.news.yahoo.com/weather/canada/thunder-bay/thunder-bay-3109',
	// 'upgrade-insecure-requests':1,
	// 'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
};

var contents = {
	method: 'GET',
	headers: headers
};

fetch('https://weather.com/weather/today/l/CAXX0498:1:CA', contents).then(function (res) {
	return res.json();
}).then(function (json) {
	// json = json.reverse()
	console.log('json', json.d.Calls[0]);
}).catch(function (err) {
	console.log('err', err);
});