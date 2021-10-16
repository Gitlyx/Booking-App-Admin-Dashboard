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
        public int prisId { get; set; }

        public int prisBarn { get; set; }
        public int prisVoksen { get; set; }
        public int prisLugarStandard { get; set; }
        public int prisLugarPremium { get; set; }
    }

    public class Reise
    {
        [Key]
        public int reiseId { get; set; }

        public DateTime reiseDato { get; set; }
        public DateTime reiseTid { get; set; }
        virtual public BilletPris priser { get; set; }
        virtual public Rute ruter { get; set; }
    }

    public class Bruker
    {
        [Key]
        public int brukerId { get; set; }

        public string brukerNavn { get; set; }
        public string brukerPassord { get; set; }
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