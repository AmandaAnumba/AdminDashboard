var admin = require('admin');

admin.pages.profile = {
    logClass: 'admin.pages.profile',

    initialize: function() {
        log && console.log(this.logClass + '.initialize()');

        /* init bootstrap tooltips */
        $('[data-toggle="tooltip"]').tooltip();

        /* general bindings */
        $('#changeAvi').on('click', $.proxy(this.handleChangeAvatar, this));
        $('#deleteAvi').on('click', $.proxy(this.handleDeleteAvatar, this));
        $('#uploadAvi').on('change', $.proxy(this.handleUploadAvatar, this));
        $('.cancel-upload').on('click', $.proxy(this.handleCancelUpload, this));
    },


    /*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */
    handleChangeAvatar: function( event ) {
        log && console.log(this.logClass + '.handleChangeAvatar()');
        
        event.preventDefault();
        event.stopPropagation();
        this.changeAvatar();
    },

    handleDeleteAvatar: function( event ) {
        log && console.log(this.logClass + '.handleDeleteAvatar()');
        
        event.preventDefault();
        event.stopPropagation();
        this.deleteAvatar();
    },

    handleUploadAvatar: function( event ) {
        log && console.log(this.logClass + '.handleUploadAvatar()');
        
        event.preventDefault();
        event.stopPropagation();
        this.displayAvatar();
        // this.uploadAvatar();
    },

    handleCancelUpload: function( event ) {
        log && console.log(this.logClass + '.handleCancelUpload()');
        
        event.preventDefault();
        event.stopPropagation();
        this.cancelUpload();
    },
    

    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
    changeAvatar: function() {
        log && console.log(this.logClass + '.changeAvatar()');
        
        $('.edit-avatar').fadeOut('fast', function() {
            $('.custom-file-upload').fadeIn();
        });
    },

    deleteAvatar: function() {
        log && console.log(this.logClass + '.deleteAvatar()');
        
        /* set the current pic to the placeholder */
        $('#avatar').attr('src', '/static/images/avatars/stevie.jpg');

        /* hide the delete button */
        $('#deleteAvi').hide();
    },

    displayAvatar: function() {
        log && console.log(this.logClass + '.displayAvatar()');
        
        var file = $('#uploadAvi').get(0).files[0];

        if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
                $('#avatar').attr('src', event.target.result);
            };
            reader.readAsDataURL(file);

            $('.custom-file-upload').hide();
            $('#deleteAvi, .edit-avatar').show();
        }
    },

    uploadAvatar: function() {
        log && console.log(this.logClass + '.uploadAvatar()');
        
        var file = $('#uploadAvi').get(0).files[0],
            name = file.name.replace(/ /g,'').replace(/[&\/\\#,+()$~%^'":*?<>{}]/g, ''),
            filename = "",
            formData = new FormData();

        if (name.length > 20) {
            filename = name.substring((name.length-20),name.length);
        } else {
            filename = name;
        }

        formData.append("filename", filename);
        formData.append("folder", "profile");
        formData.append("file", file);

        /* update input with file name */
        $('.custom-file-upload').addClass('filled')
                            .find('.file-custom')
                            .text(filename);

        $.ajax({
            method: 'POST',
            url: '/imageUpload/',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            context: this,
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                $('#avatar').attr('src', filename);
            },
            error: function(jqXHR, textStatus, errorThrown) {

            }
        });
    },

    cancelUpload: function() {
        log && console.log(this.logClass + '.cancelUpload()');

        $('#avatarURL').val('');
        $('.custom-file-upload').fadeOut('fast', function() {
            $('.edit-avatar').fadeIn();
        });
    },
};


$(document).ready(function() {
    admin.pages.profile.initialize();
});