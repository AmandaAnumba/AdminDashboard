var mmenu = function() {
	var service = {
			init 		: init,
			open		: open,
			close 		: close
		},
		menu;

	return service;
	

	/////////////////////


	function init() {
		menu = $("#messager").data( "mmenu" );
	}

	function open() {
		menu.open();
	}

	function close() {
		menu.close();
	}
};

module.exports = mmenu;