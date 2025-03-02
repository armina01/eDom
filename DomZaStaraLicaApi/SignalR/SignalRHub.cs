using Microsoft.AspNetCore.SignalR;

namespace DomZaStaraLicaApi.SignalR
{
    public class SignalRHub: Hub
    {
        public override Task OnConnectedAsync()
        {
            Console.WriteLine(this.Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public async Task PridruziSeGrupi(string Njegovatelji)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, Njegovatelji);
            Console.WriteLine($"Korisnik {Context.ConnectionId} se pridružio grupi: {Njegovatelji}");
        }
    }
}
