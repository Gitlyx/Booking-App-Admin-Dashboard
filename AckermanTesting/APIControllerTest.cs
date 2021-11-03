using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Policy;
using System.Threading.Tasks;
using Castle.Core.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
using Moq;
using ReactApplication.Controllers;
using ReactApplication.DAL;
using ReactApplication.Models;
using WebApp_Oblig2.DAL;
using WebApp_Oblig2.Model;
using Xunit;
using Reise = WebApp_Oblig2.Model.Reise;
using ReiseDB = WebApp_Oblig2.DAL.Reise;

namespace AckermanTesting
{
    public class APIControllerTest
    {
        /*
         * Forklaring for selv:
         * Oppretter string som bestemmer session
         * _loggetInn betyr vi har en session
         * _ikkeLoggetInn betyr at vi ikke har en session
         */
        private const string _loggetInn = "LoggeInn";
        private const string _ikkeLoggetInn = "";

        /*
         * Forklaring for selv:
         * Oppretter Mock av logger, reise- og brukerrepository. 
         * Dette er for å UNNGÅ å gjøre kall mot databasen. 
         */
        private readonly Mock<IReiseRepository> mockReiseRep = new Mock<IReiseRepository>();
        private readonly Mock<IBrukerRepository> mockBrukerRep = new Mock<IBrukerRepository>();
        private readonly Mock<ILogger<APIController>> mockLog = new Mock<ILogger<APIController>>();

        /*
         * Forklaring for selv:
         * Oppretter Mock av en session
         * Bestemmer om applikasjonen er logget inn eller ikke (om vi har session eller ikke)
         */
        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();

        // AlleRuter-metode, Logget inn, Returnerer OK status med Liste<Rute>
        [Fact]
        public async Task AlleRuterLoggetInnOk() // AlleRuter-metode gitt at vi er logget inn og alt er ok
        {
            //Arrange - Legg opp testen
            var rute1 = new Rute
            {
                ruteId = 1,
                ruteFra = "Oslo",
                ruteTil = "Tokyo",
                dagsreise = false,
            };

            var rute2 = new Rute
            {
                ruteId = 2,
                ruteFra = "Oslo",
                ruteTil = "Bangladesh",
                dagsreise = false,
            };

            var rute3 = new Rute
            {
                ruteId = 3,
                ruteFra = "Oslo",
                ruteTil = "Reykjavik",
                dagsreise = false,
            };

            // Opprett liste og legg til rute
            var ruteListe = new List<Rute>();
            ruteListe.Add(rute1);
            ruteListe.Add(rute2);
            ruteListe.Add(rute3);

            // Simuler metoden AlleRuter med return value like listen ruteListe
            mockReiseRep.Setup(r => r.AlleRuter()).ReturnsAsync(ruteListe);

            // Mock apiController
            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            // Mock session - Vi har session 
            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await apiController.AlleRuter() as OkObjectResult;

            // Assert
            // Sjekk at vi får returner Ok(...)
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            // Sjekk at vi får returner Listen
            Assert.Equal<List<Rute>>((List<Rute>)resultat.Value, ruteListe);
        }

        // AlleRuter-metode, Logget inn, Metode returnerer null
        [Fact]
        public async Task AlleRuterLoggetInnFeilDB()
        {
            // Arrange
            // Opprett liste
            var ruteListe = new List<Rute>();

            // Returner liste som er null
            mockReiseRep.Setup((r) => r.AlleRuter()).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn; // Vi har en session
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var resultat = await apiController.AlleRuter() as BadRequestObjectResult;

            // Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Ingen ruter funnet", resultat.Value);
        }

        // AlleRuter-metode, ikke logget inn
        [Fact]
        public async Task AlleRuterIkkeLoggetInn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.AlleRuter()).ReturnsAsync(It.IsAny<List<Rute>>);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.AlleRuter() as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task EnRuteInnLoggetOK()
        {
            // ARRANGE

            var rute1 = new Rute
            {
                ruteId = 1,
                ruteFra = "Oslo",
                ruteTil = "Tokyo"
            };

            /*
             * For selv:
             * Send gjennom hvilken som helst id i metoden EnRute, med
             * tenkt forventninger om å få returnert rute1
             */
            mockReiseRep.Setup(r => r.EnRute(It.IsAny<int>())).ReturnsAsync(rute1);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.EnRute(1) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<Rute>(rute1, (Rute)resultat.Value);
        }

        [Fact]
        public async Task EnRuteInnloggetDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.EnRute(It.IsAny<int>())).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.EnRute(It.IsAny<int>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Reisen ble ikke funnet!", resultat.Value);
        }

        [Fact]
        public async Task EnRuteIkkeInnlogget()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.EnRute(It.IsAny<int>())).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.EnRute(It.IsAny<int>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task SlettRuteLoggetInnOK()
        {

            // ARRANGE
            mockReiseRep.Setup(r => r.SlettRute(It.IsAny<int>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.SlettRute(It.IsAny<int>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((Boolean)resultat.Value);
        }

        [Fact]
        public async Task SlettRuteLoggetInnDBFeil()
        {

            // ARRANGE
            mockReiseRep.Setup(r => r.SlettRute(It.IsAny<int>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.SlettRute(It.IsAny<int>()) as NotFoundObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal("Ruten eksisterer ikke", resultat.Value);
        }

        [Fact]
        public async Task SlettRuteIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.SlettRute(It.IsAny<int>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.SlettRute(It.IsAny<int>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);

        }

        [Fact]
        public async Task NyRuteLoggetInnOK()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyRute(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.NyRute(It.IsAny<Reise>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((Boolean)resultat.Value);
        }

        [Fact]
        public async Task NyRuteLoggetInnDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyRute(It.IsAny<Reise>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.NyRute(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT

            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Ruten eksisterer allerede", resultat.Value);
        }

        [Fact]
        public async Task NyRuteIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyRute(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.NyRute(It.IsAny<Reise>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task NyRuteLoggetInnFeilModel()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyRute(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            apiController.ModelState.AddModelError("ruteFra", "Feil i inputvalidering på server");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.NyRute(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering på server", resultat.Value);
        }

        [Fact]
        public async Task EndreRuteLoggetInnOk()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.oppdaterRute(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.oppdaterRute(It.IsAny<Reise>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((Boolean)resultat.Value);
        }

        [Fact]
        public async Task EndreRuteLoggetInnDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.oppdaterRute(It.IsAny<Reise>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.oppdaterRute(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Ruten ble ikke endret!", resultat.Value);
        }

        [Fact]
        public async Task EndreRuteIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.oppdaterRute(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.oppdaterRute(It.IsAny<Reise>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task EndreRuteLoggetInnFeilModel()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.oppdaterRute(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            apiController.ModelState.AddModelError("ruteFra", "Feil i inputvalidering på server");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.oppdaterRute(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering på server", resultat.Value);
        }



        [Fact]
        public async Task AlleReiserLoggetinnOK()
        {
            // ARRANGE
            var reise1 = new Reise
            {
                id = 1,
                reiseDatoTid = new DateTime(),
                ruteFra = "Oslo",
                ruteTil = "Tokyo",
                prisBarn = 99,
                prisVoksen = 199,
                prisLugarStandard = 250,
                prisLugarPremium = 400,
                dagsreise = true,
            };

            var reise2 = new Reise
            {
                id = 2,
                ruteFra = "Oslo",
                ruteTil = "Moskva",
                prisBarn = 199,
                prisVoksen = 1299,
                prisLugarStandard = 1250,
                prisLugarPremium = 1400,
                dagsreise = true,
            };


            var reise3 = new Reise
            {
                id = 1,
                ruteFra = "Oslo",
                ruteTil = "Paris",
                prisBarn = 299,
                prisVoksen = 2199,
                prisLugarStandard = 2250,
                prisLugarPremium = 2400,
                dagsreise = true,
            };

            var reiseListe = new List<Reise>();
            reiseListe.Add(reise1);
            reiseListe.Add(reise2);
            reiseListe.Add(reise3);

            mockReiseRep.Setup(r => r.AlleReiser(It.IsAny<int>())).ReturnsAsync(reiseListe);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reiser(It.IsAny<int>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<List<Reise>>((List<Reise>)resultat.Value, reiseListe);
        }

        [Fact]
        public async Task AlleReiserLoggetinnDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.AlleReiser(It.IsAny<int>())).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reiser(It.IsAny<int>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Ingen reiser funnet", resultat.Value);
        }

        [Fact]
        public async Task AlleReiserIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.AlleReiser(It.IsAny<int>())).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reiser(It.IsAny<int>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task EnReiseLoggetinnOk()
        {
            // ARRANGE
            var reise1 = new Reise
            {
                id = 1,
                ruteFra = "Oslo",
                ruteTil = "Tokyo",
                prisBarn = 99,
                prisVoksen = 199,
                prisLugarStandard = 250,
                prisLugarPremium = 400,
                dagsreise = true,
            };

            mockReiseRep.Setup(r => r.EnReise(It.IsAny<int>())).ReturnsAsync(reise1);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.EnReise(It.IsAny<int>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal<Reise>(reise1, (Reise)resultat.Value);
        }

        [Fact]
        public async Task EnReiseLoggetinnDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.EnReise(It.IsAny<int>())).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.EnReise(It.IsAny<int>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Reisen eksister ikke eller ble ikke funnet", resultat.Value);
        }

        [Fact]
        public async Task EnReiseIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.EnReise(It.IsAny<int>())).ReturnsAsync(() => null);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.EnReise(It.IsAny<int>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task SlettReiseLoggetInnOK()
        {

            // ARRANGE
            mockReiseRep.Setup(r => r.SlettReise(It.IsAny<int>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<int>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((Boolean)resultat.Value);
        }

        [Fact]
        public async Task SlettReiseLoggetInnDBFeil()
        {

            // ARRANGE
            mockReiseRep.Setup(r => r.SlettReise(It.IsAny<int>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<int>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Reisen eksister ikke", resultat.Value);
        }

        [Fact]
        public async Task SlettReiseIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.SlettReise(It.IsAny<int>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<int>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);

        }

        [Fact]
        public async Task NyReiseLoggetInnOK()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyReise(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<Reise>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((Boolean)resultat.Value);
        }

        [Fact]
        public async Task NyReiseLoggetInnDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyReise(It.IsAny<Reise>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT

            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Reisen ble ikke opprett", resultat.Value);
        }


        [Fact]
        public async Task NyReiseIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyReise(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<Reise>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task NyReiseLoggetInnFeilModel()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.NyReise(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            apiController.ModelState.AddModelError("Barnebillett", "Feil i inputvalidering på server");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.Reise(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering på server", resultat.Value);
        }

        [Fact]
        public async Task EndreReiseLoggetInnOk()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.OppdaterReise(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.OppdaterReise(It.IsAny<Reise>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((Boolean)resultat.Value);
        }

        [Fact]
        public async Task EndreReiseLoggetInnDBFeil()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.OppdaterReise(It.IsAny<Reise>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.OppdaterReise(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Reisen ble ikke oppdatert", resultat.Value);
        }

        [Fact]
        public async Task EndreReiseIkkeLoggetinn()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.OppdaterReise(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.OppdaterReise(It.IsAny<Reise>()) as UnauthorizedObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal("Ikke logget inn", resultat.Value);
        }

        [Fact]
        public async Task EndreReiseLoggetInnFeilModel()
        {
            // ARRANGE
            mockReiseRep.Setup(r => r.OppdaterReise(It.IsAny<Reise>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            apiController.ModelState.AddModelError("Barnebillett", "Feil i inputvalidering på server");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.OppdaterReise(It.IsAny<Reise>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering på server", resultat.Value);
        }

        [Fact]
        public async Task LoggInnOK()
        {
            // ARRANGE
            mockBrukerRep.Setup(b => b.LoggInn(It.IsAny<Bruker>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.LoggInn(It.IsAny<Bruker>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.True((bool)resultat.Value);
        }

        [Fact]
        public async Task LoggInnFeilModel()
        {
            // ARRANGE
            mockBrukerRep.Setup(b => b.LoggInn(It.IsAny<Bruker>())).ReturnsAsync(true);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            apiController.ModelState.AddModelError("Feil brukernavn/passord", "Feil i inputvalidering på server");

            mockSession[_loggetInn] = _loggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;


            // ACT
            var resultat = await apiController.LoggInn(It.IsAny<Bruker>()) as BadRequestObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.Equal("Feil i inputvalidering på server", resultat.Value);
        }


        /*
         * KOPIERT FRA FORELESNING "Enhentstest av KundeApp - logginn løsning"
         */
        [Fact]
        public async Task MislykketLogginn()
        {
            mockBrukerRep.Setup(b => b.LoggInn(It.IsAny<Bruker>())).ReturnsAsync(false);

            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockSession[_loggetInn] = _ikkeLoggetInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            var resultat = await apiController.LoggInn(It.IsAny<Bruker>()) as OkObjectResult;

            // ASSERT
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.False((bool)resultat.Value);
        }

        /*
         * KOPIERT FRA FORELESNING "Enhentstest av KundeApp - logginn løsning"
         */
        [Fact]
        public void LoggUt()
        {
            // ARRANGE
            var apiController = new APIController(mockReiseRep.Object, mockBrukerRep.Object, mockLog.Object);

            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            mockSession[_loggetInn] = _loggetInn;
            apiController.ControllerContext.HttpContext = mockHttpContext.Object;

            // ACT
            apiController.LoggUt();

            // ASSERT
            Assert.Equal(_ikkeLoggetInn, mockSession[_loggetInn]);
        }
    }
}
