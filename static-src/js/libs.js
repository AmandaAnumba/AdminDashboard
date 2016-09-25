var $ = require('jquery');
window.jQuery = $;
window.$ = $;
require('./third-party/uikit.js');
require('./third-party/jquery.mmenu.all.min.js');
require('./third-party/mmenu/jquery.mmenu.offcanvas.min.js');

$(function() {
	$("#messager").mmenu({
		"navbar": {
			"title": "Messages"
		},
		"navbars": [
            {
               "content": [ "prev", "title", "next" ],
               "position": "top"
            }
        ],
		"offCanvas": {
			"pageSelector": "#content",
			"position": "right",
			"zposition": "front"
		}
	});
});