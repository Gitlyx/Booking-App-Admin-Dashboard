using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactApplication.Models;

namespace ReactApplication.DAL
{
    public interface IBrukerRepository
    {
        Task<Boolean> LoggInn(Bruker bruker);

    }
}
