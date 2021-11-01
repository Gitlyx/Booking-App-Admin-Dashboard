﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactApplication.DAL;
using WebApp_Oblig2.DAL;
using ReiseDB = WebApp_Oblig2.DAL.Reise;
using Reise = WebApp_Oblig2.Model.Reise;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using ReactApplication.Models;

namespace ReactApplication.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ReiseController : ControllerBase
    {
        private readonly IReiseRepository _db;
        private readonly IBrukerRepository _dbBruker;

        private readonly ILogger<ReiseController> _log;
        private const string _loggetInn = "LoggeInn";


        public ReiseController(IReiseRepository db, IBrukerRepository dbBruker, ILogger<ReiseController> log)
        {

            _dbBruker = dbBruker;
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
                return BadRequest(new { response = "Ruten Eksisterer", ok = false });
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
                return BadRequest(new { message = "bad request", ok = false });

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

        // Hent alle ruter
        [HttpGet]
        public async Task<ActionResult> Rute()
        {
            List<Rute> funnet = await _db.AlleRuter();

            if (funnet == null)
            {
                _log.LogInformation("Ingen ruter funnet!");
                return BadRequest("Ingen ruter funnet");
            }
            else
            {
                return Ok(funnet);
            }
        }

        // Oppdater en eksisterende rute
        [HttpPut]
        public async Task<ActionResult> oppdaterRute(Reise reise)
        {
            Boolean vellykket = await _db.oppdaterRute(reise);
            if (!vellykket)
            {
                _log.LogInformation("Reisen ble ikke endret!");
                return BadRequest(new { message = "Reisen ble ikke endret", ok = false });
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
                return BadRequest(new { message = "Reisen ble ikke opprettet", ok = false });
            }
            else
            {
                return Ok(vellykket);
            }
        }

        // Hent en eksistrende reise
        [HttpGet]
        public async Task<ActionResult> EnReise(int id)
        {
            Reise enReise = await _db.EnReise(id);
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
        public async Task<ActionResult> Reiser(int id)
        {
            List<Reise> reiser = await _db.AlleReiser(id);
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


        [HttpPost]
        public async Task<ActionResult> LoggInn(Bruker bruker)
        {

            Boolean vellykket = await _dbBruker.LoggInn(bruker);
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