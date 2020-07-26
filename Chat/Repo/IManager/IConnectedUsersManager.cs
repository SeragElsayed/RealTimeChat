using Chat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Repo.IManager
{
    public interface IConnectedUsersManager
    {
        bool AddNewConnectedUser(ConnectedUsers NewUser);


        bool DeleteConnectedUser(ConnectedUsers CurrentConnectedUser);


    }
}
