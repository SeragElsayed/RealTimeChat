﻿using System;
using Chat.Data;
using Chat.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(Chat.Areas.Identity.IdentityHostingStartup))]
namespace Chat.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<ChatContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("ChatContextConnection")));

                services.AddDefaultIdentity<ChatUser>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddEntityFrameworkStores<ChatContext>();
            });
        }
    }
}