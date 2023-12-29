namespace DomZaStaraLicaApi.Endpoints.FileEndpoint.DodajFile
{
    public class GetFileResponse
    {
        public List<GetFileResponseFile> Files { get; set; }
    }
    public class GetFileResponseFile
    {
        public int FileId { get; set; }
        public string ImeFile { get; set; }
    }
}
