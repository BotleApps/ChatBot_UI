var chatbotInstance = new loadChatbot(
    "chatbox", //give ID of the chatbot div.
    "chatbot",
    getUserInput, {} // ...instance name
);

function getUserInput(userMessage) {
    switch (userMessage) {
        case "text":
            chatbotInstance.addSystemMessage({
                "type": "text",
                "text": userMessage
            });
            break;
        case "buttons":
            chatbotInstance.addSystemMessage({
                "type": "buttons",
                "text": "Here are some buttons for example",
                "buttons": [{
                        "title": "Button 1",
                        "value": "button value",
                        "type": "postback"
                    },
                    {
                        "title": "Button 2",
                        "value": "button value",
                        "type": "url"
                    }, {
                        "title": "Button 3",
                        "value": "button value",
                        "type": "telephone"
                    },
                    {
                        "title": "Button 4",
                        "value": "button value",
                        "type": "email"
                    }, {
                        "title": "Button 5",
                        "value": "button value",
                        "type": "submit"
                    }
                ]
            });
            break;
        case "quickreplys":
            chatbotInstance.addSystemMessage({
                "type": "quickreplys",
                "quickreplys": [{
                        "title": "Button 1",
                        "value": "button value"

                    },
                    {
                        "title": "Button 2",
                        "value": "button value"

                    }
                ]
            });
            break;
        case "list":
            chatbotInstance.addSystemMessage({
                "type": "list",
                "text": "This is list title",
                "list": [{
                        "heading": "This is heading",
                        "subheading": "this is sub heading apparently can have two lines",
                        "headingMetric": "This",
                        "subheadingMetric": "that",
                        "buttons": [{
                            "title": "Button 1",
                            "value": "button value",
                            "type": "submit"
                        }]
                    }, {
                        "heading": "This is heading",
                        "subheading": "this is sub heading apparently can have two lines",
                        "headingMetric": "This",
                        "subheadingMetric": "that",
                        "buttons": [{
                            "title": "Button 1",
                            "value": "button value",
                            "type": "submit"
                        }]
                    },
                    {
                        "heading": "This is heading",
                        "subheading": "this is sub heading apparently can have two lines",
                        "headingMetric": "This",
                        "subheadingMetric": "that",
                        "buttons": [{
                            "title": "Button 1",
                            "value": "button value",
                            "type": "submit"
                        }]
                    },
                ]
            });
            break;
        case "details":
            chatbotInstance.addSystemMessage({
                "type": "details",
                "text": "This is list title",
                "details": [{
                        "label": "Line 1",
                        "value": "This is value"
                    },
                    {
                        "label": "Line 2",
                        "value": "Val 2"
                    },
                    {
                        "label": "Line 3",
                        "value": "Val 3"
                    },
                    {
                        "label": "Line 4",
                        "value": "Val 4"
                    },
                    {
                        "label": "Line 5 ",
                        "value": " val 5"
                    }
                ]
            });
            break;
        default:

            break;
    }
}