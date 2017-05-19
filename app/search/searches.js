(function ($) {
    // when document is ready for manipulation
    $(document).ready(function () {

        // our search box with id of search
        $('#search').each(function () {
            $(this).attr('title', $(this).val())
                .focus(function () {
                    console.log($(this).val());
                    if ($(this).val() == $(this).attr('title')) {
                        $(this).val('');

                    }
                }).blur(function () {
                     console.log($(this).val());
                    if ($(this).val() == '' || $(this).val() == ' ') {
                        $(this).val($(this).attr('title'));
                    }
                });
        });

        $('input#search').result(function (event, data, formatted) {
            $('#result').html(!data ? "No match!" : "Selected: " + formatted);
        }).blur(function () {});

        $(function () {
            // returns the image in the autocomplete results and also a link pointing to the results
            // and also the results title. Note we must pass (permalink, image, and title) in our json results	
            function format(mail) {
                console.log(mail);
                link = 'http://localhost:3000/products/show/'+mail._id+'/'+mail.Title;
                return "<a href='" + link + "'><img src='" + mail.image + "' /><span class='title'>" + mail.Title + "</span></a>";
            }

            // returns the url of the result		
            function link(mail) {
                console.log(mail);
                link = 'http://localhost:3000/products/show/'+mail._id+'/'+mail.Title;
                return link
            }

            // returns the title of the results
            function title(mail) {
                //console.log(mail);
                return mail.Title
            }

            // Invoke our autocomplete plugin and give it a url where it should fetch for results. In our case is /search
            // we defined this custom action in our roots.rb file. Change this to suite yours		
            $("#search").autocomplete('http://localhost:3000/api/products/getProductsForSearch', {
                width: $("#search").outerWidth() - 2, //match width of input box (search box)		
                max: 5, // maximum of five results	
                scroll: false, // disable scroll in results
                dataType: "json", // expect json data
                matchContains: "word",
                parse: function (data) {
                    console.log(data);
                    return $.map(data, function (row) {
                        return {
                            data: row,
                            value: row.title,
                            result: $("#search").val()
                        }
                    });
                },
                formatItem: function (item) {
                    return format(item);
                }
            }).result(function (e, item) {
                // add the clicked result title in the search box
                $("#search").val(title(item));
                // redirect to the result's url
                location.href = link(item); 
            });
        });

    });
})(jQuery);