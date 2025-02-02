using fl_backend.Models;
using MySql.Data.MySqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;


namespace fl_backend.Services
{
    public interface ITFSAService
    {
        TFSAModel AddTFSA(int userId, decimal currentBalance, decimal tfsaLimit, decimal investedAmount);
        decimal CalculateTFSALimit(int userId);
        TFSAModel GetTFSAByUserId(int userId);
    }
    public class TFSAService : ITFSAService
    {
        private readonly IConfiguration _configuration;

        public TFSAService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public TFSAModel AddTFSA(int userId, decimal currentBalance, decimal tfsaLimit, decimal investedAmount)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                INSERT INTO TFSA (user_id, current_balance, tfsa_limit, invested_amount) 
                VALUES (@UserId, @CurrentBalance, @TFSALimit, @InvestedAmount);
                SELECT LAST_INSERT_ID();";

            int id = connection.ExecuteScalar<int>(sql, new
            {
                UserId = userId,
                CurrentBalance = currentBalance,
                TFSALimit = tfsaLimit,
                InvestedAmount = investedAmount
            });

            return GetTFSAByUserId(userId);
        }

        public decimal CalculateTFSALimit(int userId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                SELECT SUM(invested_amount) 
                FROM TFSA 
                WHERE user_id = @UserId;";

            decimal totalInvested = connection.ExecuteScalar<decimal>(sql, new { UserId = userId });

            // Assume a static yearly TFSA contribution limit (example: 6500)
            decimal yearlyLimit = 6500m;
            decimal remainingLimit = yearlyLimit - totalInvested;

            return remainingLimit > 0 ? remainingLimit : 0;
        }

        public TFSAModel GetTFSAByUserId(int userId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                SELECT * FROM TFSA 
                WHERE user_id = @UserId 
                LIMIT 1;";

            return connection.QueryFirstOrDefault<TFSAModel>(sql, new { UserId = userId });
        }
    }
}
