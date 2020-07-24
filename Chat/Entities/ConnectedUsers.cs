using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Entities
{
    public class ConnectedUsers
    {
        public int ConnectedUsersId { get; set; }
        public string UserId { get; set; }
        public string ConnectionId { get; set; }
    }
}
