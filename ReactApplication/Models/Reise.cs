using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;

namespace WebApp_Oblig2.Model
{
    public class ReiseMod
    {
        public int id { get; set; }

        [Required]
        public DateTime reiseDatoTid { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        [Required]
        public string ruteFra { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]

        [Required]
        public string ruteTil { get; set; }

        [Required]
        public bool dagsreise { get; set; }

        [RegularExpression(@"[0-9]{1,20}")]
        [Required]
        public int prisBarn { get; set; }

        [RegularExpression(@"[0-9]{1,20}")]
        [Required]
        public int prisVoksen { get; set; }

        [RegularExpression(@"[0-9]{1,20}")]
        [Required]
        public int prisLugarStandard { get; set; }

        [RegularExpression(@"[0-9]{1,20}")]
        [Required]
        public int prisLugarPremium { get; set; }
    }
}