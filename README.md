jqueryFunctionsFinder
=====================

Finds all the jQuery functions you have used on your page.
This exclude jQuery plugin functions


It will give you insights on your jQuery use, idea is to provide
alternatives for each jQuery function. Also a nice way for me getting
deeper into javascript.


Add this on the bottom of your page between script tags.
Open the page and your console and see the log.



                      
EXAMPLE:

add this to the head in your html

`<script src="path/to/ShowJQueryFunctions" type="text/javascript" ></script> `

add this before the closing body tag (`</body>`):

`<script>
var jqf = new ShowJQueryFunctions();
    jqf.init( ['ShowJQueryFunctions.js','jquery.min.js'] );
<script>`
