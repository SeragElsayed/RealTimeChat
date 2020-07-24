using Chat.Data;
using Chat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Repo.Manager
{
    public class ConnectedUsersManager
    {
        ChatContext DB;
        public ConnectedUsersManager(ChatContext db)
        {
            DB = db;
        }
        public bool AddNewConnectedUser(ConnectedUsers NewUser)
        {
            DB.ConnectedUsers.Add(NewUser);
            DB.SaveChanges();
            return true;
        }
        public bool DeleteConnectedUserByUserConnectionId(string UserId,string ConnectionId)
        {
            var CurrentConnectedUser = DB.ConnectedUsers.FirstOrDefault(u => (u.ConnectionId == ConnectionId) && (u.UserId == UserId));
            DB.ConnectedUsers.Remove(CurrentConnectedUser);
            DB.SaveChanges();
            return true;
        }

    }
}
