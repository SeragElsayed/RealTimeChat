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
window.addEventListener("load", () => {
    let ContactList = document.getElementById("ContactList");
    let defaultReceiver = ContactList.firstElementChild.firstElementChild;
    let defaultReceiverId = defaultReceiver.id;
    let RecieverIP = document.getElementById("Reciever")
    let SenderIP = document.getElementById("Sender")
    RecieverIP.value = defaultReceiverId

    axios.get(`/Msg/Get/${SenderIP.value}/${RecieverIP.value}`)
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
                    message = senderMessage(item)
                else
                    message = recieverMessage(item)

                messagelist.appendChild(message)
            })
        }, (error) => {
            console.log(error);
        });
})
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
const recieverMessage = function (message) {

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

connection.on("ReceiveMessage", function (message) {
   
    console.log( message,"recieve message response");
   // let isSentBySender = formatMessage(user, message);
    let messagelist = document.getElementById("messagesList")
    let newmessage;
     newmessage = recieverMessage(message);
     messagelist.appendChild(newmessage)
     console.log(newmessage);
});

connection.on("ChangeStatus", function (status, userId) {
    let userStatusById = document.getElementById(`status ${userId.toString()}`);
    userStatusById.textContent = "";
    userStatusById.textContent += status;
    console.log(status, userId, userStatusById, "changge status response")


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
         console.log(response,"send mesasgeg response ");
         document.getElementById("messageInput").value = "";
         let sentMessage=senderMessage(response.data)
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
    let RecieverIP = document.getElementById("Reciever")
    let SenderIP = document.getElementById("Sender")
    RecieverIP.value = Receiver.id.toString()
    console.log(SenderIP.value, RecieverIP.value)
    //Receiver.attr("id");
    axios.get(`/Msg/Get/${SenderIP.value}/${RecieverIP.value}`)
        .then((response) => {
            console.log(response);
            let SenderIP = document.getElementById("Sender")
            let message

            let messagelist = document.getElementById("messagesList")
            messagelist.innerHTML = ''
            console.log(response.data)
            if (response.data.length == 0) {
                messagelist.innerHTML="No Messages yet"
                return;
            }
            response.data.forEach((item, index) => {

                if (item.senderId == SenderIP.value)
                    message = senderMessage(item)
                else
                    message = recieverMessage(item)

                messagelist.appendChild(message)
            })
        }, (error) => {
            console.log(error);
        });

});