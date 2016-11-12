'use strict';

var messages = function(logger) {
    var list = [],
        service = {
            add: add,
            all: all,
            get: get
        };
    
    _create();

    return service;


    /////////////////////


    function Message(data) {
        this.id = "";
        this.conversationId = "";
        this.user = "";
        this.avatar = "";
        this.date = "";
        this.message = "";
        
        if (data) {
            angular.extend(this, data);
        }
    }
    
    Message.prototype.constructor = Message; 

    Message.prototype = {
        delete: function() {
            logger.log('delete Message');
        },
        add: function() {
            logger.log('add Message');
        }
    };


    /* load the sample data */
    function _create() {
        logger.log('Message._create()');

        var data = [
            {
                id:"1", 
                conversationId:"1", 
                user:"Rebecca Abara", 
                avatar:"molly.png", 
                date:"5 minutes ago", 
                message:"I need helping editing this article...something with the wording in the 2nd paragraph. Help me take a look? I've highlighted the section I need you to look at."
            },
            {
                id:"2", 
                conversationId:"2", 
                user:"Shantaviae Wynn", 
                avatar:"helen.jpg", 
                date:"17 September, 2016", 
                message:"Can you help me review this article?"
            },
            {
                id:"3", 
                conversationId:"3", 
                user:"Omeko Eromosele", 
                avatar:"elyse.png", 
                date:"29 August, 2016", 
                message:"I'm having issues adding media to my article. HAALP!"
            },
            {
                id:"4", 
                conversationId:"4", 
                user:"Jasmine Jones", 
                avatar:"jenny.jpg", 
                date:"22 August, 2016", 
                message:"Just finished up my article for this weeks cycle. Do you have time to review it?"
            },
            {
                id:"5", 
                conversationId:"5", 
                user:"Naakie Nartey", 
                avatar:"kristy.png", 
                date:"22 August, 2016", 
                message:"Possible idea for next cycle: The Best of 2016"
            },
            {
                id:"6", 
                user:"Amanda Anumba", 
                avatar:"nan.jpg", 
                date:"22 August, 2016", 
                message:"Note to self: Finish 3 more articles for current cycle."
            }
        ];

        for (let i = 0; i < data.length; i++) {
            add(data[i]);
        }
    }

    function add( data ) {
        var newMsg = new Message(data);
        list.push(newMsg);
    }

    function all() {
        return list;
    }

    function get( id ) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === parseInt(id)) {
                return list[i];
            }
        }

        return null;
    }
};

module.exports = messages;