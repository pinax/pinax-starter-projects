window.jQuery = window.$ = require("jquery");

require("eldarion-ajax");
require("bootstrap");

require("../less/site.less");

require("imports?define=>false!select2");
require("imports?define=>false!blueimp-file-upload");

var fileupload = function () {
    $('.fileupload').each(function () {
        var $that = $(this),
            $dropzone = $that.closest(".dropzone"),
            $textarea = $dropzone.find("textarea"),
            $progress = $dropzone.find(".progress");
        $that.fileupload({
            dropZone: $dropzone,
            dataType: "json",
            singleFileUploads: false,
            done: function (e, data) {
                var $textarea = $dropzone.find("textarea"),
                    content = $textarea.val(),
                    start = $textarea.prop("selectionStart"),
                    end = $textarea.prop("selectionEnd"),
                    markdown = "\n";

                if (start === end && start === 0) {
                    start = end = content.length;
                }
                for (var i=0; i<data.result.uploads.length; i++) {
                    var f = data.result.uploads[i];
                    markdown += "{{" + f.download_url + "|" + f.filename + "}}\n\n";
                }

                $textarea.val(content.substring(0, start) + markdown + content.substring(end, content.length));
                $progress.addClass("hide");
            },
            fail: function (e, data) {
                $dropzone.prepend("<div class='alert alert-danger'>Upload attempt failed. Try again.</div>");
                $progress.addClass("hide");
            },
            start: function (e, data) {
                $progress.removeClass("hide");
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $progress.find(".progress-bar").css("width", progress + "%");
            }
        });
    });
}

var loadSelect2 = function (e) {
    $("[data-autocomplete-url]").each(function(i, e) {
        var $el = $(e);
        $el.select2({
            ajax: {
                url: $el.data("autocomplete-url"),
                dataType: "json",
                type: "GET",
                data: function (term, page) {
                    return {query: term};
                },
                results: function (data, page) {
                    return {results: data};
                }
            },
            id: function (obj) {
               return obj.email;
            },
            formatSelection: function (obj) {
                if (obj.pk < 0) {
                    return obj.email;
                }
                return obj.email;
            },
            formatResult: function (obj) {
                if (obj.pk < 0) {
                    return "<div class='result new'>" + obj.email + "</div>";
                }
                return "<div class='result clearfix'>" + obj.name + "&lt;" + obj.email + "&gt;</div>";
            },
            minimumInputLength: 1,
            width: "element",
            createSearchChoice: function (term, data) {
                if ($(data).filter(function() {return this.email === term;}).length===0) {
                    return { pk:-1, email: term };
                }
            }
        });
    })
};
var loadImage = function(evt) {
    var input = evt.currentTarget;
    if (input.files && input.files[0]) {
        // var reader = new FileReader();
        // reader.onload = function(e) {
        //     $("#preview")
        //         .attr("src", "")
        //         .attr("style", "")
        //         .hide();
        //     $("#preview")
        //         .attr("src", e.target.result)
        //         .css({width: Math.round})
        //         .fadeIn();
        // }
        // reader.readAsDataURL(input.files[0]);
        $(".selected-filename").text(input.files[0].name);
    }
};

$(function() {
    loadSelect2();
    $(document).on("eldarion-ajax:complete", function (evt, el, xhr, status) {
        if ($(el).hasClass("invite-form")) {
            loadSelect2();
        }
    });
    $(document).on("click", ".file-browse", function (e) {
        e.preventDefault();
        $(".fileupload").click();
    });
    $(document).bind("drop dragover", function (e) {
        e.preventDefault();
    });
    $(document).bind("dragover", function (e) {
        var dropZone = $('.dropzone'),
            foundDropzone,
            timeout = window.dropZoneTimeout;
        if (!timeout)
        {
            dropZone.addClass('in');
        }
        else
        {
            clearTimeout(timeout);
        }
        var found = false,
        node = e.target;

        do{

            if ($(node).hasClass('dropzone'))
            {
                found = true;
                foundDropzone = $(node);
                break;
            }

            node = node.parentNode;

        }while (node != null);

        dropZone.removeClass('in hover');

        if (found)
        {
            foundDropzone.addClass('hover');
            $("body").removeClass("hovering");
        } else {
            $("body").addClass("hovering");
        }

        window.dropZoneTimeout = setTimeout(function ()
        {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
            $("body").removeClass("hovering");
        }, 100);
    });
    fileupload();
    $("#id_avatar").change(loadImage);
});
