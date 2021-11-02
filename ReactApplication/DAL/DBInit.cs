using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using WebApp_Oblig2.DAL;

namespace ReactApplication.DAL
{
    [ExcludeFromCodeCoverage]
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetService<DB>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            //Oppretter admin user for logg inn med alle brukertillatelser.
            var adminUser = new Brukere();
            adminUser.Brukernavn = "admin";
            var passord = "admin";
            byte[] salt = BrukerRepository.LagSalt();
            byte[] hash = BrukerRepository.LagHash(passord, salt);
            adminUser.Salt = salt;
            adminUser.Passord = hash;

            context.Brukere.Add(adminUser);
            context.SaveChanges();
        }
    }
}