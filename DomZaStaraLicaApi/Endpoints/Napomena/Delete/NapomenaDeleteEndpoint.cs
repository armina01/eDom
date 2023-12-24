using DomZaStaraLicaApi.Data;
using DomZaStaraLicaApi.Helper;
using Microsoft.AspNetCore.Mvc;

namespace DomZaStaraLicaApi.Endpoints.Napomena.Delete
{
    [Route("napomena/obrisi")]
        public class NapomenaDeleteEndpoint : MyBaseEndpoint<NapomenaDeleteRequest, NoResponse>
        {
            private readonly ApplicationDbContext _applicationDbContext;

            public NapomenaDeleteEndpoint(ApplicationDbContext applicationDbContext)
            {
                _applicationDbContext = applicationDbContext;
            }

            [HttpDelete]
            public override async Task<NoResponse> Obradi([FromQuery] NapomenaDeleteRequest request)
            {

                var napomena = _applicationDbContext.Napomena.FirstOrDefault(x => x.NapomenaId == request.NapomenaId);

                if (napomena == null)
                {
                    throw new Exception("nije pronadjena napomena za id = " + request.NapomenaId);
                }

                _applicationDbContext.Remove(napomena);
                await _applicationDbContext.SaveChangesAsync();

                return new NoResponse
                {

                };
            }
        }
 }
