'use strict';

var dataService = function($http, logger, loader) {
    var service = {
        sendRequest:sendRequest,
        loadComments:loadComments,
        moreComments:moreComments,
        loadMessages:loadMessages,
        moreMessages:moreMessages
    };

    return service;


    /////////////////////

    
    function sendRequest(url, data) {
        /* show the loading animation */
        loader.show();

        /* send ajax request */
        return $http.post(url, data)
            .then(requestComplete, requestFail)
            .catch(requestFail);

        function requestComplete(data, status, headers, config) {
            return data.data;
        }

        function requestFail() {
            loader.hide();
            logger.error('An error occured while processing your request. Please refresh the page and try again.', 'Error');
        }
    }

    function loadComments() {
        var comments = [
            {id:"1", user:"Rayna Kelly", article:"You Are Enough", comment:"Bacon ipsum dolor amet alcatra beef ribs tenderloin, pork short ribs eiusmod et capicola shankle swine pancetta pastrami. ", date:"28 May, 2015", status:"Pending", avatar:"ade.jpg"},
            {id:"2", user:"Alanna Davidson", article:"Credit Cards for Beginners", comment:"Ullamco in turkey leberkas id tempor swine in. Andouille pig kielbasa proident leberkas, turducken ", date:"16 June, 2015", status:"Pending", avatar:"jenny.jpg"},
            {id:"3", user:"Michael Greene", article:"You Are Enough", comment:"Excepteur laboris t-bone reprehenderit cow commodo venison drumstick short loin shankle.", date:"17 June, 2015", status:"Pending", avatar:"chris.jpg"},
            {id:"4", user:"Alanna Davidson", article:"Paying Homage: Shonda Rhimes", comment:"Ipsum cow esse pig anim doner ham hock minim jowl. Swine ut pork turkey aliqua ham hock.", date:"25 June, 2015", status:"Pending", avatar:"jenny.jpg"},
        ];

        return comments;
    }

    function moreComments() {
        var comment = {
            id:"5", 
            user:"Justin Clarke", 
            article:"Paying Homage: Shonda Rhimes", 
            comment:"In et incididunt, t-bone aute mollit beef eiusmod sint sunt. Lorem reprehenderit est ut bresaola, proident consequat cupidatat", 
            date:"2 July, 2015", 
            status:"Pending", 
            avatar:"justen.jpg"
        };

        return comment;
    }

    function loadMessages() {
        var msgs = [
            {id:"1", user:"Rebecca Abara", avatar:"molly.png", date:"5 minutes ago", message:"I need helping editing this article...something with the wording in the 2nd paragraph. Help me take a look? I've highlighted the section I need you to look at."},
            {id:"2", user:"Shantaviae Wynn", avatar:"helen.jpg", date:"17 September, 2016", message:"Can you help me review this article?"},
            {id:"3", user:"Omeko Eromosele", avatar:"elyse.png", date:"29 August, 2016", message:"I'm having issues adding media to my article. HAALP!"},
            {id:"4", user:"Jasmine Jones", avatar:"jenny.jpg", date:"22 August, 2016", message:"Just finished up my article for this weeks cycle. Do you have time to review it?"},
            {id:"5", user:"Naakie Nartey", avatar:"kristy.png", date:"22 August, 2016", message:"Possible idea for next cycle: The Best of 2016"},
            {id:"6", user:"Amanda Anumba", avatar:"nan.jpg", date:"22 August, 2016", message:"Note to self: Finish 3 more articles for current cycle."},
        ];

        return msgs;
    }

    function moreMessages() {
        var msg = {
            from: 'Rebecca Abara',
            sent: 'a few moments ago',
            message: "I need helping editing this article...something with the wording in the 2nd paragraph. Help me take a look? I've highlighted the section I need you to look at.",
            article: "<a href='#'>Through the Wire</a>."
        };

        return msg;
    }
};

module.exports = dataService;