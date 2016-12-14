var express = require('express');
var request = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.use(function (req, res) {
    request
        .get('https://cnodejs.org')
        .end(function (err, data) {
            var $ = cheerio.load(data.text);
            var result = [];
            $('#topic_list .cell').each(function (idx, element) {
                // console.log($(element).children('.user_avatar').attr('href').split('/').pop());
                result.push({
                    title: $(element).children('.topic_title_wrapper').children('.topic_title').attr('title'),
                    href: "http://cnodejs.org" + $(element).children('.topic_title').children('.topic_title').attr('href'),
                    author: $(element).children('.user_avatar').attr('href').split('/').pop()
                });
            });
            res.send(result);
        });
});

app.listen(3000, function () {
    console.log("Server listening.");
})