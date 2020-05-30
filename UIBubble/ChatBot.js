var self = this;

function loadChatbot(container, idofchatbot, callback, options) {
    options = typeof options !== "undefined" ? options : {};
    let placeholer = options.placeholer || "Type your message";
    var chatbox = document.createElement("div");
    var chatboxHeader = document.createElement("div");
    chatbox.appendChild(chatboxHeader);
    var chatboxContainer = document.createElement("section");
    chatboxContainer.setAttribute("id", "chatboxContainer");
    chatboxContainer.classList.add("chaboxcontainer");
    chatbox.appendChild(chatboxContainer);
    chatbox.className = "chatbox";
    var chatboxInput = document.createElement("textarea");
    chatboxInput.setAttribute("id", "chatInputText");
    chatboxInput.setAttribute("placeholder", placeholer);
    chatboxInput.setAttribute("rows", 2);
    chatboxInput.className = "chat-input";
    chatbox.appendChild(chatboxInput);
    chatbox.setAttribute("id", idofchatbot);
    document.getElementById(container).appendChild(chatbox);
    addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {
            let userMessage = event.srcElement.value;
            if (userMessage.trim() !== "") {
                addUserMessage(userMessage);
                //addSystemMessage();
                event.srcElement.value = "";
                callback(userMessage);
            }
        }
    });
    return self;
    //chatboxInput.focus();
}

function addUserMessage(userMessage) {
    var parent = addUserMessageWrapper();
    var bubbleContent = document.createElement("span");
    bubbleContent.innerHTML = userMessage;
    parent.appendChild(bubbleContent);
    addWaitingMessage();
}

function addSystemMessage(message) {
    switch (message.type) {
        case "text":
            addTextMessage(message);
            break;
        case "buttons":
            addButtonsMessage(message);
            break;
        case "quickreplys":
            addQuickReplyMessage(message);
            break;
        case "list":
            addListMessage(message);
            break;
        case "details":
            addDetailsMessage(message);
            break;
    }
}

function addSystemMessageWrapper(id) {
    idpassed = typeof id !== "undefined" ? true : false;
    var wholeMessage = document.createElement("div");
    if (idpassed) {
        wholeMessage.setAttribute("id", id);
    }
    var avatar = document.createElement("img");
    var loc = location.pathname + "../media/bot.png";
    avatar.setAttribute("src", "../media/bot.png");
    avatar.className = "avatar left";
    wholeMessage.appendChild(avatar);
    var bubble = document.createElement("div");
    bubble.className = "systemMessage left";
    wholeMessage.appendChild(bubble);
    document.getElementById("chatboxContainer").appendChild(wholeMessage);
    var gap = document.createElement("div");
    gap.className = "clear";
    document.getElementById("chatboxContainer").appendChild(gap);
    return bubble;
}

function addUserMessageWrapper() {
    var avatar = document.createElement("img");
    avatar.setAttribute("src", "../media/user.png");
    avatar.className = "avatar right";
    document.getElementById("chatboxContainer").appendChild(avatar);
    var bubble = document.createElement("div");
    bubble.className = "userMessage right";
    document.getElementById("chatboxContainer").appendChild(bubble);
    var gap = document.createElement("div");
    gap.className = "clear";
    document.getElementById("chatboxContainer").appendChild(gap);
    return bubble;
}

function addTextMessage(message) {
    var parent = addSystemMessageWrapper();
    removeWaitingMessage();
    var bubbleContent = document.createElement("span");
    bubbleContent.innerHTML = message.text;
    parent.appendChild(bubbleContent);
    parent.scrollIntoView();
}

function quickReplyOnClick(title, value) {
    addUserMessage(title);

}

function addQuickReplyMessage(message) {
    var parent = addSystemMessageWrapper();
    removeWaitingMessage();
    var buttonGroup = document.createElement("div");
    if (message.text !== "" && message.text !== undefined) {
        let headertext = document.createElement("span");
        headertext.innerHTML = message.text;
        buttonGroup.appendChild(headertext);
        buttonGroup.appendChild(document.createElement("br"));
    }
    message.quickreplys.forEach(eachquickreply => {
        var button = document.createElement("BUTTON");
        var text = document.createTextNode(eachquickreply.title);
        var methodName = "quickReplyOnClick('" +
            eachquickreply.title +
            "','" +
            eachquickreply.value +
            "')";
        button.setAttribute("onclick", methodName);
        button.appendChild(text);
        button.className = "quickreplys";
        buttonGroup.appendChild(button);
    });
    parent.appendChild(buttonGroup);
    parent.scrollIntoView();
}

function buttonOnClick(title, value, type) {
    if (type === "postback") {
        addUserMessage(title);
    } else if (type === "submit") {
        addUserMessage(value);
    } else {
        addUserMessage(title);
    }

}

function addButtonsMessage(message) {
    var parent = addSystemMessageWrapper();
    removeWaitingMessage();
    var buttonGroup = document.createElement("div");
    if (message.text !== "" && message.text !== undefined) {
        let headertext = document.createElement("span");
        headertext.innerHTML = message.text;
        buttonGroup.appendChild(headertext);
        buttonGroup.appendChild(document.createElement("br"));
    }
    message.buttons.forEach(eachbutton => {
        var button = document.createElement("BUTTON");
        var text = document.createTextNode(eachbutton.title);
        var methodName = "buttonOnClick('" +
            eachbutton.title +
            "','" +
            eachbutton.value +
            "','" +
            eachbutton.type +
            "')";
        button.setAttribute("onclick", methodName);
        button.appendChild(text);
        button.className = "buttons";
        buttonGroup.appendChild(button);
        buttonGroup.appendChild(document.createElement("br"))
    });
    parent.appendChild(buttonGroup);
    parent.scrollIntoView();
}

function addListMessage(message) {
    var parent = addSystemMessageWrapper();
    removeWaitingMessage();
    var listHolder = document.createElement("div");
    listHolder.className = "list";
    message.list.forEach(line => {
        let heading = document.createElement("span");
        heading.innerHTML = line.heading;
        heading.className = "heading";
        let headingmetric = document.createElement("span");
        headingmetric.innerHTML = line.headingMetric;
        headingmetric.className = "headingmetric";
        listHolder.appendChild(heading);
        listHolder.appendChild(headingmetric);
        listHolder.appendChild(document.createElement("br"));
        var subheading = document.createElement("span");
        subheading.innerHTML = line.subheading;
        subheading.className = "subheading";
        var subheadingmetric = document.createElement("span");
        subheadingmetric.innerHTML = line.subheadingMetric;
        subheadingmetric.className = "subheadingMetric";
        listHolder.appendChild(subheading);
        listHolder.appendChild(subheadingmetric);
        listHolder.appendChild(document.createElement("br"));
        listHolder.appendChild(document.createElement("br"));
    });
    parent.appendChild(listHolder);
    parent.scrollIntoView();
}

function addDetailsMessage(message) {
    var parent = addSystemMessageWrapper();
    removeWaitingMessage();
    var detailsHolder = document.createElement("div");
    detailsHolder.className = "details";
    message.details.forEach(eachdetail => {
        var label = document.createElement("span");
        label.innerHTML = eachdetail.label;
        label.className = "label";
        var labelValue = document.createElement("span");
        labelValue.innerHTML = eachdetail.value;
        labelValue.className = "labelValue";
        detailsHolder.appendChild(label);
        detailsHolder.appendChild(labelValue);
        detailsHolder.appendChild(document.createElement("br"));
    });
    parent.appendChild(detailsHolder);
    parent.scrollIntoView();
}


function addWaitingMessage() {
    let parent = addSystemMessageWrapper("waitingspinner");
    var waitingSpinner = document.createElement("div");
    var spinner1 = document.createElement("div");
    spinner1.className = "bounce1";
    var spinner2 = document.createElement("div");
    spinner2.className = "bounce2";
    var spinner3 = document.createElement("div");
    spinner3.className = "bounce3";
    waitingSpinner.appendChild(spinner1);
    waitingSpinner.appendChild(spinner2);
    waitingSpinner.appendChild(spinner3);
    waitingSpinner.className = "spinner"
    parent.appendChild(waitingSpinner);
    parent.scrollIntoView();
}

function removeWaitingMessage(parent) {
    document.getElementById("chatboxContainer")
        .removeChild(document.getElementById("waitingspinner"));
}