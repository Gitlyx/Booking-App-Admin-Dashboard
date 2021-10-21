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
        public async Task<Boolean> NyRute(Reise reise)
        {
            try
            {
                Rute eksisterer = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteFra == reise.ruteFra && r.ruteTil == reise.ruteTil);

                if (eksisterer == null)
                {
                    Rute nyRute = new Rute
                    {
                        ruteFra = reise.ruteFra,
                        ruteTil = reise.ruteTil,
                        dagsreise = reise.dagsreise,
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

        // Hent alle ruter
        public async Task<List<Rute>> AlleRuter()
        {
            try
            {
                List<Rute> ruter = await _db.Ruter.ToListAsync();
                List<Rute> returnRuter = new List<Rute>();

                foreach (var rute in ruter)
                {
                    Rute temp_rute = new Rute
                    {
                        ruteFra = rute.ruteFra,
                        ruteTil = rute.ruteTil,
                        dagsreise = rute.dagsreise
                    };

                    returnRuter.Add(temp_rute);
                }

                return returnRuter;
            }
            catch
            {
                return null;
            }
        }

        // Oppdater en rute
        public async Task<Boolean> oppdaterRute(Reise reise)
        {
            try
            {
                Rute funnetRute = await _db.Ruter.FirstOrDefaultAsync(r =>
                    r.ruteId == reise.ReiseId);

                if (funnetRute != null)
                {
                    funnetRute.dagsreise = reise.dagsreise;
                    funnetRute.ruteFra = reise.ruteFra;
                    funnetRute.ruteTil = reise.ruteTil;

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
                        r.RuteId.ruteFra == reise.ruteFra &&
                        r.RuteId.ruteTil == reise.ruteTil);

                Rute funnetRute = await _db.Ruter.FirstOrDefaultAsync(r =>
                r.ruteFra == reise.ruteFra && r.ruteTil == reise.ruteTil);

                if (funnetReise == null)
                {
                    ReiseDB nyReise = new ReiseDB
                    {
                        ReiseDatoTid = reise.ReiseDatoTid,
                        RuteId = funnetRute,
                        PrisBarn = reise.prisBarn,
                        PrisVoksen = reise.prisVoksen,
                        PrisLugarStandard = reise.prisLugarStandard,
                        PrisLugarPremium = reise.prisLugarPremium,
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
                        ruteFra = funnetReise.RuteId.ruteFra,
                        ruteTil = funnetReise.RuteId.ruteTil,
                        dagsreise = funnetReise.RuteId.dagsreise,
                        prisBarn = funnetReise.PrisBarn,
                        prisVoksen = funnetReise.PrisVoksen,
                        prisLugarStandard = funnetReise.PrisLugarStandard,
                        prisLugarPremium = funnetReise.PrisLugarPremium
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
                    funnetReise.PrisBarn = reise.prisBarn;
                    funnetReise.PrisVoksen = reise.prisVoksen;
                    funnetReise.PrisLugarStandard = reise.prisLugarStandard;
                    funnetReise.PrisLugarPremium = reise.prisLugarPremium;

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
                        ruteFra = reise.RuteId.ruteFra,
                        ruteTil = reise.RuteId.ruteTil,
                        prisBarn = reise.PrisBarn,
                        prisVoksen = reise.PrisVoksen,
                        prisLugarStandard = reise.PrisLugarStandard,
                        prisLugarPremium = reise.PrisLugarPremium
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
