using fl_backend.Models;
using MySql.Data.MySqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace fl_backend.Services
{
    public interface IUnregisteredService
    {
        UnregisteredModel AddUnregistered(int userId, decimal currentBalance);
        UnregisteredModel GetUnregisteredByUserId(int userId);
    }
    public class UnregisteredService : IUnregisteredService
    {
        private readonly IConfiguration _configuration;

        public UnregisteredService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public UnregisteredModel AddUnregistered(int userId, decimal currentBalance)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                INSERT INTO unregistered_account (user_id, current_balance) 
                VALUES (@UserId, @CurrentBalance);
                SELECT LAST_INSERT_ID();";

            int id = connection.ExecuteScalar<int>(sql, new
            {
                UserId = userId,
                CurrentBalance = currentBalance
            });

            return GetUnregisteredByUserId(userId);
        }

        public UnregisteredModel GetUnregisteredByUserId(int userId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                SELECT * FROM unregistered_account 
                WHERE user_id = @UserId 
                LIMIT 1;";

            return connection.QueryFirstOrDefault<UnregisteredModel>(sql, new { UserId = userId });
        }
    }
}
