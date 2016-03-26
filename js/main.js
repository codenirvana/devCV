$(function() {

    var lineCount;

    function lineCountWrite() {
        $("aside").html("");
        lineCount = $("main").height() / 25;
        for (var i = 1; i <= lineCount; i++) {
            $("aside").append("<span>" + i + "</span>")
        }
    }

    $.getJSON("/data.json", function(data) {
            var codeItems = [],
                valueContent = data['meta']['quotes'],
                links = data['meta']['links'],
                newSelection = data['meta']['newSelection'],
                newLine = data['meta']['newLine'];
            $.each(data['code'], function(key, val) {
                var codeItem;
                if (jQuery.inArray(key, newSelection) != -1) {
                    codeItem = "<code class='gutter-new'>";
                } else{
                    codeItem = "<code>";
                }
                codeItem += '<span class="code-selection">' + key + '</span><span class="code-content">';
                $.each(val, function(key, value) {
                    codeItem += '<span class="code-line ';
                    if (jQuery.inArray(key, valueContent) != -1) {
                        codeItem += 'value-content ';
                    }
                    if(jQuery.inArray(key, newLine) != -1){
                        codeItem += 'gutter-new';
                    }
                    codeItem += '"><span class="code-attr">' + key + '</span>';
                    if (links[key]) {
                        codeItem += '<span class="code-value"><a href="' + links[key] + '" target="_blank">' + value + '</a></span>';
                    } else {
                        if (value.indexOf("%") != -1) {
                            codeItem += '<span class="code-value">' + value.slice(0, -1) + '<span class="value-number-percent">%</span></span>';
                        } else {
                            codeItem += '<span class="code-value">' + value + '</span>';
                        }
                    }
                    codeItem += '</span>';
                });
                codeItem += '</span></code>';
                codeItems.push(codeItem);
            });
            codeItems.push('<code class="comment-item"><div class="comment">Thank you for reading</div></code>');
            $('pre').html(codeItems);

        })
        .done(function() {
            lineCountWrite();
            $(window).hover(function(e) {
                var pY = e.pageY;
                for (var c = 1; c <= lineCount; c++) {
                    if (pY > $("aside span:nth-child(" + c + ")").offset().top && pY < $("aside span:nth-child(" + c + ")").offset().top + 25) {
                        $("aside span:nth-child(" + c + ")").css({
                            color: "#55b5db"
                        });
                    }
                }
            }, function() {
                $("aside span").css({
                    color: "#404b53"
                });
            });
            $("code").append('<span class="arrow"></span>');
            $("code .arrow").click(function() {
                $(this).parent().toggleClass('close');
                $(this).siblings('.code-selection').toggleClass('collapsed');
                $(".code-content", $(this).parent()).toggle();
                lineCountWrite();
            });
        })
        .fail(function() {
            alert('Error Loading, Please Refresh!');
        });

});
