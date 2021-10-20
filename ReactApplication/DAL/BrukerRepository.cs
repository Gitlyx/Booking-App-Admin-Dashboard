using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReactApplication.Models;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;

namespace ReactApplication.DAL
{
    public class BrukerRepository : IBrukerRepository
    {
        private DB _db;

        private ILogger<BrukerRepository> _log;

        public BrukerRepository(DB db, ILogger<BrukerRepository> log)
        {
            _db = db;
            _log = log;
        }

        //Hashing metode tatt fra Molasdul: Sikkerhet.
        public static byte[] LagHash(string passord, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: passord,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        //Salt metode tatt fra Modul: Sikkerhet.
        public static byte[] LagSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }

        public async Task<bool> LoggInn(Bruker bruker)
        {
            try
            {
                Brukere funnetBruker = await _db.Brukere.FirstOrDefaultAsync(b => b.Brukernavn == bruker.Brukernavn);
                byte[] hash = LagHash(bruker.Passord, funnetBruker.Salt);
                bool ok = hash.SequenceEqual(funnetBruker.Passord);
                if (ok)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }
    }
}