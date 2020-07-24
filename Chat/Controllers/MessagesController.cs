using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat.Entities;
using Chat.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chat.Controllers
{
    public class MessagesController : Controller
    {
        private readonly IHubContext<ChatHub> _chatHubCTX;
        public MessagesController(IHubContext<ChatHub> chatHubCTX)
        {
            _chatHubCTX = chatHubCTX;
        }
        // GET: /<controller>/
        public IActionResult PostNewMessage(Message NewMessage )
        {
            

            return View();
        }
        public IActionResult GetOldMessages(string SenderId, string ReceiverId)
        {

            return View();
        }
    }
}
