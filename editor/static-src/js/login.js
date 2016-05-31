var $ = require('jquery');
require('./third-party/bootstrap-tooltip.js');

window.ParsleyConfig = {
    errorClass: 'has-error',
    successClass: 'none',
    classHandler: function (ParsleyField) {
        return ParsleyField.$element.parents('.form-group');
    },
    errorsContainer: function (ParsleyField) {
        return ParsleyField.$element.parents('.form-group');
    },
    errorsWrapper: '<span class="help-block">',
    errorTemplate: '<div class="small"></div>'
};
require('./third-party/parsley.js');


var login = {
    logClass: 'login',

    initialize: function() {
        log && console.log(this.logClass + '.initialize()');
        
        /* general bindings */
        $('.btn-toggle').on('click', $.proxy(this.handleToggleForm, this));
        $('#submitLogin').on('click', $.proxy(this.handleLogin, this));
        $('#submitReset').on('click', $.proxy(this.handleForgotPw, this));
        $('#submitRegister').on('click', $.proxy(this.handleSignUp, this));
    },


    /*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */
    handleToggleForm: function( event ) {
        log && console.log( this.logClass + '.handleToggleForm()');

        event.preventDefault();
        event.stopPropagation();

        var target = $( event.currentTarget ).data('toggle');
        this.toggleForm(target);
    },
    
    handleLogin: function( event ) {
        log && console.log( this.logClass + '.handleLogin()');

        event.preventDefault();
        event.stopPropagation();
        this.login(true);
    },

    handleForgotPw: function( event ) {
        log && console.log( this.logClass + '.handleForgotPw()');

        event.preventDefault();
        event.stopPropagation();
        this.forgotPass(true);
    },

    handleSignUp: function( event ) {
        log && console.log( this.logClass + '.handleSignUp()');

        event.preventDefault();
        event.stopPropagation();
        this.signUp(true);
    },


    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
    toggleForm: function( form ) {
        /* first, hide all other forms */
        $('.form').hide();

        /* then, reveal the clicked form */
        $(form).slideDown();
    },

    login: function( sendRequest, response ) {
        log && console.log( this.logClass + '.login(  sendRequest: ' + sendRequest + '  )');
        
        if ( sendRequest ) {
            var $form = $('#login'),
                data = {
                    username: $('#login input[name=username]').val(),
                    password: $('#login input[name=password]').val()
                };

            this.sendRequest($form, '/login/', data, $.proxy(this.login, this));
        } else {
            if (response.error) {
                this.toggleLoadingAnimation();
                $('#error .message').empty().append(response.error);
                $('#error, #login').show();
            } 

            else if (response.login) {
                this.toggleLoadingAnimation();
                $('#error .message').empty().append(response.login);
                $('#error, #login').show();
            } 

            else {
                window.location = "/dashboard";
            }
        }
    },

    forgotPass: function( sendRequest, response ) {
        log && console.log( this.logClass + '.forgotPass(  sendRequest: ' + sendRequest + '  )');
        
        if ( sendRequest ) {
            var $form = $('#forgot'),
                data = {
                    email: $('input[name=email]', $form).val()
                };

            this.sendRequest($form, '/forgot', data, $.proxy(this.forgotPass, this));
        } else {
            if (response.success) {
                $('#error .message').empty().append(response.success);
                
                if ($('#error').hasClass('error')) {
                    $('#error').removeClass('error').addClass('success').show();
                }
                else {
                    $('#error').addClass('success').show();
                }
            } else {
                this.toggleLoadingAnimation();
                
                $('#error .message').empty().append(response.error);
                $('#forgot').show();

                if ($('#error').hasClass('success')) {
                    $('#error').removeClass('success').addClass('error').show();
                }
                else {
                    $('#error').addClass('error').show();
                }
            }
        }
    },

    signUp: function( sendRequest, response ) {
        log && console.log( this.logClass + '.signUp(  sendRequest: ' + sendRequest + '  )');
        
        var $form = $('#register');
        
        if ( sendRequest ) {
            var isValid = $('#register form').parsley().validate();
            
            if (isValid) {
                var data = {
                        username: $('input[name=username]', $form).val(),
                        password: $('input[name=password]', $form).val(),
                        confirm: $('input[name=confirm]', $form).val(),
                        email: $('input[name=email]', $form).val()
                    };

                this.sendRequest($form, '/register', data, $.proxy(this.signUp, this));
            }
        } else {
            this.toggleLoadingAnimation();
            
            if (response.error) {
                log && console.log(response.error);
                
                $form.show();
                
                /* username is taken */
                if (response.code === 202) {
                    $('#error .message').empty().append(response.error);
                    $('#error').show();
                    setTimeout(function() {
                        $("#error").hide();
                    }, 5500);
                }
            } else {
                $form.hide();
                $('#success .message').empty().append(response.success);
                $('#success').show();
                setTimeout(function() {
                    $("#success").hide();
                    window.location.replace("/");
                }, 2700);
            }
        }
    },


    /*
    ====================================================================================================
    Utility Functions
    ====================================================================================================
    */
    sendRequest: function( $form, url, data, callback ) {
        var that = this;

        /* hide the form and toggle the loading animation */
        $form.hide();
        this.toggleLoadingAnimation();

        /* send the request */
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            context: this,
            timeout: 60000,
            success: function( data, textStatus, jqXHR ) {
                callback(false, data);
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                that.toggleLoadingAnimation();
                $('#error .message').empty().append("<strong>Error: </strong>Please refresh the page and try again.");
                $('#error').show();
            }
        });
    },

    toggleLoadingAnimation: function() {
        var $loader = $('.page-loader');

        if ( $loader.is(':hidden') ) {
            $loader.show();
        } else {
            $loader.hide();
        }
    },
};


$(document).ready(function() {    
    login.initialize();
});