var fetch = require('node-fetch');

var headers = {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate, sdch',
        'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
        'Connection':'keep-alive',
        'Cookie':'CNZZDATA1257873453=1966153763-1462767641-http%253A%252F%252Fwww.baidu.com%252F%7C1462767641; Hm_lvt_080dabacb001ad3dc8b9b9049b36d43b=1462771901; Hm_lpvt_080dabacb001ad3dc8b9b9049b36d43b=1462771901; vjuids=3abecf818.15493ffe33c.0.f77542210a96c; vjlast=1462771901.1462771901.30; f_city=%E6%B8%A5%E5%A4%AA%E5%8D%8E%7C404010100%7C; zs=404010100%7C%7C%7Cyd-uv',
        'Host':'www.weather.com.cn',
        'Referer':'http://www.weather.com.cn/static/html/weather.shtml',
        'Upgrade-Insecure-Requests':'1',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
  }

var contents = {
  method: 'GET', 
  headers: headers,
};

fetch("http://www.weather.com.cn/weather1d/101020100.shtml", contents)
	.then(function (res){
		return res.json();
	})
	.then(function (json){
    // json = json.reverse()
		console.log('json',json);
	})
	.catch(function(err){
    	console.log('err',err);
  	})	

