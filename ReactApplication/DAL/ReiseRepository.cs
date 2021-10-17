using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApp_Oblig2.DAL;
using WebApp_Oblig2.Model;
using ReiseDB = WebApp_Oblig2.DAL.Reise;
using Reise = WebApp_Oblig2.Model.Reise;

namespace ReactApplication.DAL
{
    public class ReiseRepository : IReiseRepository
    {
        // Oppretter objekt av typen DB
        private readonly DB _db;

        // Konstruktør
        // Tildeler databasen til _db
        public ReiseRepository(DB db)
        {
            _db = db;
        }

        // Opprett ny rute
        // TODO: Skill mellom catch-false og try-false
        public async Task<Boolean> NyRute(Rute rute)
        {
            try
            {
                Rute eksisterer = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteFra == rute.ruteFra && rute.ruteTil == rute.ruteTil);

                if (eksisterer == null)
                {
                    Rute nyRute = new Rute
                    {
                        ruteFra = rute.ruteFra,
                        ruteTil = rute.ruteTil,
                        dagsreise = rute.dagsreise,
                    };

                    await _db.Ruter.AddAsync(nyRute);
                    _db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        // Slett eksisterende rute
        public async Task<Boolean> SlettRute(int ruteId)
        {
            try
            {
                Rute eksisterer = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteId == ruteId);

                if (eksisterer != null)
                {
                    _db.Ruter.Remove(eksisterer);
                    _db.SaveChanges();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        // Hent en rute
        public async Task<Rute> EnRute(int ruteId)
        {
            try
            {
                Rute funnetRute = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteId == ruteId);

                if (funnetRute != null)
                {
                    return funnetRute;
                }

                return null;
            }
            catch
            {
                return null;
            }
        }

        // Opprett ny reise
        // Sjekker om reise eksisterer ved bruk av avreisedato
        public async Task<Boolean> NyReise(Reise reise)
        {
            try
            {
                List<ReiseDB> reiser =
                    await _db.Reiser.ToListAsync();

                ReiseDB funnetReise =
                    await _db.Reiser.FirstOrDefaultAsync(
                        r => r.ReiseDatoTid == reise.ReiseDatoTid);

                Rute funnetRute = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteFra == reise.RuteFra && r.ruteTil == reise.RuteTil);

                if (funnetReise == null)
                {
                    ReiseDB nyReise =
                        new ReiseDB
                        {
                            ReiseDatoTid = reise.ReiseDatoTid,
                            RuteId = funnetRute,
                            PrisBarn = reise.PrisBarn,
                            PrisVoksen = reise.PrisVoksen,
                            PrisLugarStandard = reise.PrisLugarStandard,
                            PrisLugarPremium = reise.PrisLugarPremium,
                        };

                    reiser.Add(nyReise);
                    _db.SaveChanges();
                    return true;

                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        // Hent en eksisterende reise
        public async Task<Reise> EnReise(int reiseId)
        {
            try
            {
                ReiseDB funnetReise = await _db.Reiser.FirstOrDefaultAsync(
                    r => r.ReiseId == reiseId);

                if (funnetReise != null)
                {
                    Reise tempReise = new Reise
                    {
                        ReiseDatoTid = funnetReise.ReiseDatoTid,
                        RuteFra = funnetReise.RuteId.ruteFra,
                        RuteTil = funnetReise.RuteId.ruteTil,
                        Dagsreise = funnetReise.RuteId.dagsreise,
                        PrisBarn = funnetReise.PrisBarn,
                        PrisVoksen = funnetReise.PrisVoksen,
                        PrisLugarStandard = funnetReise.PrisLugarStandard,
                        PrisLugarPremium = funnetReise.PrisLugarPremium
                    };

                    return tempReise;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
    }
}
