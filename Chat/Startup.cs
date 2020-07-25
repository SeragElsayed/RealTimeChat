using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chat.Data;
using Chat.Entities;
using Chat.Hubs;
using Chat.Repo;
using Chat.Repo.IManager;
using Chat.Repo.Manager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Chat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddControllersWithViews();
            services.AddSignalR();
            services.AddHttpContextAccessor();

            services.AddDbContext<ChatContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("ChatContextConnection")
                    )
                );

            services.AddIdentityCore<ChatUser>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;
                

            })
                .AddEntityFrameworkStores<ChatContext>()
                 .AddDefaultUI();

            //services.AddScoped<IHubContext<ChatHub>, ChatHub>();
            services.AddScoped<IMessageManager, MessageManager>();
            services.AddScoped<IConnectedUsersManager, ConnectedUsersManager>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                
                endpoints.MapRazorPages();
                endpoints.MapControllerRoute(
                 name: "default",
                 pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<ChatHub>("/chathub");

            });

            



        }
    }
}
