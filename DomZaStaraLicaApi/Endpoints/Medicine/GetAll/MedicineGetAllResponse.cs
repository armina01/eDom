namespace DomZaStaraLicaApi.Endpoints.Medicine.GetAll
{
    public class MedicineGetAllResponse
    {
        public List<MedicineGetAllResponseLijek> Lijekovi { get; set; }    
    }

    public class MedicineGetAllResponseLijek
    {
        public int LijekId { get; set; }
        public string Naziv { get; set; }
        public string Uputstvo { get; set; }
    }

}
