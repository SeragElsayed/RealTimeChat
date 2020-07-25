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
    let SenderId = document.getElementById("Sender").value;
    let ReceiverId = document.getElementById("Reciever").value;
    var Content = document.getElementById("messageInput").value;
    let Message = {
        SenderId: SenderId,
        ReceiverId: ReceiverId,
        Content: Content
    }
    console.log("new message", Message)
    axios({
        method: 'post',
        url: '/Msg/Post',
        data: Message
    })
     .then((response) => {
         console.log(response);
         document.getElementById("messageInput").value = "";
         let sentMessage=senderMessage(response.data.content)
         let messagelist = document.getElementById("messagesList")
         messagelist.appendChild(sentMessage)
    }, (error) => {
        console.log(error);
     });
    document.getElementById("messageInput").value = "";
    event.preventDefault();
});

//set reciever
document.getElementById("ContactList").addEventListener("click", function (event) {
    let Receiver = event.target;
    let RecieverIP = document.getElementById("Reciever").value
    RecieverIP.value = Receiver.attr("id");
    console.log(Receiver, RecieverIP)


});