using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Entities
{
    public class Message
    {
        public int MessageId { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime TimeStamp { get; set; } = DateTime.Now;

        [ForeignKey("ChatUser")]
        [Required]
        public string SenderId { get; set; }

        [ForeignKey("ChatUser")]
        [Required]
        public string ReceiverId { get; set; }

        //[ForeignKey("ChatUser")]
        //public string UserId { get; set; }
        //public virtual ChatUser ChatUser { get; set; }
    }

}
