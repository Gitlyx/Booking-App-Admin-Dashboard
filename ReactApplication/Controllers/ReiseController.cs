using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactApplication.DAL;
using WebApp_Oblig2.DAL;
using ReiseDB = WebApp_Oblig2.DAL.Reise;
using Reise = WebApp_Oblig2.Model.Reise;
using System.Collections.Generic;

namespace ReactApplication.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
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
        public async Task<ActionResult> Rute(Reise reise)
        {
            Boolean vellykket = await _db.NyRute(reise);

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

        [HttpPut]
        public async Task<ActionResult> oppdaterRute(Reise reise)
        {
            Boolean vellykket = await _db.oppdaterRute(reise);
            if (!vellykket)
            {
                _log.LogInformation("Reisen ble ikke endret!");
                return BadRequest("Reisen ble ikke endret");
            }
            else
            {
                return Ok(vellykket);
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

        // Slett en eksisterende reise
        [HttpDelete]
        public async Task<ActionResult> Reise(int reiseId)
        {
            Boolean vellykket = await _db.SlettReise(reiseId);
            if (!vellykket)
            {
                _log.LogInformation("Reisen eksisterer ikke!");
                return BadRequest("Reisen eksister ikke");
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Oppdater en eksisterende reise
        [HttpPut]
        public async Task<ActionResult> OppdaterReise(Reise reise)
        {
            Boolean vellykket = await _db.OppdaterReise(reise);

            if (!vellykket)
            {
                _log.LogInformation("Reisen ble ikke oppdatert!");
                return BadRequest("Reisen ble ikke oppdatert");
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Hent alle eksisterende reiser
        [HttpGet]
        public async Task<ActionResult> Reiser()
        {
            List<Reise> reiser = await _db.AlleReiser();
            if (reiser == null)
            {
                _log.LogInformation("Ingen reiser funnet!");
                return BadRequest("Ingen reiser funnet");
            }
            else
            {
                return Ok(reiser);
            }
        }

    }
}
