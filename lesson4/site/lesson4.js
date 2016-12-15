var eventproxy = require('eventproxy');
var request = require('superagent');
var cheerio = require('cheerio');
var url = require('url');//Node.Js标准库

var cnodeUrl = 'http://cnodejs.org/';

request.get('http://cnodejs.org/')
    .end(function (err, res) {
        if (err) return console.error(err);

        var $ = cheerio.load(res.text);
        var urlData = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var href = url.resolve(cnodeUrl, $(element).attr('href'));
            urlData.push(href);
        });

        var ep = new eventproxy();
        ep.after('got_data', 3, function (list) {
            console.log(list);
        });

        for (var i = 0; i < 3; i++) {
            var dataTmpStore;
            request.get(urlData[i])
                .end(function (err, res) {
                    if (err) return console.error(err);

                    var $ = cheerio.load(res.text);

                    var title_array = $('.topic_full_title').text().split(' ');
                    var length = title_array.length;
                    var title_data = title_array[length - 7].replace(/[\r\n]/g, '');//去掉换行符等

                    var href_data = urlData[i];

                    var comment1_data = $('#reply1 .markdown-text').children('p').text();

                    var hrefToUser = url.resolve(cnodeUrl, $('#reply1 .user_avatar').attr('href'));

                    var ep1 = new eventproxy();

                    ep1.all('got_user', function (data) { //这里其实可以不用eventproxy,因为只是一个链接，不需要处理并发
                        dataTmpStore = {
                            title: title_data,
                            href: href_data,
                            comment1: comment1_data,
                            author1: data.author1_data,
                            score1: data.score1_data
                        };
                        ep.emit('got_data', dataTmpStore);
                    });

                    request.get(hrefToUser)
                        .end(function (err, res) {

                            var $ = cheerio.load(res.text);
                            var author1 = $('#content .userinfo').children('a').text();
                            var score1 = $('#content .user_profile .unstyled').children('span').text();

                            var data = {
                                author1_data: author1,
                                score1_data: score1
                            };

                            ep1.emit('got_user', data);
                        });
                });
        }
    });