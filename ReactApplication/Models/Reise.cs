using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;

namespace WebApp_Oblig2.Model
{
    public class Reise
    {
        public int id { get; set; }
        public DateTime reiseDatoTid { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        public string ruteFra { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        public string ruteTil { get; set; }
        public bool dagsreise { get; set; }
        [RegularExpression(@"[0-9]{2,20}")]
        public int prisBarn { get; set; }
        [RegularExpression(@"[0-9]{2,20}")]
        public int prisVoksen { get; set; }
        [RegularExpression(@"[0-9]{2,20}")]
        public int prisLugarStandard { get; set; }
        [RegularExpression(@"[0-9]{2,20}")]
        public int prisLugarPremium { get; set; }
    }
}