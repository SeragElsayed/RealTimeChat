using Chat.Data;
using Chat.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Chat.Hubs
{
    public class ChatHub:Hub
    {
        ChatContext ChatContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ChatHub(ChatContext _ChatContext, IHttpContextAccessor httpContextAccessor)
        {
            ChatContext = _ChatContext;
            _httpContextAccessor = httpContextAccessor;
        }
        //[HubMethodName("sendMessage")]
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task SendPrivateMessage(Message message)
        {

            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public override Task OnConnectedAsync()
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var CurrentConnectionId = Context.ConnectionId;
            ChatContext.ConnectedUsers.AddAsync(new ConnectedUsers() { UserId=CurrentUserId,ConnectionId=CurrentConnectionId});
            ChatContext.SaveChanges();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var CurrentConnectionId = Context.ConnectionId;
            var CurrentConnectedUser = ChatContext.ConnectedUsers.FirstOrDefault(u => (u.ConnectionId == CurrentConnectionId) && (u.UserId==CurrentUserId));
            ChatContext.ConnectedUsers.Remove(CurrentConnectedUser);
            ChatContext.SaveChanges();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
