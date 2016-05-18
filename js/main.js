$(function() {

    function lineCountWrite() {
        $("aside").html("");
        var lineCount = $("main").height() / 25;
        for (var i = 1; i <= lineCount; i++) {
            $("aside").append("<span>" + i + "</span>")
        }
    }

    lineCountWrite();
    $(".code").append('<span class="arrow"></span>');
    $(".code .arrow").click(function() {
        $(this).parent().toggleClass('close');
        $(this).siblings('.code-selection').toggleClass('collapsed');
        $(".code-content", $(this).parent()).toggle();
        lineCountWrite();
    });

});
