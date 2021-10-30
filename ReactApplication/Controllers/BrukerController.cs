using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactApplication.DAL;
using ReactApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApplication.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BrukerController : ControllerBase
    {
        private readonly IBrukerRepository _db;

        private readonly ILogger<BrukerController> _log;

        public BrukerController(IBrukerRepository db, ILogger<BrukerController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpPost]
        public async Task<ActionResult> Bruker(Bruker bruker)
        {
            Boolean vellykket = await _db.LoggInn(bruker);

            if (!vellykket)
            {
                _log.LogInformation("Brukeren eksisterer ikke");
                return BadRequest(new {message = "Brukeren eksisterer ikke", ok = false});
            }
            else
            {
                return Ok(vellykket);
            }
        }
    }
}