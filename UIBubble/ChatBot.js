function loadChatbot(container, self, options) {
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
    chatbox.setAttribute("id", self);
    document.getElementById(container).appendChild(chatbox);
    addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {
            let userMessage = event.srcElement.value;
            if (userMessage.trim() !== "") {
                addUserMessage(userMessage);
                addSystemMessage();
                event.srcElement.value = "";
            }
        }
    });

    //chatboxInput.focus();
}

function addUserMessage(userMessage) {
    this.addTextMessage(userMessage, "user");
}

function addSystemMessage() {
    var k = setTimeout(this.addTextMessage("Hey", "system"), 3000);
}

function addSystemMessageWrapper(id) {
    idpassed = typeof id !== "undefined" ? true : false;
    var wholeMessage = document.createElement("div");
    if (idpassed) {
        wholeMessage.setAttribute("id", id);
    }
    var avatar = document.createElement("img");
    avatar.setAttribute("src", "bot.png");
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
    avatar.setAttribute("src", "user.png");
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

function addTextMessage(text, who) {
    if (who === "system") {
        var parent = addSystemMessageWrapper();
        removeWaitingMessage();
    } else {
        var parent = addUserMessageWrapper();
        addWaitingMessage();
    }
    var bubbleContent = document.createElement("span");
    bubbleContent.innerHTML = "Hey";
    parent.appendChild(bubbleContent);
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