'use strict';

var express = require('express');
var kraken = require('kraken-js');
var mongoose = require('mongoose');
var dbconfig = require('./config/dbconfig');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        mongoose.connect(dbconfig.getDbConnectionString()); // Connect to MongoDB using mongoose.
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection Error'));
        db.once('open', function(){ console.log('DB Connection Open...'); });
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
