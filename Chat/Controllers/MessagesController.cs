using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Chat.Entities;
using Chat.Hubs;
using Chat.Repo;
using Microsoft.AspNetCore.Http;
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
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessagesController(IHubContext<ChatHub> chatHubCTX,
                                    IMessageManager _MsgManager,
                                    IHttpContextAccessor httpContextAccessor)
        {
            _chatHubCTX = chatHubCTX;
            MessageManager = _MsgManager;
        }
        [Route("Msg/Post")]
        [HttpPost]
        public IActionResult PostNewMessage([FromBody]Message NewMessage )
        {
            if (ModelState.IsValid == false)
                return BadRequest();

           var isSavedInDB= MessageManager.AddNewMessage(NewMessage);

            if (isSavedInDB == false)
                return BadRequest();

            //sending messagge to reciver using chathub
            _chatHubCTX.Clients.User(NewMessage.ReceiverId).SendAsync("ReceiveMessage", NewMessage);
            
            return Ok(NewMessage);

        }

        [Route("Msg/Get/{SenderId}/{ReceiverId}")]
        [HttpGet]
        public IActionResult GetOldMessages([FromRoute]string SenderId,[FromRoute]string ReceiverId)
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
           
            if (CurrentUserId != SenderId)
                return Unauthorized();

            var messages = MessageManager.GetMessagesByUsersId(SenderId, ReceiverId);

            return Ok(messages);

        }
    }
}
