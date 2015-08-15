window.jQuery = window.$ = require("jquery");

require("bootstrap");

require("../less/site.less");

require("jquery-chosen/chosen.jquery.js");

$(function () {
    $("#id_participants").chosen();
});
