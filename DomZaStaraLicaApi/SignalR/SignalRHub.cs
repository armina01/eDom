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
    }
}
