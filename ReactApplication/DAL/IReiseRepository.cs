using System;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;
using System.Collections.Generic;
using ReactApplication.Models;
using WebApp_Oblig2.Model;

namespace ReactApplication.DAL
{
    public interface IReiseRepository
    {
        Task<Boolean> NyRute(RuteMod rute);
        Task<Boolean> SlettRute(int ruteId);
        Task<RuteMod> EnRute(int ruteId);
        Task<List<RuteMod>> AlleRuter();
        Task<Boolean> oppdaterRute(RuteMod rute);
        Task<Boolean> NyReise(ReiseMod reise);
        Task<ReiseMod> EnReise(int reiseId);
        Task<Boolean> OppdaterReise(ReiseMod reise);
        Task<Boolean> SlettReise(int reiseId);
        Task<List<ReiseMod>> AlleReiser(int id);
    }
}