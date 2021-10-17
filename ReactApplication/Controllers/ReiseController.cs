using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactApplication.DAL;
using WebApp_Oblig2.DAL;
using ReiseDB = WebApp_Oblig2.DAL.Reise;
using Reise = WebApp_Oblig2.Model.Reise;

namespace ReactApplication.Controllers
{
    [Route("[controller]/[action]")]
    public class ReiseController : ControllerBase
    {
        private readonly IReiseRepository _db;
        private readonly ILogger<ReiseController> _log;

        public ReiseController(IReiseRepository db, ILogger<ReiseController> log)
        {
            _db = db;
            _log = log;
        }

        // Opprett ny rute
        [HttpPost]
        public async Task<ActionResult> Rute(Rute r)
        {
            Boolean vellykket = await _db.NyRute(r);

            if (!vellykket)
            {
                _log.LogInformation("Ruten eksisterer allerede");
                return BadRequest("Ruten eksisterer allerede");
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Slett eksisterende rute
        [HttpDelete]
        public async Task<ActionResult> Rute(int ruteId)
        {
            Boolean vellykket = await _db.SlettRute(ruteId);
            if (!vellykket)
            {
                _log.LogInformation("Ruten eksisterer ikke");
                return BadRequest("Ruten eksisterer ikke");
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Hent en eksisterende rute
        [HttpGet]
        public async Task<ActionResult> EnRute(int ruteId)
        {
            Rute hentetRute = await _db.EnRute(ruteId);
            if (hentetRute == null)
            {
                _log.LogInformation("Reisen ble ikke funnet!");
                return BadRequest("Reisen ble ikke funnet!");
            }
            else
            {
                return Ok(hentetRute);
            }
        }

        // Opprett ny reise
        [HttpPost]
        public async Task<ActionResult> Reise(Reise reise)
        {
            Boolean vellykket = await _db.NyReise(reise);

            if (!vellykket)
            {
                _log.LogInformation("Reisen ble ikke opprett");
                return BadRequest("Reisen ble ikke opprettet");
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Hent en eksistrende reise
        [HttpGet]
        public async Task<ActionResult> EnReise(int reiseId)
        {
            Reise enReise = await _db.EnReise(reiseId);
            if (enReise == null)
            {
                _log.LogInformation("Reisen eksisterer ikke eller ikke funnet");
                return BadRequest("Reisen eksister ikke eller ble ikke funnet");
            }
            else
            {
                return Ok(enReise);
            }
        }
    }
}
