using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApplication.Models
{
    [ExcludeFromCodeCoverage] // Bruker It.IsAny<Bruker> som fjerner behov for å opprete bruker objekt.
    public class Bruker
    {
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        public String Brukernavn { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{2,20}")]
        public String Passord { get; set; }
    }
}
