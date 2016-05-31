var $ = require('jquery');


var app = angular.module('adminApp', []);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
}]);

// Controllers
app.controller('commentsController', ['$scope', function($scope) {
    $scope.comments = [
        {user: "Rayna Kelly", comment: "Bacon ipsum dolor amet alcatra beef ribs tenderloin, pork short ribs eiusmod et capicola shankle swine pancetta pastrami. ", date:"28 May, 2015", status: "Pending", avatar: "ade.jpg"},
        {user: "Alanna Davidson", comment: "Ullamco in turkey leberkas id tempor swine in. Andouille pig kielbasa proident leberkas, turducken ", date:"16 June, 2015", status: "Pending", avatar: "nan.jpg"},
        {user: "Michael Greene", comment: "Excepteur laboris t-bone reprehenderit cow commodo venison drumstick short loin shankle.", date:"17 June, 2015", status: "Pending", avatar: "chris.jpg"},
        // {user: "Justin Clarke", comment: "In et incididunt, t-bone aute mollit beef eiusmod sint sunt. Lorem reprehenderit est ut bresaola, proident consequat cupidatat", date:"23 June, 2015", status: "Pending", avatar: "justen.jpg"},
        {user: "Alanna Davidson", comment: "Ipsum cow esse pig anim doner ham hock minim jowl. Swine ut pork turkey aliqua ham hock.", date:"25 June, 2015", status: "Pending", avatar: "nan.jpg"},
    ];
    $('#comments').css('visibility', 'visible');
}]);

app.controller('profileController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = {};

    $http.get("/getProfileData/")
        .then(function(response) {
            $scope.profile = response.data.profile;
        });

    $scope.updateProfile = function(data) {
        $scope.profile = angular.copy(data);

        var $form = $('#profile'),
            $inputs = $form.find('.form-control'),
            $btn = $('#updateProfile'),
            $loader = $('.page-loader');
        
        $loader.show();
        $inputs.prop('disabled', true);
        $btn.prop('disabled', true);
        
        $http({
            method: 'POST',
            url: '/profile/',
            data: $scope.profile,
        }).then(function success(response) {
            setTimeout(function() {
                $loader.hide();
                $inputs.prop('disabled', false);
                $btn.prop('disabled', false);
                
                if (response.data.success) {
                    $('#successMsg > .message').empty().append(response.data.success);
                    $('#successMsg').show();
                    $('html,body').animate({scrollTop: 0});

                    setTimeout(function() {
                        window.location = "/dashboard";
                    }, 2000);
                } else {
                    if (response.data.error) {
                        $('#errorMsg > .message').empty().append(response.data.error);
                        $('#errorMsg').show();
                        $('html,body').animate({scrollTop: 0});
                    }
                }
            }, 700);
        }, function error(response) {
            $('#errorMsg > .message').empty().append('<strong>Error: </strong> An error occured while trying to save your article. Please try again.');
            $('#errorMsg').show();
            $('html,body').animate({scrollTop: 0});
        });
    };
}]);

app.controller('editorController', ['$scope', '$http', function($scope, $http) {
    $scope.article = {};

    // $http.get("/getProfileData/")
    //     .then(function(response) {
    //         $scope.profile = response.data.profile;
    //     });

    $scope.updateProfile = function(data) {
        $scope.article = angular.copy(data);

        console.log($scope.article);

        // var $form = $('#profile form'),
        //     $inputs = $form.find('input'),
        //     $btn = $('#updateProfile');
        
        // $inputs.prop('disabled', true);
        // $form.css('opacity', '0.35');
        // $btn.html('<span class="spin icon icon-autorenew"></span>');
        
        // $http({
        //     method: 'POST',
        //     url: '/profile/',
        //     data: $scope.data,
        // }).then(function success(response) {
        //     $form.css('opacity', '');

        //     if (message.success) {
        //         $('#successMsg > .message').empty().append(message.success);
        //         $('#successMsg').show();
        //         setTimeout(function() {
        //             window.location = "/dashboard";
        //         }, 3500);
        //     } else {
        //         if (message.error) {
        //             $('#errorMsg > .message').empty().append(message.error);
        //             $('#errorMsg').show();
        //         }
        //     }
        // }, function error(response) {
        //     $('#errorMsg > .message').empty().append('<strong>Error: </strong> An error occured while trying to save your article. Please try again.');
        //     $('#errorMsg').show();
        // });
    };
}]);



var admin = {
    logClass: 'admin',
    pages: {},
    
    initialize: function() {
        log && console.log(this.logClass + '.initialize()');

        /* general bindings */
        $('button.close').on('click', $.proxy(this.handleCloseAlerts, this));
        $('button.panel-close').on('click', $.proxy(this.handleClosePanels, this));
        $('.dropdown-toggle').on('click', $.proxy(this.handleDropDownMenuClick, this));
        $(document).on('click', $.proxy(this.handleCloseDropDown, this));
    },

    /*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */
    handleCloseAlerts: function( event ) {
        log && console.log(this.logClass + '.handleCloseAlerts()');
        
        event.stopPropagation();
        event.preventDefault();

        $(event.currentTarget).closest('.alert').hide();
    },

    handleClosePanels: function( event ) {
        log && console.log(this.logClass + '.handleClosePanels()');
        
        event.stopPropagation();
        event.preventDefault();

        $(event.currentTarget).closest('.panel').hide();
    },
    
    handleDropDownMenuClick: function( event ) {
        log && console.log(this.logClass + '.handleDropDownMenuClick()');
        
        var menu = $(event.currentTarget).attr('dropdown-toggle'),
            $menu = $(menu);
        
        $('.dropdown-menu').not(menu).hide();
        
        if ( $menu.is(':visible') ) {
            $menu.hide();
        } else {
            event.stopPropagation();
            $menu.show();
        }
    },

    handleCloseDropDown: function( event ) {
        $('.dropdown-menu').hide();
    },

    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
    
};


$(document).ready(function() {
    admin.initialize();
});


module.exports = admin;