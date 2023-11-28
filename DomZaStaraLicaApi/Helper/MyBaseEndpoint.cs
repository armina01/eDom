using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Helper
{
    [ApiController]
    public abstract class MyBaseEndpoint<TRequest, TResponse> : ControllerBase
    {
        public abstract Task<TResponse> Obradi(TRequest request);
    }
}
