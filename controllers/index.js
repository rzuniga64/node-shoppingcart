'use strict';

var BookModel = require('../models/bookModel');

module.exports = function (router) {

    router.get('/', function (req, res) {

        BookModel.find( {}, function (err, books) {
            if (err) {
                console.log(err);
            }

            books.forEach(function(book) {
                book.truncText = book.truncText(50);
            });

            var model = {
                books: books
            };
            res.render('index', model);
        });
    });
};
