"use strict";

// babel --watch=./src --out-dir=./lib
require("babel-polyfill");
var co = require("co");
var fetch = require('node-fetch');

var headers = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
	'Cache-Control': 'max-age=0',
	'Connection': 'keep-alive',
	'Content-Length': 135,
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': 'SSESSfe1c73d0200a8fe20c015c753a6eedfd=5-bfnOZc9ESXTcdNOMwshPmmlsezhjzf-jGQotzEWe4; _ga=GA1.2.1926474211.1461860628; has_js=1',
	'Host': 'erpwp.lakeheadu.ca',
	'Origin': 'https://erpwp.lakeheadu.ca',
	'Referer': 'https://erpwp.lakeheadu.ca/',
	'Upgrade-Insecure-Requests': 1,
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
};

// var body = JSON.stringify(bd);

var body = 'name=rsheng&pass=SRYoliver19900603%23&form_build_id=form-KdPVDq_bKGv0_clGc_VSC1KH1NWVVyWM-6x6MCXK-HE&form_id=user_login_block&op=Log+in';

var contents = {
	method: 'POST',
	headers: headers,
	body: body
};

var headers2 = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding': 'gzip, deflate, sdch',
	'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
	'Connection': 'keep-alive',
	'Cookie': 'SSESSfe1c73d0200a8fe20c015c753a6eedfd=5-bfnOZc9ESXTcdNOMwshPmmlsezhjzf-jGQotzEWe4; SSESS4beed0807ac118146232cdf8c3a9fcd2=HBIASiTv0_EA0kiDpD3ZkDt8rViodMVzvF4l55hW0mA; _ga=GA1.2.1926474211.1461860628; _gat=1; has_js=1',
	'Host': 'erptc.lakeheadu.ca',
	'Referer': 'https://erpwp.lakeheadu.ca/home/student',
	'Upgrade-Insecure-Requests': 1,
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
};

var body2 = "VAR1=UNIV&RETURN.URL=https%3A%2F%2Ferpwp.lakeheadu.ca%2Fredirect.php%3FRETURN_URL%3Dhttps%3A%2F%2Ferpwp.lakeheadu.ca%2Fhome%2Fstudent&SUBMIT_OPTIONS=";
var contents2 = {
	method: 'POST',
	headers: headers2
};
// body: body2,
co(regeneratorRuntime.mark(function _callee() {
	var res;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return fetch('https://erpwp.lakeheadu.ca/home/default?destination=home/default', contents);

				case 2:
					res = _context.sent;

					// var json = yield res.json();
					if (res.status === 200) {
						// var trascript = yield fetch('https://erptc.lakeheadu.ca/WebAdvisorPO/WebAdvisorPO?TOKENIDX=948199153&SS=1&APP=ST&CONSTITUENCY=WBDF', contents2);
						fetch('https://erpwp.lakeheadu.ca/home/student/?SUBR=XWMPR', contents2).then(function (res) {
							return res.text();
						}).then(function (json) {
							console.log('json', json);
						}).catch(function (err) {
							console.log('err', err);
						});
						// console.log(trascript.text());
					} else {
							console.log("failed");
						}

				case 4:
				case "end":
					return _context.stop();
			}
		}
	}, _callee, this);
}));