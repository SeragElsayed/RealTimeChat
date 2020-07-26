"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

const elementsAttriuttes = {
    incoming_msg: "incoming_msg",
    outgoing_msg: "outgoing_msg",
    received_msg: "received_msg",
    sent_msg: "sent_msg",
    received_withd_msg:"received_withd_msg",
    time_date:"time_date"
}
//sender message
const formatSenderMessage = function (message) {

    let outerdiv = document.createElement("div");
    let outerdivclass = document.createAttribute("class");
    outerdivclass.value = elementsAttriuttes.outgoing_msg;
    outerdiv.setAttributeNode(outerdivclass);

    let innerdiv = document.createElement("div");
    let innerdivclass = document.createAttribute("class");
    innerdivclass.value = elementsAttriuttes.sent_msg;
    innerdiv.setAttributeNode(innerdivclass);

    let messagetext = document.createElement("p");
    messagetext.textContent += message.content;

    let timedate = document.createElement("span");
    let timedateclass = document.createAttribute("class");
    timedateclass.value = elementsAttriuttes.time_date;
    timedate.setAttributeNode(timedateclass);
    timedate.textContent += message.timeStamp;


    innerdiv.appendChild(messagetext);
    innerdiv.appendChild(timedate)
    outerdiv.appendChild(innerdiv);
    console.log(outerdiv);

    return outerdiv;
}

//reciever message
const formatRecieverMessage = function (message) {

    let outerdiv = document.createElement("div");
    let outerdivclass = document.createAttribute("class");
    outerdivclass.value = elementsAttriuttes.incoming_msg;
    outerdiv.setAttributeNode(outerdivclass);

    let innerdiv = document.createElement("div");
    let innerdivclass = document.createAttribute("class");
    innerdivclass.value = elementsAttriuttes.received_msg;
    innerdiv.setAttributeNode(innerdivclass);

    let innerinnerdiv = document.createElement("div");
    let innerinnerdivclass = document.createAttribute("class");
    innerinnerdivclass.value = elementsAttriuttes.received_withd_msg;
    innerinnerdiv.setAttributeNode(innerinnerdivclass);

    let messagetext = document.createElement("p");
    messagetext.textContent += message.content;


    let timedate = document.createElement("span");
    let timedateclass = document.createAttribute("class");
    timedateclass.value = elementsAttriuttes.time_date;
    timedate.setAttributeNode(timedateclass);
    timedate.textContent += message.timeStamp;


    innerinnerdiv.appendChild(messagetext);
    innerinnerdiv.appendChild(timedate);
    innerdiv.appendChild(innerinnerdiv);
    outerdiv.appendChild(innerdiv);

    console.log(outerdiv)

    return outerdiv;
}
const Loading_1_1_messages = function (senderId, receiverId) {
    axios.get(`/Msg/Get/${senderId}/${receiverId}`)
        .then((response) => {
            console.log(response);
            let SenderIP = document.getElementById("Sender")
            let message

            let messagelist = document.getElementById("messagesList")
            messagelist.innerHTML = ''
            console.log(response.data)
            if (response.data.length == 0) {
                messagelist.innerHTML = "No Messages yet"
                return;
            }
            response.data.forEach((item, index) => {

                if (item.senderId == SenderIP.value)
                    message = formatSenderMessage(item)
                else
                    message = formatRecieverMessage(item)

                messagelist.appendChild(message)
            })
        }, (error) => {
            console.log(error);
        });
}
const sendMessage = function (Message) {
    axios({
        method: 'post',
        url: '/Msg/Post',
        data: Message
    })
        .then((response) => {
            console.log(response, "send mesasgeg response ");
            document.getElementById("messageInput").value = "";
            let sentMessage = formatSenderMessage(response.data)
            let messagelist = document.getElementById("messagesList")
            messagelist.appendChild(sentMessage)
        }, (error) => {
            console.log(error);
        });
}
const LoadingMessagesFirstTime = function () {
    
        let ContactList = document.getElementById("ContactList");
        let defaultReceiver = ContactList.firstElementChild.firstElementChild;
        let defaultReceiverId = defaultReceiver.id;
        let RecieverIP = document.getElementById("Reciever")
        let SenderIP = document.getElementById("Sender")
        RecieverIP.value = defaultReceiverId

    Loading_1_1_messages(SenderIP.value, RecieverIP.value)

    
}
window.addEventListener("load", LoadingMessagesFirstTime)

//new messagge rec.
const ReceiveMessage = function (message) {

    console.log(message, "recieve message response");
    // let isSentBySender = formatMessage(user, message);
    let messagelist = document.getElementById("messagesList")
    let newmessage;
    newmessage = formatRecieverMessage(message);
    messagelist.appendChild(newmessage)
    console.log(newmessage);
}

connection.on("ReceiveMessage", ReceiveMessage);

const IsTyping = function (personSendingId, IsTyping) {

    console.log(message, "recieve message response");
    // let isSentBySender = formatMessage(user, message);
    let ReceiverId = document.getElementById("Reciever").value;
    let isChatoxOpen = (ReceiverId == personSendingId)
    if (isChatoxOpen == false)
        return;
    let messagelist = document.getElementById("messagesList")
    //dependin on istyping add or remove istyping indicator from mess.list

}

connection.on("IsTyping", IsTyping);

//some user status changed
const ChangeStatus = function (status, userId) {
    let userStatusById = document.getElementById(`status ${userId.toString()}`);
    userStatusById.textContent = "";
    userStatusById.textContent += status;

}
connection.on("ChangeStatus", ChangeStatus );

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

const onClickSendButton = function (event) {
    let SenderId = document.getElementById("Sender").value;
    let ReceiverId = document.getElementById("Reciever").value;
    var Content = document.getElementById("messageInput").value;
    let Message = {
        SenderId: SenderId,
        ReceiverId: ReceiverId,
        Content: Content
    }
    console.log("new message", Message)
    sendMessage(Message);
    document.getElementById("messageInput").value = "";
    event.preventDefault();
}
document.getElementById("sendButton").addEventListener("click", onClickSendButton );

const onClickContact = function (event) {
    let Receiver = event.target;
    let RecieverIP = document.getElementById("Reciever")
    let SenderIP = document.getElementById("Sender")
    RecieverIP.value = Receiver.id.toString()
    console.log(SenderIP.value, RecieverIP.value)
    //Receiver.attr("id");
    Loading_1_1_messages(SenderIP.value, RecieverIP.value)

}
//set reciever
document.getElementById("ContactList").addEventListener("click", onClickContact);

