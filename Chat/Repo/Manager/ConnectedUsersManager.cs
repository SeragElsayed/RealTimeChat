using Chat.Data;
using Chat.Entities;
using Chat.Repo.IManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Repo.Manager
{
    public class ConnectedUsersManager:IConnectedUsersManager
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
        public bool DeleteConnectedUser(ConnectedUsers CurrentConnectedUser)
        {
            DB.ConnectedUsers.Remove(CurrentConnectedUser);
            DB.SaveChanges();
            return true;
        }

    }
}
