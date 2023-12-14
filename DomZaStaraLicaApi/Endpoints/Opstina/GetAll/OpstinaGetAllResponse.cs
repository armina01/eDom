namespace DomZaStaraLicaApi.Endpoints.Opstina.GetAll
{
    public class OpstinaGetAllResponse
    {

        public List<OpstinaGetAllResponseOpstina> Opstine { get; set; }

    }   

    public class OpstinaGetAllResponseOpstina
    {
        public int OpstinaID { get; set; }
        public string NazivOpstine { get; set; }
        public int PostanskiBroj { get; set; }

    }
    
}
