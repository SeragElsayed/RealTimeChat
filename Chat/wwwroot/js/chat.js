"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

const elementsAttriuttes = {
    incomingMessage: "incoming_msg",
    outgoingMessage: "outgoing_msg",
    recMessage: "received_msg",
    sentMessage: "sent_msg",
    timeDate:"time_date"
}

//format message
const formatMessage = function (user, message) {
    let senderId = document.getElementById("Sender").value;
    let isSentBySender = (user === senderId);
    return isSentBySender;
   

}
//sender message
const senderMessage = function (message) {

    let outerdiv = document.createElement("div");
    let outerdivclass = document.createAttribute("class");
    outerdivclass.value = elementsAttriuttes.outgoingMessage;
    outerdiv.setAttributeNode(outerdivclass);

    let innerdiv = document.createElement("div");
    let innerdivclass = document.createAttribute("class");
    innerdivclass.value = elementsAttriuttes.sentMessage;
    innerdiv.setAttributeNode(innerdivclass);

    let messagetext = document.createElement("p");
    messagetext.textContent += message; 

    let timedate = document.createElement("span");
    let timedateclass = document.createAttribute("class");
    timedateclass.value = elementsAttriuttes.timeDate;
    timedate.setAttributeNode(timedateclass);

    innerdiv.appendChild(messagetext);
    innerdiv.appendChild(timedate)
    outerdiv.appendChild(innerdiv);

    return outerdiv;
}

//reciever message
const recieverMessage = function (message) {

    let outerdiv = document.createElement("div");
    let outerdivclass = document.createAttribute("class");
    outerdivclass.value = elementsAttriuttes.incomingMessage;
    outerdiv.setAttributeNode(outerdivclass);

    let innerdiv = document.createElement("div");
    let innerdivclass = document.createAttribute("class");
    innerdivclass.value = elementsAttriuttes.recMessage;
    innerdiv.setAttributeNode(innerdivclass);

    let messagetext = document.createElement("p");
    messagetext.textContent += message; 


    let timedate = document.createElement("span");
    let timedateclass = document.createAttribute("class");
    timedateclass.value = elementsAttriuttes.timeDate;
    timedate.setAttributeNode(timedateclass);

    innerdiv.appendChild(messagetext);
    innerdiv.appendChild(timedate)
    outerdiv.appendChild(innerdiv);

    return outerdiv;
}

connection.on("ReceiveMessage", function (user, message) {
   
    console.log(user, message);
    let isSentBySender = formatMessage(user, message);
    let messagelist = document.getElementById("messagesList")
    let newmessage;
    console.log(user, message, newmessage, isSentBySender);

    if (isSentBySender) {
        console.log(newmessage,"ffffffffffff");

        newmessage = senderMessage(message);
        messagelist.appendChild(newmessage)
        console.log( newmessage);

    } else {
        newmessage = recieverMessage(message);
        messagelist.appendChild(newmessage)
        console.log(newmessage);

    }
    console.log(user, message, newmessage, isSentBySender);

});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("Sender").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("messageInput").value = "";
    event.preventDefault();
});

//set reciever
document.getElementById("ContactList").addEventListener("click", function (event) {
    var user = event.target;
    console.log(user)
    document.getElementById("Reciever").value = user.attr("id");

});