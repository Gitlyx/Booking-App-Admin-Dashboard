using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

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

    public class BilletPris
    {
        [Key]
        public int PrisId { get; set; }

        public int PrisBarn { get; set; }
        public int PrisVoksen { get; set; }
        public int PrisLugarStandard { get; set; }
        public int PrisLugarPremium { get; set; }
    }

    public class Reise
    {
        [Key]
        public int ReiseId { get; set; }

        public DateTime ReiseDato { get; set; }
        public DateTime ReiseTid { get; set; }
        virtual public BilletPris Priser { get; set; }
        virtual public Rute Ruter { get; set; }
    }

    public class Bruker
    {
        [Key]
        public int BrukerId { get; set; }

        public string BrukerPassord { get; set; }
        public string BrukerNavn { get; set; }
    }

    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Bruker> Bruker { get; set; }
        public DbSet<Reise> Reiser { get; set; }
        public DbSet<Rute> Ruter { get; set; }
        public DbSet<BilletPris> Priser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            optionBuilder.UseLazyLoadingProxies();
        }
    }
}