'use strict';

/* global window */
window.jQuery = window.$ = require('jquery');

var $ = window.$;

require('bootstrap');
require('jquery-chosen/chosen.jquery.js');

$(function () {
    $('#id_participants').chosen();
});