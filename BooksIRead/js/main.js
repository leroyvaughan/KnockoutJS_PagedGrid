$(function () {
    var PagedGridModel = function (data) {
        this.books = ko.observableArray(data);
        var curSort = 'title';

        this.sortByTitle = function () {
            if (curSort === 'title') { return; }
            else { curSort = 'title'; }

            this.books.sort(function (a, b) {
                return a.Title < b.Title ? -1 : 1;
            });
        };

        this.sortByAuthor = function () {
            if (curSort === 'author') { return; }
            else { curSort = 'author'; }

            this.books.sort(function (a, b) {
                return a.Author < b.Author ? -1 : 1;
            });
        };

        this.gridViewModel = new ko.simpleGrid.viewModel({
            data: this.books,
            columns: [
                { headerText: "TITLE", rowText: "Title", cssClass: "title" },
                { headerText: "AUTHOR", rowText: "Author" },
                { headerText: "CATEGORY", rowText: "Category" },
                { headerText: "BOOK SERIES", rowText: "Series" }
            ],
            pageSize: 15
        });
    }


    /*****  set WCF SVC Url for AJAX call   *******/
    var localPrefix = "http://localhost:89/";
    var hostPrefix = "http://communityautomotiveservice.net/BooksWCF/";
    var svcUrl = "BooksService.svc/GetAllBooks";
    var hostEnvironment = document.location.href;

    if (hostEnvironment.indexOf("localhost") > 0) {
        svcUrl = localPrefix + svcUrl;
    }
    else { svcUrl = hostPrefix + svcUrl; }
    
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: svcUrl,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        },
        success: function (booksData) {
            var myPagedGrid = new PagedGridModel(booksData.GetAllBooksResult);
            ko.applyBindings(myPagedGrid);

            var applyRoundedCorners = function () {
                //apply CSS to table for IE8 CSS3 rndCorners
                $(".ko-grid tr:last-child").addClass('lastTR');
                $(".lastTR td:first-child").addClass('botLeftTD');
                $(".lastTR td:first-child").addClass('botLeftTD');
                $(".lastTR td:last-child").addClass('botRtTD');
            };
            applyRoundedCorners();  //need this for page load

            //now add sort columns to the grid
            (function () {
                var setActiveSortCol = function (colHdr) {
                    $("th > div").removeClass("activeSort");
                    colHdr.addClass("activeSort");
                    applyRoundedCorners();
                };

                //add sort link to Title column
                var curObj = $("table.ko-grid th:nth-child(1)");
                var curHtml = curObj.html();
                curObj.html("<div id='sortByTitle' class='link activeSort'>" + curHtml + "</div>");
                
                $("#sortByTitle").click(function(){
                    myPagedGrid.sortByTitle();
                    setActiveSortCol($(this));
                });

                //add sort link to Author column
                curObj = $("table.ko-grid th:nth-child(2)");
                curHtml = curObj.html();
                curObj.html("<div id='sortByAuthor' class='link'>" + curHtml + "</div>");
                
                $("#sortByAuthor").click(function(){
                    myPagedGrid.sortByAuthor();
                    setActiveSortCol($(this));
                });
            })();

            //adding active state to currentPageIndex
            $(".ko-grid-pageLinks a").click(function () {
                    applyRoundedCorners();
            });
        }
    });
});