using Chat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Repo
{
    public interface IMessageManager
    {
        public bool AddNewMessage(Message NewMessage);

        public IEnumerable<Message> GetMessagesByUsersId(string SenderId, string ReceiverId);

    }
}
