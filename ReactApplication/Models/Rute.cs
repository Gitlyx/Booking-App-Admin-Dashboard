using System;
using System.ComponentModel.DataAnnotations;

namespace ReactApplication.Models
{
    public class RuteMod
    {
        public int id { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        [Required]
        public string ruteFra { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        [Required]
        public string ruteTil { get; set; }
        [Required]
        public bool dagsreise { get; set; }
    }
}

