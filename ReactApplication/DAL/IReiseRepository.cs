﻿using System;
using System.Threading.Tasks;
using WebApp_Oblig2.DAL;
using WebApp_Oblig2.Model;
using ReiseDB = WebApp_Oblig2.DAL.Reise;
using Reise = WebApp_Oblig2.Model.Reise;
using System.Collections.Generic;

namespace ReactApplication.DAL
{
    public interface IReiseRepository
    {
        Task<Boolean> NyRute(Rute r);
        Task<Boolean> SlettRute(int ruteId);
        Task<Rute> EnRute(int ruteId);
        Task<Boolean> oppdaterRute(Rute rute);
        Task<Boolean> NyReise(Reise reise);
        Task<Reise> EnReise(int reiseId);
        Task<Boolean> OppdaterReise(Reise reise);
        Task<Boolean> SlettReise(int reiseId);
        Task<List<Reise>> AlleReiser();
    }
}
