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
        public IEnumerable<Message> GetMessagesByUsersId(string SenderId,string ReceiverId)
        {
            var Messages = DB.Messages
                            .Where<Message>(
                                m =>( 
                                ((m.SenderId == SenderId) && (m.ReceiverId == ReceiverId)) || 
                                ((m.SenderId == ReceiverId) && (m.ReceiverId == SenderId))
                                ))
                             .OrderBy(me => me.TimeStamp);
            return Messages;
        }
    }
}
