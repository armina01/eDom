using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace DomZaStaraLicaApi.Helper
{
    public class EncryptPassword
    {
        public static string encryptPassword(string password)
        {
            byte[] salt = new byte[128 / 8]; // Generate a 128-bit salt using a secure PRNG
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string encryptedPassw = Convert.ToBase64String(KeyDerivation.Pbkdf2(
             password: password,
             salt: salt,
             prf: KeyDerivationPrf.HMACSHA1,
             iterationCount: 10000,
             numBytesRequested: 256 / 8
            ));

            return encryptedPassw;
        }
    }
}
