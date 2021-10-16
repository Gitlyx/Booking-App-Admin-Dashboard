using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;

namespace WebApp_Oblig2.Model
{
    public class Reise
    {
        public int reiseId { get; set; }
        public DateTime reiseDato { get; set; }
        public DateTime reiseTid { get; set; }

        public int ruteId { get; set; }
        public string ruteFra { get; set; }
        public string ruteTil { get; set; }
        public bool dagsreise { get; set; }

        public int prisId { get; set; }
        public int prisBarn { get; set; }
        public int prisVoksen { get; set; }
        public int prisLugarStandard { get; set; }
        public int prisLugarPremium { get; set; }
    }
}