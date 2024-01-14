namespace DomZaStaraLicaApi.Endpoints.Medicine.Update
{
    public class MedicineUpdateRequest
    {
        public int LijekId { get; set; }
        public string Naziv { get; set; }
        public string Uputstvo { get; set; }
    }
}
