namespace DomZaStaraLicaApi.Helper
{
    public static class Class
    {
        public static byte[] ParsirajBase64(this string base64string)
        {
            base64string = base64string.Split(',')[1];
            return System.Convert.FromBase64String(base64string);
        }
    }
}
