using Microsoft.AspNetCore.Http;
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
        private const string _loggetInn = "LoggeInn";

        public BrukerController(IBrukerRepository db, ILogger<BrukerController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpPost]
        public async Task<ActionResult> LoggInn(Bruker bruker)
        {

            Boolean vellykket = await _db.LoggInn(bruker);
            if (!vellykket)
            {
                HttpContext.Session.SetString(_loggetInn, "");
                _log.LogInformation("Brukeren eksisterer ikke");
                return BadRequest(new { message = ("Innlogging feilet for: " + bruker.Brukernavn), ok = false });
            }
            else
            {
                HttpContext.Session.SetString(_loggetInn, "LoggeInn");
                return Ok(vellykket);
            }
        }


        public void LoggUt()
        {
            HttpContext.Session.SetString(_loggetInn, "");
        }

        [HttpGet]
        public async Task<ActionResult> Session()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }
        }
    }
}