using Chat.Data;
using Chat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Repo.Manager
{
    public class MessageManager:IMessageManager
    {
        ChatContext DB;
        public MessageManager(ChatContext db)
        {
            DB = db;
        }
        public bool AddNewMessage(Message NewMessage)
        {
            DB.Messages.Add(NewMessage);
            DB.SaveChanges();
            return true;
        } 
        public IEnumerable<Message> GetMessagesByUserId(string UserId)
        {
            var Messages = DB.Messages
                            .Where<Message>(m => (m.SenderId == UserId) || (m.ReceiverId == UserId))
                             .OrderBy(me => me.TimeStamp);
            return Messages;
        }
    }
}
