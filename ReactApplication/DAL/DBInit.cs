using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using WebApp_Oblig2.DAL;

namespace ReactApplication.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetService<DB>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            //Oppretter admin user for logg inn med alle brukertillatelser.
            var adminUser = new Bruker
            {
                BrukerNavn = "admin",
                BrukerPassord = "admin",
            };

            context.Add(adminUser);
            context.SaveChanges();
        }
    }
}