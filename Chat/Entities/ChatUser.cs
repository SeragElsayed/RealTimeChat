using Chat.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Entities
{
    public class ChatUser:IdentityUser
    {
        public ChatUser() : base()
        {

        }
        public ChatUser(string UserName) : base(UserName)
        {

        }
        public ChatUserStatus Status { get; set; } = ChatUserStatus.Offline;

        public virtual ICollection<Message> Messages { get; set; } = new HashSet<Message>();


    }
}
