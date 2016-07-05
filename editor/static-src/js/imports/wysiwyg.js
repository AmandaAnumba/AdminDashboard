/**
 * dhNavBar is a jQuery plugin for custom navbar,  
 * using bootstrap's affix and scrollspy.
 * 
 * 
 * Use like so:
 *      $("#nav").dhNavBar({
 *          scrollspy: true
 *          scrollspyOffset: 200
 *      });
 *
 *
 *
 * The following options can be passed to dhNavBar:
 *      .dhNavBar({
 *          scrollspy: true / false  	// whether or not the navbar should also use bootstrap's scrollspy
 *									 	// default is false
 *          
 *			scrollspyOffset: 150  	 	// the offset number that should be passed to scrollspy if scrollspy is true
 *									 	// default is 150
 *      });
 *
 *
 *
 * The following options are automatically determined within dhNavBar:
 *		loggedIn: true / false			// the plugin determines if the user is logged in by
 *									 	// checking if the #fixedBar div is present. If it is, then the 
 *									 	// navbar will be adjusted so it's placed right under the fixedBar
 *									 	// when the user is logged in, and to the top of the page whent they
 *									 	// are not
 *		
 *		affixOffset: 0					// default is 0; if user is logged in, the offset becomes the height of  
 *									 	// the #fixedBar div; otherwise, it's 0
 *
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.wysiwyg = factory(root.$);
    }
}(this, function ($) {
    
    function wysiwyg( element, settings ) {
        log && log.trace('wysiwyg.init()');

        /* set global variables */
        this.$nav = $( element );
        this.$fixedBar = $('#fixedBar');
        this.$scrollTop = $('.scroll-top', this.$nav);
        this.affixOffset = 0;
        this.loggedIn = this.$fixedBar.length > 0 ? true : false;
        this.options = $.extend({
                scrollspy: false,
                scrollspyOffset: 150
            }, settings);

        if ( this.loggedIn ) {
            this.affixOffset = this.$fixedBar.outerHeight(true);
        }

        /* initialize bootstrap affix */
        this.initAffix();

        /* initialize bootstrap scrollspy */
        if ( this.options.scrollspy ) {
            this.initScrollSpy();
        }


        /* attach event bindings */
        this.$scrollTop.on('vclick', $.proxy( this.handleScrollToTop, this ));
        this.$nav.on('vclick', 'a', $.proxy( this.handleMenuLinkClick, this ));
    }


    /**
     *  scroll page to top when button is clicked
     */
    wysiwyg.prototype.initAffix = function( event ) {
        log && log.trace('wysiwyg.prototype.initAffix()');
        
        var that = this;

        /* attach affix events first */
        this.$nav.on('affixed.bs.affix', function() {
            $(this).css('top', that.affixOffset);
        });
        this.$nav.on('affixed-top.bs.affix', function() {
            $(this).css('top', '');
        });
        
        /* init affix */
        this.$nav.affix({
            offset: {
                top: function () {
                    if ( that.loggedIn ) {
                        return (this.top = that.$nav.offset().top + that.$fixedBar.outerHeight(true));
                    } else {
                        return (this.top = that.$nav.offset().top);
                    }
                }
            }
        });
    };


    /**
     *  scroll page to top when button is clicked
     */
    wysiwyg.prototype.initScrollSpy = function( event ) {
        log && log.trace('wysiwyg.prototype.initScrollSpy()');

        var id = '#' + this.$nav.attr('id'),
            that = this;

        $('body').scrollspy({ 
            target: id,
            offset: that.options.scrollspyOffset
        });
    };


    /**
     *  scroll page to top when button is clicked
     */
    wysiwyg.prototype.handleScrollToTop = function( event ) {
        log && log.trace('wysiwyg.prototype.handleScrollToTop()');
        
        event.preventDefault();
        event.stopPropagation();
        $('html,body').animate({ scrollTop: 0 }, 1000);
    };


    /**
     *  scroll page to top when button is clicked
     */
    wysiwyg.prototype.handleMenuLinkClick = function( event ) {
        log && log.trace('wysiwyg.prototype.handleMenuLinkClick()');
        
        event.preventDefault();
        event.stopPropagation();
        
        var section = $( event.currentTarget ).attr('href'),
            navHeight = this.$nav.outerHeight(true),
            targetTop = $(section).offset().top,
            offset = targetTop - navHeight;

        $("html, body").animate({ scrollTop: offset }, 600);
    };


    $.fn.wysiwyg = function( options ) {
        this.each(function() {
            new wysiwyg(this, options);
        });

        return this;
    };
}));