using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat.Data;
using Chat.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{
    public class HomeController : Controller
    {
        ChatContext ChatContext;
        private readonly UserManager<ChatUser> UserManager;
        public HomeController(ChatContext _ChatContext, UserManager<ChatUser> _userManager)
        {
            ChatContext = _ChatContext;
            UserManager = _userManager;
        }
        [Authorize]
        public IActionResult Index()
        {
            var AllUsers = ChatContext.ChatUsers.ToList();
            var CurrentUserId = UserManager.GetUserId(User);
            //var CurrentUser = UserManager.GetUserName(User);
            ViewBag.AllUsers = AllUsers;
            ViewBag.CurrentUserId = CurrentUserId;
            return View();
        }
    }
}