using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace DomZaStaraLicaApi.Helper
{
    public class MyAuthService
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MyAuthService(ApplicationDbContext applicationDbContext, IHttpContextAccessor? httpContextAccessor)
        {
            _applicationDbContext = applicationDbContext;
            _httpContextAccessor = httpContextAccessor;
        }
        public bool JelLogiran()
        {
            return GetAuthInfo().isLogiran;
        }

        public MyAuthInfo GetAuthInfo()
        {
            string? authToken = _httpContextAccessor.HttpContext!.Request.Headers["my-auth-token"];

            AuthToken? autentifikacijaToken = _applicationDbContext.AuthToken
                .Include(x => x.korisnickiNalog)
                .SingleOrDefault(x => x.vrijednost == authToken);

            return new MyAuthInfo(autentifikacijaToken);
        }
    }
    public class MyAuthInfo
    {
        public MyAuthInfo(AuthToken? autentifikacijaToken)
        {
            this.autentifikacijaToken = autentifikacijaToken;
        }

        [JsonIgnore]
        public KorisnickiNalog? korisnickiNalog => autentifikacijaToken?.korisnickiNalog;
        public AuthToken? autentifikacijaToken { get; set; }

        public bool isLogiran => korisnickiNalog != null;

    }
}
