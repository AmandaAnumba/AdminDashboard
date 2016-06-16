'use strict';

var httpConfig = function($httpProvider, $cookies, logger) {
	var csrftoken = $cookies.get('csrftoken');
	logger.log(csrftoken);

	if ( !csrftoken ) {
		csrftoken = getCookie('csrftoken');
	}
	logger.log(csrftoken);
	
	$httpProvider.defaults.headers.common['X-CSRFToken'] = csrftoken;


	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

module.exports = httpConfig;