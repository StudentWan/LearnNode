var async = require('async');
var request = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var urlFront = 'http://cnodejs.org';

var hrefs = [];

var irrfetchUrl = function(href, callback) {
    request.get(href)
            .end(function(err, res) {
                var $ = cheerio.load(res.text);
                var titleTmp = $('#content .topic_full_title').text().split(' ');
                var title_data = titleTmp[titleTmp.length - 7].replace(/[\r\n]/g, '');
                var href_data = href;
                var comment1_data = $('#reply1 .markdown-text').children('p').text();
                var content = {
                    title: title_data,
                    href: href_data,
                    comment1: comment1_data
                };
                callback(null, content);
            });
}

request.get('http://cnodejs.org')
        .end(function(err, res) {
            if(err) return console.error(err);

            var $ = cheerio.load(res.text);
            
            $('#topic_list .topic_title').each(function(idx, element) {
                hrefs.push(url.resolve(urlFront, $(element).attr('href')));
            });

            async.mapLimit(hrefs,5, function(href, callback) {
                irrfetchUrl(href, callback);
            }, function(err, contents) {
                console.log('finale:');
                console.log(contents);
            })
        });

