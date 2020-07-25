using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat.Entities;
using Chat.Hubs;
using Chat.Repo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chat.Controllers
{
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _chatHubCTX;
        private readonly IMessageManager MessageManager;

        public MessagesController(IHubContext<ChatHub> chatHubCTX,IMessageManager _MsgManager)
        {
            _chatHubCTX = chatHubCTX;
            MessageManager = _MsgManager;
        }
        
        public IActionResult PostNewMessage(Message NewMessage )
        {
            return Ok();

        }
        public IActionResult GetOldMessages(string SenderId, string ReceiverId)
        {
            return Ok();

        }
    }
}
