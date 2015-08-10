window.jQuery = window.$ = require("jquery");

require("bootstrap");

require("../less/site.less");

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
                    markdown += "{" + "{" + f.download_url + "|" + f.filename + "}}\n\n";
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

$(function() {
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
});
