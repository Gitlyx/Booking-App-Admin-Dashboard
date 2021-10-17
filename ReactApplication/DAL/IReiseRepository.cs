using System;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;
using WebApp_Oblig2.Model;
using ReiseDB = WebApp_Oblig2.DAL.Reise;
using Reise = WebApp_Oblig2.Model.Reise;

namespace ReactApplication.DAL
{
    public interface IReiseRepository
    {
        Task<Boolean> NyRute(Rute r);
        Task<Boolean> SlettRute(int ruteId);
        Task<Rute> EnRute(int ruteId);
        Task<Boolean> NyReise(Reise reise);
        Task<Reise> EnReise(int reiseId);
    }
}
