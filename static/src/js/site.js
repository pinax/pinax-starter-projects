/* global window */
window.jQuery = window.$ = require('jquery');

const $ = window.$;

require('bootstrap');

require('jquery-chosen/chosen.jquery.js');

$(function () {
    $('#id_participants').chosen();
});
