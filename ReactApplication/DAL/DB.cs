using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace WebApp_Oblig2.DAL
{

    public class Rute
    {
        [Key]
        public int ruteId { get; set; }

        public string ruteFra { get; set; }
        public string ruteTil { get; set; }
        public bool dagsreise { get; set; }
    }
    [ExcludeFromCodeCoverage]
    public class Reise
    {
        [Key]
        public int ReiseId { get; set; }

        public virtual Rute RuteId { get; set; }
        public DateTime ReiseDatoTid { get; set; }
        public int PrisBarn { get; set; }
        public int PrisVoksen { get; set; }
        public int PrisLugarStandard { get; set; }
        public int PrisLugarPremium { get; set; }
    }
    [ExcludeFromCodeCoverage]
    public class Brukere
    {
        [Key]
        public int BrukerId { get; set; }

        public string Brukernavn { get; set; }
        public byte[] Passord { get; set; }
        public byte[] Salt { get; set; }
    }
    [ExcludeFromCodeCoverage]
    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Brukere> Brukere { get; set; }
        public DbSet<Reise> Reiser { get; set; }
        public DbSet<Rute> Ruter { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            optionBuilder.UseLazyLoadingProxies();
        }
    }
}