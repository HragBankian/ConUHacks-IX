using Microsoft.AspNetCore.Identity;

namespace fl_backend.Services
{
    public interface IPasswordHash
    {
        string HashPassword(string password);
    }

    public class PasswordHash : IPasswordHash
    {
        public string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }
}
