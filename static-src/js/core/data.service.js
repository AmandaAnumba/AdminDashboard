'use strict';

var dataService = function($http, logger, loader) {
    var service = {
        sendRequest:sendRequest,
        loadComments:loadComments,
        moreComments:moreComments,
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