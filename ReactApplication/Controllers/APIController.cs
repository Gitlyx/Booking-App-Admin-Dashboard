using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactApplication.DAL;
using WebApp_Oblig2.DAL;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using ReactApplication.Models;
using WebApp_Oblig2.Model;

namespace ReactApplication.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class APIController : ControllerBase
    {
        private readonly IReiseRepository _db;
        private readonly IBrukerRepository _dbBruker;

        private readonly ILogger<APIController> _log;
        private const string _loggetInn = "LoggeInn";


        public APIController(IReiseRepository db, IBrukerRepository dbBruker, ILogger<APIController> log)
        {

            _dbBruker = dbBruker;
            _db = db;
            _log = log;
        }


        // Opprett ny rute
        [HttpPost]
        public async Task<ActionResult> NyRute(RuteMod rute)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            if (ModelState.IsValid)
            {
                Boolean vellykket = await _db.NyRute(rute);

                if (!vellykket)
                {
                    _log.LogInformation("Ruten eksisterer allerede");
                    return BadRequest(vellykket);
                }
                else
                {
                    return Ok(vellykket);
                }
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering på server");
        }

        // Slett eksisterende rute
        [HttpDelete]
        public async Task<ActionResult> SlettRute(int ruteId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            Boolean vellykket = await _db.SlettRute(ruteId);
            if (!vellykket)
            {
                _log.LogInformation("Ruten eksisterer ikke");
                return NotFound(vellykket);

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
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            RuteMod hentetRute = await _db.EnRute(ruteId);
            if (hentetRute == null)
            {
                _log.LogInformation("Reisen ble ikke funnet!");
                return BadRequest(false);
            }
            else
            {
                return Ok(hentetRute);
            }
        }

        // Hent alle ruter
        [HttpGet]
        public async Task<ActionResult> AlleRuter()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            List<RuteMod> funnet = await _db.AlleRuter();

            if (funnet == null)
            {
                _log.LogInformation("Ingen ruter funnet!");
                return BadRequest(false);
            }
            else
            {
                return Ok(funnet);
            }
        }

        // Oppdater en eksisterende rute
        [HttpPut]
        public async Task<ActionResult> oppdaterRute(RuteMod rute)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            if (ModelState.IsValid)
            {
                Boolean vellykket = await _db.oppdaterRute(rute);
                if (!vellykket)
                {
                    _log.LogInformation("Ruten ble ikke endret!");
                    return BadRequest(false);
                }
                else
                {
                    return Ok(vellykket);
                }
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering på server");

        }

        // Opprett ny reise
        [HttpPost]
        public async Task<ActionResult> Reise(ReiseMod reise)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            if (ModelState.IsValid)
            {
                Boolean vellykket = await _db.NyReise(reise);
                if (!vellykket)
                {
                    _log.LogInformation("Reisen ble ikke opprett");
                    return BadRequest(false);
                }
                else
                {
                    return Ok(vellykket);
                }
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering på server");
        }

        // Hent en eksistrende reise
        [HttpGet]
        public async Task<ActionResult> EnReise(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            ReiseMod enReise = await _db.EnReise(id);
            if (enReise == null)
            {
                _log.LogInformation("Reisen eksisterer ikke eller ikke funnet");
                return BadRequest(false);
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
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            Boolean vellykket = await _db.SlettReise(reiseId);
            if (!vellykket)
            {
                _log.LogInformation("Reisen eksisterer ikke!");
                return BadRequest(false);
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Oppdater en eksisterende reise
        [HttpPut]
        public async Task<ActionResult> OppdaterReise(ReiseMod reise)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            if (ModelState.IsValid)
            {
                Boolean vellykket = await _db.OppdaterReise(reise);

                if (!vellykket)
                {
                    _log.LogInformation("Reisen ble ikke oppdatert!");
                    return BadRequest(false);
                }
                else
                {
                    return Ok(vellykket);
                }
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering på server");
        }

        // Hent alle eksisterende reiser
        [HttpGet]
        public async Task<ActionResult> Reiser(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return Unauthorized("Ikke logget inn");
            }
            List<ReiseMod> reiser = await _db.AlleReiser(id);
            if (reiser == null)
            {
                _log.LogInformation("Ingen reiser funnet!");
                return BadRequest(false);
            }
            else
            {
                return Ok(reiser);
            }
        }


        [HttpPost]
        public async Task<ActionResult> LoggInn(Bruker bruker)
        {
            if (ModelState.IsValid)
            {
                Boolean vellykket = await _dbBruker.LoggInn(bruker);
                if (!vellykket)
                {
                    HttpContext.Session.SetString(_loggetInn, "");
                    _log.LogInformation("Brukeren eksisterer ikke");
                    return Ok(false);
                }
                else
                {
                    HttpContext.Session.SetString(_loggetInn, "LoggeInn");
                    return Ok(vellykket);
                }
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering på server");
        }


        public void LoggUt()
        {
            HttpContext.Session.SetString(_loggetInn, "");
        }

        [HttpGet]
        public bool Session()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInn)))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

    }
}