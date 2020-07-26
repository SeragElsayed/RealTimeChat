using Chat.Data;
using Chat.Entities;
using Chat.Models;
using Chat.Repo.IManager;
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
        IConnectedUsersManager ConnectedUserManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ChatHub(ChatContext _ChatContext, 
                        IHttpContextAccessor httpContextAccessor,
                        IConnectedUsersManager _ConnectedUserManager)
        {
            ChatContext = _ChatContext;
            _httpContextAccessor = httpContextAccessor;
            ConnectedUserManager = _ConnectedUserManager;
        }
        
        
        public void IsTyping(string SenderId,string ReceiverId,bool IsTyping)
        {
            Clients.User(ReceiverId).SendAsync("IsTyping",SenderId,IsTyping);

        }
        public override Task OnConnectedAsync()
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var CurrentConnectionId = Context.ConnectionId;

            var NewConnectedUser = new ConnectedUsers() { UserId = CurrentUserId, ConnectionId = CurrentConnectionId };
            
            ConnectedUserManager.AddNewConnectedUser(NewConnectedUser);
            
            Clients.All.SendAsync("ChangeStatus", ChatUserStatus.Online.ToString(), CurrentUserId);
           
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var CurrentConnectionId = Context.ConnectionId;
            var CurrentConnectedUser = ChatContext.ConnectedUsers.FirstOrDefault(u => (u.ConnectionId == CurrentConnectionId) && (u.UserId==CurrentUserId));
            
            ConnectedUserManager.DeleteConnectedUser(CurrentConnectedUser);

            Clients.All.SendAsync("ChangeStatus", ChatUserStatus.Offline.ToString(), CurrentUserId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
