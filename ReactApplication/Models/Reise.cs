using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;

namespace WebApp_Oblig2.Model
{
    public class Reise
    {
        public int ReiseId { get; set; }
        public DateTime ReiseDato { get; set; }
        public DateTime ReiseTid { get; set; }

        public int RuteId { get; set; }
        public string RuteFra { get; set; }
        public string RuteTil { get; set; }
        public bool Dagsreise { get; set; }

        public int PrisId { get; set; }
        public int PrisBarn { get; set; }
        public int PrisVoksen { get; set; }
        public int PrisLugarStandard { get; set; }
        public int PrisLugarPremium { get; set; }
    }
}