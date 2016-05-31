var admin = require('admin');
var moment = require('moment');
var ProgressBar = require('progressbar.js')
require('../third-party/jquery-ui.datepicker.min.js');


admin.editor = {
    logClass: 'editor',
    pages: {},

    initialize: function() {
        log && console.log(this.logClass + '.initialize()');

		/* init froala editor */
		$('#editor').editable({
			inlineMode: false, 
			minHeight: 400,
			maxHeight: 500,
			placeholder: 'Start typing here...',
			spellcheck: true,
			toolbarButtons: ["bold", "italic", "underline", "strikeThrough", "fontSize","fontFamily", "color","sep","subscript", "superscript", "formatBlock", "blockStyle", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent", "sep", "selectAll", "createLink", "undo", "removeFormat", "redo", "html", "insertHorizontalRule", "table"]
		});

        /* init jquery ui datepicker if browser doesn't have date input */
        if (!Modernizr.inputtypes.date) {
		    $('input[type=date]').datepicker({
		        dateFormat: 'yy-mm-dd'
		    });
		}

		/* init bootstrap tooltips
		$('.slide_toggle, .slide_toggle-left, #author, .video').tooltip();

		$('.dLS').tooltip({
			title: 'Delete this version',
			placement: 'left'
		});

		$('.loadLS').tooltip({
			title: 'Continue with this version',
			placement: 'bottom'
		}); */

		/* check if there are autosaved drafts */
		// this.recovery();



        /* general bindings */
        $('.slide_toggle').on('click', $.proxy(this.handlePopOutTabs, this));
	    
	    /* article components */
        $('#addAuthor').on('click', $.proxy(this.handleToggleAuthorList, this));
        $('#authorSelect').on('change', 'input', $.proxy(this.handleAddAuthor, this));

        /* header image */
        $('.image-overlay').on('click', $.proxy(this.handleToggleHeaderImg, this));
        $('#avatar, #headerIMG').on('change', $.proxy(this.handleUploadImage, this));

        /* articles from local storage */
        $('#clearStorage').on('click', $.proxy(this.handleClearLocalStorage, this));








	    // checkbox changes
	    $('#headerSame').change(function() {
	        if ($(this).is(":checked")) {
	            document.getElementById("featureIMG").disabled = true;
	            var img = $('#headerIMGurl').val();
	            $('#featureIMGurl').val(img);
	            $('#upload_btn2').hide();
	        }
	        else {
	        	document.getElementById("featureIMG").disabled = false;
	        	$('#upload_btn2').show();
	        }      
	    });

		$('#menu-toggle').click(function() {
			var $icon = $(this).find('.icon'),
				$header = $('.menu_top_wrapper');

			if ($icon.hasClass('icon-maximize')) {
				$icon.removeClass('icon-maximize').addClass('icon-minimize');
			}

			else if ($icon.hasClass('icon-minimize')) {
				$icon.removeClass('icon-minimize').addClass('icon-maximize');
			}

			$header.toggleClass('open');
			// $('#data').toggleClass('active');
		});

		// add tags to the list to be checked
		$('#add2list').click(function() {
			var x = $('input[name=taginput]').val();

			if (x == "" || x == " ") {
				$('input[name=taginput]').val("");
				return;
			}
			else {
				if (!$('#tags_list').is(":visible")) {
					$('#tags_list').show();
				}
				var tags = x.split(',');

				for (var i=0; i < tags.length; i++) {
					$('#tags_list').append('<p><span class="icon-circle-cross remove_tag" onclick="$(this).parent().hide();"></span>'+tags[i].trim()+'</p>');
				}
				$('input[name=taginput]').val("");
			}
		});

		$('.slide_toggle-left').click(function() {
			var $popout = $(this).parent();
			
			$('.popout-left').not($popout).animate({left:'-360px'}, {queue: false, duration: 500}).removeClass('popped');

			if ($popout.hasClass("popped")) {
				$popout.animate({left:'-360px'}, {queue: false, duration: 500}).removeClass('popped');
				$('.slide_toggle-left').not(this).show();
			}
			
			else {
				$popout.animate({left:'0px'}, {queue: false, duration: 500}).addClass('popped');
				$('.slide_toggle-left').not(this).hide();
			}
		});

		$('#upload_btn2').click(function() {
			var name = $('#featureIMG').get(0).files[0].name.replace(/ /g,'').replace(/[&\/\\#,+()$~%^'":*?<>{}]/g, ''),
				selector = 'featureIMG',
				title = "";

			if (name.length > 20) {
			    title = name.substring((name.length-20),name.length);
			}

			else {
				title = name;
			}

			s3_upload_v2(title, selector);
		});

		$('#upload_btn3').click(function() {
			var name = $('#allmedia').get(0).files[0].name.replace(/ /g,'').replace(/[&\/\\#,+()$~%^'":*?<>{}]/g, ''),
				selector = 'allmedia',
				title = "";

			if (name.length > 20) {
			    title = name.substring((name.length-20),name.length);
			}

			else {
				title = name;
			}

			s3_upload_v3(title, selector);
		});

		$('#finished').click(function() {
			var id 				= $('#id').text(),
				title           = $('input[name=title]').val(),
			    author          = $('input[name=author]').val(),
			    content         = $('#editor').editable('getHTML', false, true),
			    featureIMG      = $('input[name=featureIMGurl]').val(),
			    headerIMG       = $('input[name=headerIMGurl]').val(),
			    description     = $('textarea[name=description]').val(),
			    releaseDate     = $('input[name=release]').val(),
			    currRelease     = $('#rDate').text(),
			    currRelease2    = $('#releaseDate').text(),
	            doctype         = $('input[name=doctype]:checked').val(),
	            docstyle        = $('input[name=docstyle]:checked').val(),
			    cycle           = $('input[name=feature-cycle]:checked').val(),
	            selected        = [],
			    ca 		        = [],
			    options 		= [],
			    release 		= "",
			    photoCred 		= "",
			    category 		= "",
			    tags 			= "",
			    photoCredOrig 	= $('#photo_cred_orig').val(),
			    photoCredNew 	= $('#photo_cred_new').val(),
			    currentCat 		= $('#current_cat').text(),
			    currentTags 	= $('#article_tags').text(),
			    catNew,
			    tagsNew,
			    counter = 0;

	        $('#more-authors input:checkbox:checked').each(function() {
	            ca.push($(this).val());
	        });
	        var coAuthor = ca.join(", ");

			// release date change
			if ((currRelease !== 'No date selected') && !releaseDate) {
				$('#fRelease').empty().append(currRelease);
				$('#dateForRelease').empty().append(currRelease2);
			}
			if ((currRelease === 'No date selected') && (releaseDate) ) {
				$('#fRelease').empty().append(moment(releaseDate).format("dddd, MMMM Do YYYY"));
				$('#dateForRelease').empty().append(moment(releaseDate).toArray().toString());
			}
			if (releaseDate) {
				$('#fRelease').empty().append(moment(releaseDate).format("dddd, MMMM Do YYYY"));
				$('#dateForRelease').empty().append(moment(releaseDate).toArray().toString());
			}
			if ((currRelease === 'No date selected') && (!releaseDate) ) {
				$('#fRelease').empty().append('<span class="icon icon-cross text-danger"></span> No Date Selected');
				$('#dateForRelease').empty().append('None');
				counter ++;
			}

			// title
			if (title) {
				$('#fTitle').empty().append(title);
			}
			if (!title) {
				$('#fTitle').empty().append('<span class="icon icon-cross text-danger"></span> No Title');
				counter ++;
			}

			// author
			$('#fAuthor').empty().append(author);

			// coAuthor
			if (!coAuthor) {
				$('#fCo').empty().append('None');
			}
			if (coAuthor) {
				$('#fCo').empty().append(coAuthor);
			}

			// type
	        $('#fType').empty().append(doctype);

	        // style
			$('#fStyle').empty().append(docstyle);

	        // cycle
	        $('#fCycle').empty().append(cycle);

			// categories
			$('#category input:checkbox:checked').each(function() {
				options.push($(this).val());
			});
			
			catNew = options.join(", ");
			
			if ((options.length === 0) && (currentCat)) {
				category = currentCat;
			}
			if (options.length !== 0) {
				category = catNew;
			}
			if ((options.length === 0) && (!currentCat)) {
				category = '<span class="icon icon-cross text-danger"></span> None';
				counter ++;
			}
			$('#fCategory').empty().append(category);

			// tags
			$('#tags_list p').each(function() {
				selected.push($(this).text());
			});
			
			tagsNew = selected.join(", ");

			if ((selected.length === 0) && (currentTags)) {
				tags = currentTags;
			}
			if (selected.length !== 0) {
				tags = tagsNew;
			}
			if ((selected.length === 0) && (!currentTags)) {
				tags = '<span class="icon icon-cross text-danger"></span> None';
				counter ++;
			}
	        $('#fTags').empty().append(tags);


			if (!description) {
				$('#fDescription').empty().append('<span class="icon icon-cross text-danger"></span> None');
				counter ++;
			}
			if (description) {
				$('#fDescription').empty().append(description);
			}

	        if (!content) {
	            $('#fContent').empty().append('<span class="icon icon-cross text-danger"></span> No Article Written');
	            counter ++;
	        }
	        if (content) {
	            $('#fContent').empty().append('<span class="icon icon-check text-success"></span>');
	        }

			if (!headerIMG) {
				$('#fHeader').empty().append('<span class="icon icon-cross text-danger"></span>');
				counter ++;
			}
			if (headerIMG) {
				$('#fHeader').empty().append('<span class="icon icon-check text-success"></span>');
			}

			if (!featureIMG) {
				$('#fFeature').empty().append('<span class="icon icon-cross text-danger"></span>');
				counter ++;
			}
			if (featureIMG) {
				$('#fFeature').empty().append('<span class="icon icon-check text-success"></span>');
			}

			// photo cred
	        if (photoCredOrig && !photoCredNew ) {
				$('#fPhotoCred').empty().append(photoCredOrig);
			}
			if (!photoCredOrig && photoCredNew ) {
				$('#fPhotoCred').empty().append(photoCredNew);
			}
			if (!photoCredOrig  && !photoCredNew ) {
				$('#fPhotoCred').empty().append('<span class="icon icon-cross text-danger"></span> No Photo Cred Given <span style="font-style:italics;">(not needed)</span>');
			}

			if (counter > 0) {
				$('#proofBTN').attr('disabled', 'disabled');
			}

			if (counter === 0) {
				$('#proofBTN').removeAttr('disabled');
			}
		});

	    $('#change_img').click(function() {
	        $(this).hide();
	        $('#photo_cred_orig, #header_old').hide();
	        $('#avi').show();
	    });
    },


    /*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */
    handleToggleAuthorList: function( event ) {
    	log && console.log(this.logClass + '.handleToggleAuthorList()');
    	
    	event.preventDefault();
        event.stopPropagation();

        var $el = $(event.currentTarget);

        $el.find('.icon').toggleClass('icon-circle-plus icon-circle-cross');
		$('#authorSelect ul').slideToggle('fast');
    },

    handleAddAuthor: function( event ) {
    	log && console.log(this.logClass + '.handleAddAuthor()');
    	
    	event.preventDefault();
        event.stopPropagation();

        var coAuthors = [],
        	authors;
		
		$('#authorSelect input:checkbox:checked').each(function() {
			coAuthors.push($(this).val());
		});
		authors = coAuthors.join(", ");

		/* update the article authors and co-authors input*/
		if (coAuthors.length === 0) {
			$('#authors').empty();
			$('input[name="coAuthor"]').val('');
		} else {
			$('#authors').text(', ' + authors);
			$('input[name="coAuthor"]').val(authors);
		}
    },

    handleToggleHeaderImg: function( event ) {
    	if ( !$(event.currentTarget).hasClass('file-open') ) {
			log && console.log(this.logClass + '.handleToggleHeaderImg()');
	    	
	    	event.preventDefault();
	        event.stopPropagation();

	        var $section = $('.article__header-image'),
	        	$overlay = $(event.currentTarget);

	        $overlay.css('padding-top','30px');

	        $('.custom-file-upload', $section).addClass('fadeInUp').show();
	        $('.overlay-text', $section).hide();
	        $('.overlay-text', $section).hide();
	        $overlay.addClass('file-open');
    	}
    },

    handleUploadImage: function( event ) {
    	log && console.log(this.logClass + '.handleUploadImage()');
    	
    	event.preventDefault();
        event.stopPropagation();

        var $el = $(event.currentTarget);
		this.readURL($el);
    },





    handleClearLocalStorage: function( event ) {
        event.preventDefault();
        event.stopPropagation();

        this.clearLocalStorage();
    },

    handlePopOutTabs: function( event ) {
    	log && console.log(this.logClass + '.handlePopOutTabs()');
    	
    	event.preventDefault();
        event.stopPropagation();

        var $toggle = $(event.currentTarget),
        	$popout = $toggle.parent();
			
		$('.popout').not($popout).animate({right:'-360px'}, {queue: false, duration: 500}).removeClass('popped');

		if ($popout.hasClass("popped")) {
			$popout.animate({right:'-360px'}, {queue: false, duration: 500}).removeClass('popped');
			$('.slide_toggle').not($toggle).show();
		} else {
			$popout.animate({right:'0px'}, {queue: false, duration: 500}).addClass('popped');
			$('.slide_toggle').not($toggle).hide();
		}
    },

    




    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
    readURL: function( $input ) {
    	var file = $input.get(0).files[0],
    		$img = $($input.data('image-input'));

    	if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
            	/* show the new image */
                $img.attr('src', event.target.result).show().parent().show();

                if ($input.attr('name') == "headerIMG") {
	        		/* show the overlay buttons and the photo cred input */
	        		$('.image-details').show();
	        		$('.article__header-image').addClass('hover');
				}
            };
            reader.readAsDataURL(file);
        }
    },

    catChange: function() {
    	$('#catChange').hide();
		$('#categoriesWrapper').show();
    },

    changeIMG: function() {
    	$('#fIMG, #changeIMG, #fIMG-des').hide();
		$('#change_image').show();
    },

    changeDate: function() {
    	$('#changeDate').hide();
    	$('#release').show();
    },

    postArticle: function(action) {
    	// $('#register-form').hide();
	    // $('#loader').show();
	    
	    var title           = $('#post input[name=title]').val(),
		    author          = $('#post input[name=author]').val(),
		    description     = $('#post textarea[name=description]').val(),
		    content         = $('#editor').editable('getHTML', false, true),
		    featureIMG      = $('#post input[name=featureIMGurl]').val(),
		    releaseDate     = $('input[name=release]').val(),
	        doctype         = $('#post input[name=doctype]:checked').val(),
	        docstyle        = $('#post input[name=docstyle]:checked').val(),
		    cycle           = $('#post input[name=feature-cycle]:checked').val(),
		    headerIMG       = $('#post input[name=headerIMGurl]').val(),
		    photoCred       = $('#post input[name=photo_cred]').val(),
		    selected 		= [],
		    options 		= [],
		    release 		= "",
		    coAuthors		= [],
	        currentCycle    = "";

		$('#tags_list p').each(function() {
			selected.push($(this).text());
		});
		var tags = selected.join(", ");

		$('#category input:checkbox:checked').each(function() {
			options.push($(this).val());
		});
		var category = options.join(", ");

		if (title == "") {
			var date = moment().format("MM/D/YYYY");
			title = "Article "+ date;
		}

		if (releaseDate == "") {
			release = null;
		}

		if (releaseDate != "") {
			release = moment(releaseDate).toArray().toString();
		}

		if (featureIMG === "") {
	        if ($('#headerSame').prop("checked")) {
				featureIMG = headerIMG || 'same';
			}
			else {
				featureIMG = '';
			}
		}

		$('#more-authors input:checkbox:checked').each(function() {
			coAuthors.push($(this).val());
		});
		var ca = coAuthors.join(", ");

		$.post('/submit', {
	    	title: title,
		    author: author,
		    description: description,  
		    content: content, 
		    featureIMG: featureIMG,
		    status: action,
		    releaseDate: release, 
	        doctype: doctype,  
		    docstyle: docstyle,
	        cycle: cycle,
		    headerIMG: headerIMG,    
		    coAuthor: ca,      
		    tags: tags,
		    category: category,
		    photoCred: photoCred
	    }).done(function(message) {
	    	if (message['success']) {
	        	$('#success_msg > .message').empty().append(message['success']);
	        	$('#success_msg').show();
	            localStorage.clear();
	        	setTimeout('window.location = "/dashboard";', 3500);
	    	}

	    	if (message['error']) {
	        	$('#errorAlert > .message').empty().append(message['error']);
	        	$('#errorAlert').show();
	    	}
	    }).fail(function() {
	    	$('#errorAlert > .message').empty().append('<strong>Error: </strong> An error occured while trying to save your article. Please try again.');
	    	$('#errorAlert').show();
	    }); 
    },

    save: function(action, table) {
    	var id 				= $('#id').text(),
			title           = $('input[name=title]').val(),
		    author          = $('input[name=author]').val(),
		    content         = $('#editor').editable('getHTML', false, true),
		    featureIMG      = $('input[name=featureIMGurl]').val(),
		    headerIMG       = $('input[name=headerIMGurl]').val(),
		    description     = $('textarea[name=description]').val(),
		    releaseDate     = $('input[name=release]').val(),
		    currRelease     = $('#rDate').text(),
	        doctype         = $('input[name=doctype]:checked').val(),
	        docstyle        = $('input[name=docstyle]:checked').val(),
		    cycle           = $('input[name=feature-cycle]:checked').val(),
		    selected 		= [],
		    options 		= [],
	        coAuthors       = [],
		    release 		= "",
		    photoCred 		= "",
		    category 		= "",
		    currentCat 		= $('#current_cat').text(),
		    catNew;

		// release date change
		if ((currRelease !== 'No date selected') && !releaseDate) {
			release = $('#releaseDate').text();
		}
		if ((currRelease === 'No date selected') && (releaseDate !== "") ) {
			release = moment(releaseDate).toArray().toString();
		}
		if (releaseDate) {
			release = moment(releaseDate).toArray().toString();
		}
		if ((currRelease === 'No date selected') && (releaseDate === "") ) {
			release = 'None';
		}
		
		// title
		if (!title) {
			var date = moment().format("MM/D/YYYY");
			title = "Article "+ date;
		}

	    // feature image
	    if (featureIMG === "") {
	        if ($('#headerSame').prop("checked")) {
	            featureIMG = headerIMG || 'same';
	        }
	        else {
	            featureIMG = '';
	        }
	    }
	    if (featureIMG === "same") {
	        featureIMG = headerIMG || 'same';
	    }
	    
	    // coAuthors
	    $('#more-authors input:checkbox:checked').each(function() {
	        coAuthors.push($(this).val());
	    });
	    var ca = coAuthors.join(", ");


		// photo cred
		if (!$('#header_old').is(':visible')) {
		    photoCred = $('#post input[name=photo_cred_new]').val();	
		}
		if ($('#header_old').is(':visible')) {
		    photoCred = $('#post input[name=photo_cred_orig]').val();	
		}

		// categories
		$('#category input:checkbox:checked').each(function() {
			options.push($(this).val());
		});
		
		catNew = options.join(", ");
		// console.log(catNew);
		
		if ((options.length === 0) && (currentCat)) {
			category = currentCat;
		}
		if (options.length !== 0) {
			category = catNew;
		}
		if ((options.length === 0) && (!currentCat)) {
			category = 'None';
		}

		// tags
		$('#tags_list p').each(function() {
			selected.push($(this).text());
		});
		var tags = selected.join(", ");

		$.post('/update', {
			id: id,
	    	title: title,
		    author: author,
		    description: description,  
		    content: content, 
		    featureIMG: featureIMG,
		    status: action,
		    releaseDate: release, 
	        doctype: doctype,  
	        docstyle: docstyle,  
		    cycle: cycle,  
		    headerIMG: headerIMG,    
		    coAuthor: ca,      
		    tags: tags,
		    category: category,
		    photoCred: photoCred,
		    table: table
	    }).done(function(message) {
	    	if (message['success']) {
	        	$('#success_msg > .message').empty().append(message['success']);
	        	$('#success_msg').show();
	            localStorage.clear();
	        	setTimeout('window.location = "/dashboard";', 3500);
	    	}

	    	if (message['error']) {
	        	$('#errorAlert > .message').empty().append(message['error']);
	        	$('#errorAlert').show();
	    	}
	    }).fail(function() {
	    	$('#errorAlert > .message').empty().append('<strong>Error: </strong> An error occured while trying to save your article. Please try again.');
	    	$('#errorAlert').show();
	    }); 
    },

    proofed: function() {
    	var id 				= $('#id').text(),
			title           = $('#fTitle').text(),
		    author          = $('#fAuthor').text(),
		    coAuthor        = $('#fCo').text(),
		    content         = $('#editor').editable('getHTML', false, true),
		    featureIMG      = $('input[name=featureIMGurl]').val(),
		    headerIMG       = $('input[name=headerIMGurl]').val(),
		    description     = $('#fDescription').text(),
		    releaseDate     = $('#dateForRelease').text(),
	        doctype         = $('#fType').text(),
	        docstyle        = $('#fStyle').text(),
		    cycle           = $('#fCycle').text(),
		    photoCred 		= $('#fPhotoCred').text(),
		    tags 			= $('#fTags').text(),
		    category 		= $('#fCategory').text();

		$.post('/queue', {
			id: id,
	    	title: title,
		    author: author,
		    description: description,  
		    content: content, 
		    featureIMG: featureIMG,
		    status: 'proofed',
		    releaseDate: releaseDate, 
	        doctype: doctype,  
	        docstyle: docstyle,  
		    cycle: cycle,  
		    headerIMG: headerIMG,    
		    coAuthor: coAuthor,      
		    tags: tags,
		    category: category,
		    photoCred: photoCred
	    }).done(function(message) {
	    	$('#finishModal').modal('hide');

	    	if (message['success']) {
	        	$('#success_msg > .message').empty().append(message['success']);
	        	$('#success_msg').show();
	        	setTimeout('window.location = "/dashboard";', 3500);
	    	}

	    	if (message['error']) {
	        	$('#errorAlert > .message').empty().append(message['error']);
	        	$('#errorAlert').show();
	    	}
	    }).fail(function() {
	    	$('#errorAlert > .message').empty().append('<strong>Error: </strong> An error occured while trying to save your article. Please try again.');
	    	$('#errorAlert').show();
	    }); 
    },

    publish: function (id) {
		$.post('/publish', {
			id: id
	    }).done(function(message) {
	    	if (message['success']) {
	        	$('#list_'+id).hide();
	        	$('#list_'+id).parent().find('.success_check').show();
	    	}

	    	if (message['error']) {
	        	$('#list_'+id).hide();
	        	$('#list_'+id).parent().find('.error_cross').show();
	    	}
	    }).fail(function() {
	    	console.log('error');
	    }); 
	},

	deletedraft: function (db) {
		var id = $('#id').text();

		$.post('/delete', {
	    	id: id,
	        table: db
	    }).done(function(message) {
	    	$('#deleteModal').modal('hide')
	    	if (message['success']) {
	        	$('#success_msg > .message').empty().append(message['success']);
	        	$('#success_msg').show();
	        	setTimeout('window.location = "/dashboard";', 2700);
	    	}

	    	if (message['error']) {
	        	$('#errorAlert > .message').empty().append(message['error']);
	        	$('#errorAlert').show();
	    	}
	    }).fail(function() {
	    	$('#errorAlert > .message').empty().append('<strong>Error: </strong> An error occured while trying to delete this article. Please refresh the page and try again.');
	    	$('#errorAlert').show();
	    }); 
	},

	s3_upload: function (filename, selector){
		var circle = new ProgressBar.Circle('#circle-progress', {
		    color: '#7266ba',
		    strokeWidth: 6
		});

		$('#upload_btn1').hide();
		$('#circle-progress').show();

		var title = filename.replace(/ /g,'').replace(/[&\/\\#,+()$~%^'":*?<>{}]/g, ''),
			fn = "";

		if (title.length > 20) {
		    fn = title.substring((title.length-20),title.length);
		}

		if (title.length < 20) {
			fn = title;
		}

	    var s3upload = new S3Upload({
	    	s3_object_name: fn,
	        file_dom_selector: selector,
	        s3_sign_put_url: '/uploads/',

	        onProgress: function(percent, message) {
	            console.log('Upload progress: ' + percent + '% ' + message);
	            if (percent == 100) {
	            	circle.animate(1);
	            }

	            else {
	            	circle.set(percent*0.01);
	            }
	        },
	        onFinishS3Put: function(url) {
	            $('#circle-progress').hide();
	            $('#success_upload').show();
	            $('input[name=headerIMGurl]').val(url);
	            console.log(url);
	        },
	        onError: function(status) {
	            console.log('Upload error: ' + status);
	            $('#circle-progress').hide();
	            $('#error_upload').show();
	        }
	    });
	},

	s3_upload_v2: function (filename, selector){
		var line = new ProgressBar.Line('#progress2', {
		    color: '#BBB0FF',
		    strokeWidth: 2
		});

		$('#upload_btn2, .response').hide();
		$('#progress2').show();

	    var s3upload = new S3Upload({
	    	s3_object_name: filename,
	        file_dom_selector: selector,
	        s3_sign_put_url: '/uploads/',

	        onProgress: function(percent, message) {
	            console.log('Upload progress: ' + percent + '% ' + message);
	            if (percent == 100) {
	            	line.animate(1);
	            }

	            else {
	            	line.set(percent*0.01);
	            }
	        },
	        onFinishS3Put: function(url) {
	            $('#progress2').hide();
	            $('#success_upload2').show();
	            $('input[name=featureIMGurl]').val(url);

	            // $('#pop_uploads').show();

	            // if (!$('#pop_uploads').hasClass('popped')) {
	            // 	$('#pop_uploads').animate({left:'0px'}, {queue: false, duration: 500}).addClass('popped');
	            // }

	        	// var image = "<img src='"+url+"' alt='Article Image' />";
	        	// $('#pop_uploads').find('.popout_content').append('<p class="label">'+filename+'</p><input class="clear-input-small2" type="text" value="'+image+'" readonly>');
	        },
	        onError: function(status) {
	            console.log('Upload error: ' + status);
	            $('#progress2').hide();
	            $('#error_upload2').show();
	        }
	    });
	},

	s3_upload_v3: function (filename, selector){
		var line = new ProgressBar.Line('#progress3', {
		    color: '#BBB0FF',
		    strokeWidth: 2
		});

		$('#upload_btn3, .response').hide();
		$('#progress3').show();

	    var s3upload = new S3Upload({
	    	s3_object_name: filename,
	        file_dom_selector: selector,
	        s3_sign_put_url: '/uploads/',

	        onProgress: function(percent, message) {
	            console.log('Upload progress: ' + percent + '% ' + message);
	            if (percent == 100) {
	            	line.animate(1);
	            }

	            else {
	            	line.set(percent*0.01);
	            }
	        },
	        onFinishS3Put: function(url) {
	            $('#progress3').hide();
	            $('#success_upload3, #pop_uploads, #upload_btn3').show();
	            $('#allmedia').val('');

	            if (!$('#pop_uploads').hasClass('popped')) {
	            	$('#pop_uploads').animate({left:'0px'}, {queue: false, duration: 500}).addClass('popped');
	            }

	        	var image = "<img src='"+url+"' alt='Article Image' />";
	        	$('#pop_uploads').find('.popout_content').append('<p class="label">'+filename+'</p><input class="clear-input-small2" type="text" value="'+image+'" readonly>');
	        },
	        onError: function(status) {
	            console.log('Upload error: ' + status);
	            $('#progress3').hide();
	            $('#error_upload3').show();
	        }
	    });
	},

	autosave: function () { 
		var title           = $('#post input[name=title]').val(),
		    author          = $('#post input[name=author]').val(),
		    description     = $('#post textarea[name=description]').val(),
		    content         = $('#editor').editable('getHTML', false, true),
		    featureIMG      = $('#post input[name=featureIMGurl]').val(),
		    releaseDate     = $('input[name=release]').val(),
	        doctype         = $('#post input[name=doctype]:checked').val(),
		    docstyle        = $('#post input[name=docstyle]:checked').val(),
		    headerIMG       = $('#post input[name=headerIMGurl]').val(),
		    photoCred       = $('#post input[name=photo_cred]').val(),
		    selected 		= [],
		    options 		= [],
		    release 		= "",
		    coAuthors		= [];

		$('#tags_list p').each(function() {
			selected.push($(this).text());
		});
		var tags = selected.join(", ");

		$('#category option:selected').each(function() {
			options.push($(this).val());
		});
		var category = options.join(", ");

		if (title == "") {
			var date = moment().format("MM/D/YYYY");
			title = "Article "+ date;
		}

		if (releaseDate == "") {
			release = null;
		}

		if (releaseDate != "") {
			release = moment(releaseDate).toArray().toString();
		}

		if (featureIMG === "") {
			if ($('#headerSame').prop("checked")) {
				featureIMG = 'same';
			}
			else {
				featureIMG = '';
			}
		}

		$('#more-authors input:checkbox:checked').each(function() {
			coAuthors.push($(this).val());
		});
		var ca = coAuthors.join(", ");

		var x = {};
		x.title = title;
	    x.author = author;
	    x.description = description;  
	    x.content = content; 
	    x.featureIMG = featureIMG;
	    x.releaseDate = release; 
	    x.doctype = doctype;  
	    x.docstyle = docstyle;  
	    x.headerIMG = headerIMG;    
	    x.coAuthor = ca;      
	    x.tags = tags;
	    x.category = category;
	    x.photoCred = photoCred;
	    x.timestamp = moment().format('MMMM Do YYYY, h:mm a');

		// localStorage.clear();
		localStorage.setItem(title, JSON.stringify(x));
	},

	recovery: function () { 
		var len = localStorage.length,
			that = this;

		if (len > 0) {
			$('#autosaveDrafts #drafts_list').empty();

			for (var i = 0; i < len; i++) {
				var title = localStorage.key(i);

				if ((title !== 'undefined') || (title !== 'ruulzIndex')) {
					var retrieved = localStorage.getItem(title),
						x = JSON.parse(retrieved),
						timestamp = x['timestamp'],
						html = '<li class="draft_item" id="v'+ i +'"><span class="icon-circle-cross dLS" style="color:indianred;padding-right:15px;" onclick="deletefromLS(\''+title+'\',\'v'+ i +'\');"></span><span class="loadLS" style="cursor:pointer;" onclick="loadfromLS(\''+title+'\')">'+ title +' - '+timestamp+'</span></li>';
					$('#autosaveDrafts #drafts_list').append(html);
				}
			} 

			$('#autosaveDrafts').modal('show');
		} else {
			// autosave every 1.5 mins
	        window.setInterval(that.autosave,60000);
	        return;
		}	
	},

    loadfromLS: function(title) {
	    var retrieved = localStorage.getItem(title),
	        x = JSON.parse(retrieved);

	    $('#post input[name=title]').val(x['title']);
	    $('#post input[name=author]').val(x['author']);
	    $('#post textarea[name=description]').val(x['description']);
	    $('#editor').editable("setHTML", x['content'], true);
	    $('#post input[name=headerIMGurl]').val(x['headerIMG']);
	    $('#post input[name=photo_cred]').val(x['photoCred']);

	    if (x['doctype']) {
	        $("input[name=doctype][value=" + x['doctype'] + "]").prop('checked', true);
	    }

	    if (x['docstyle']) {
	        $("input[name=docstyle][value=" + x['docstyle'] + "]").prop('checked', true);
	    }

	    if ((x['releaseDate'] === 'None') || (x['releaseDate'] === null) || (x['releaseDate'] === "")) {
	        $('#rDate').empty().append('No date selected');
	        $('#date').show();
	    }

	    if ((x['releaseDate'] !== 'None') && (x['releaseDate'] !== null) && (x['releaseDate'] !== "")) {
	        var y = x['releaseDate'].split(','),
	            date = moment(y).format("dddd, MMMM Do YYYY");
	        $('#rDate').empty().append(date).val(x['releaseDate']);
	        $('#date').show();
	    }

	    if (x['featureIMG'] === 'same') {
	        $('#headerSame').prop("checked", true);
	    }

	    var tags = x['tags'].split(','),
	        coAuth = x['coAuthor'].split(','),
	        cat = x['category'].split(',');

	    if ((tags.length > 0) && (tags[0] != "")) {
			for (var i=0; i < tags.length; i++) {
				if (tags[i] != "") {
					$('#tags_list').append('<p><span class="icon-circle-cross remove_tag" onclick="$(this).parent().hide();"></span>'+tags[i].trim()+'</p>');
				}
			}
			$('#tags_list').show();
		}

	    if ((coAuth.length > 0) && (coAuth[0] != "")) {
	        for (var j=0; j < coAuth.length; j++) {
	            if ((coAuth[j] != "") && (coAuth[j] != 'None')) {
	                $('#more-authors input:checkbox[value="' + coAuth[j] + '"]').prop('checked', true);
	            }
	        }
	        $('#more-authors').show();
	    }

	    if ((cat.length > 0) && (cat[0] != "")) {
	        for (var k=0; k < cat.length; k++) {
	            if ((cat[k] != "") && (cat[k] != 'None')) {
	                $('#category input:checkbox[value="' + cat[k] + '"]').prop('checked', true);
	            }
	        }
	    }

	    $('#autosaveDrafts').modal('hide');

	    // autosave every 1.5 mins
	    window.setInterval(autosave,60000);
	},

	deletefromLS: function(title, item) {
	    localStorage.removeItem(title);
	    $('#'+item).hide();

	    // autosave every 1.5 mins
	    window.setInterval(autosave,60000);
	},

    clearLocalStorage: function() {
    	localStorage.clear();
	    $('#autosaveDrafts').modal('hide');

	    /* autosave every 1.5 mins */
	    window.setInterval(autosave,60000);
    },
};	


$(document).ready(function() {
    admin.editor.initialize();
});


module.exports = admin.editor;