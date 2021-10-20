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
                    await _db.SaveChangesAsync();
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
                    await _db.SaveChangesAsync();
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

        // Oppdater en rute
        public async Task<Boolean> oppdaterRute(Rute rute)
        {
            try
            {
                Rute funnetRute = await _db.Ruter.FirstOrDefaultAsync(r =>
                    r.ruteId == rute.ruteId);

                if (funnetRute != null)
                {
                    funnetRute.dagsreise = rute.dagsreise;
                    funnetRute.ruteFra = rute.ruteFra;
                    funnetRute.ruteTil = rute.ruteTil;

                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        // Opprett ny reise
        // Sjekker om reise eksisterer ved bruk av avreisedato
        public async Task<Boolean> NyReise(Reise reise)
        {
            try
            {
                ReiseDB funnetReise =
                    await _db.Reiser.FirstOrDefaultAsync(
                        r => r.ReiseDatoTid == reise.ReiseDatoTid &&
                        r.RuteId.ruteFra == reise.RuteFra &&
                        r.RuteId.ruteTil == reise.RuteTil);

                Rute funnetRute = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteFra == reise.RuteFra && r.ruteTil == reise.RuteTil);

                if (funnetReise == null)
                {
                    ReiseDB nyReise = new ReiseDB
                    {
                        ReiseDatoTid = reise.ReiseDatoTid,
                        RuteId = funnetRute,
                        PrisBarn = reise.PrisBarn,
                        PrisVoksen = reise.PrisVoksen,
                        PrisLugarStandard = reise.PrisLugarStandard,
                        PrisLugarPremium = reise.PrisLugarPremium,
                    };

                    await _db.Reiser.AddAsync(nyReise);
                    await _db.SaveChangesAsync();
                    return true;

                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        // Slett en eksisterende reise
        public async Task<Boolean> SlettReise(int reiseId)
        {
            try
            {
                ReiseDB funnetReise = await _db.Reiser.FirstOrDefaultAsync(r =>
                r.ReiseId == reiseId);

                if (funnetReise != null)
                {
                    _db.Remove(funnetReise);
                    await _db.SaveChangesAsync();
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

        // Oppdater eksisterende reise
        public async Task<Boolean> OppdaterReise(Reise reise)
        {
            try
            {
                ReiseDB funnetReise = await _db.Reiser.FirstOrDefaultAsync(r =>
                r.ReiseId == reise.ReiseId);

                if (funnetReise != null)
                {
                    funnetReise.ReiseDatoTid = reise.ReiseDatoTid;
                    funnetReise.PrisBarn = reise.PrisBarn;
                    funnetReise.PrisVoksen = reise.PrisVoksen;
                    funnetReise.PrisLugarStandard = reise.PrisLugarStandard;
                    funnetReise.PrisLugarPremium = reise.PrisLugarPremium;

                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        // Hent alle eksisterende reiser
        public async Task<List<Reise>> AlleReiser()
        {
            try
            {
                List<ReiseDB> reiserDB = await _db.Reiser.ToListAsync();
                List<Reise> reiser = new List<Reise>();

                foreach (var reise in reiserDB)
                {
                    Reise reiseObjekt = new Reise
                    {
                        ReiseId = reise.ReiseId,
                        ReiseDatoTid = reise.ReiseDatoTid,
                        RuteFra = reise.RuteId.ruteFra,
                        RuteTil = reise.RuteId.ruteTil,
                        PrisBarn = reise.PrisBarn,
                        PrisVoksen = reise.PrisVoksen,
                        PrisLugarStandard = reise.PrisLugarStandard,
                        PrisLugarPremium = reise.PrisLugarPremium
                    };

                    reiser.Add(reiseObjekt);
                }

                if (reiser != null)
                {
                    return reiser;
                }
                else { return null; }
            }
            catch
            {
                return null;
            }
        }
    }
}
