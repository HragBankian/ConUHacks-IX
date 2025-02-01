using MySql.Data.MySqlClient;
using System.Text.RegularExpressions;
using Dapper;

namespace fl_backend.Services
{
    public interface IEmailValidator
    {
        bool IsValid(string email);
        bool AddEmailIsUnique(string email);
        //bool EditEmailIsUnique(string email, int userId);
    }
    public class EmailValidator : IEmailValidator
    {
        private readonly IConfiguration _configuration;

        public EmailValidator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool IsValid(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            string pattern = @"^[^@\s]+@[^@\s]+\.(com|ca)$";
            return Regex.IsMatch(email, pattern, RegexOptions.IgnoreCase);
        }

        public bool AddEmailIsUnique(string email)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            string sql = "SELECT COUNT(1) FROM user WHERE email = @Email"; // Query to count how many records have the same email
            int count = connection.ExecuteScalar<int>(sql, new { Email = email });
            return count == 0; // Return true if email is unique (i.e., no matching record)
        }

        public bool EditEmailIsUnique(string email, int customerId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            string sql = "SELECT COUNT(1) FROM user WHERE email = @Email AND id != @Id"; // Query to exclude the user with the given customerId
            int count = connection.ExecuteScalar<int>(sql, new { Email = email, Id = customerId });
            return count == 0; // Return true if email is unique
        }
    }
}
