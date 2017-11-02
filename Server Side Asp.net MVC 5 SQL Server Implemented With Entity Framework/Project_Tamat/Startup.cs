using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Project_Tamat.Startup))]
namespace Project_Tamat
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
