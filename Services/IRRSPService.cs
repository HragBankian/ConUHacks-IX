using fl_backend.Models;
using MySql.Data.MySqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace fl_backend.Services
{
    public interface IRRSPService
    {
        RRSPModel AddRRSP(int userId, decimal currentBalance, decimal rrspLimit, decimal deductedAmount, decimal investedAmount);
        RRSPModel GetRRSPByUserId(int userId);
    }
    public class RRSPService : IRRSPService
    {
        private readonly IConfiguration _configuration;

        public RRSPService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public RRSPModel AddRRSP(int userId, decimal currentBalance, decimal rrspLimit, decimal deductedAmount, decimal investedAmount)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                INSERT INTO RRSP (user_id, current_balance, rrsp_limit, deducted_amount, invested_amount) 
                VALUES (@UserId, @CurrentBalance, @RRSPLimit, @DeductedAmount, @InvestedAmount);
                SELECT LAST_INSERT_ID();";

            int id = connection.ExecuteScalar<int>(sql, new
            {
                UserId = userId,
                CurrentBalance = currentBalance,
                RRSPLimit = rrspLimit,
                DeductedAmount = deductedAmount,
                InvestedAmount = investedAmount
            });

            return GetRRSPByUserId(userId);
        }

        public RRSPModel GetRRSPByUserId(int userId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                SELECT * FROM RRSP 
                WHERE user_id = @UserId 
                LIMIT 1;";

            return connection.QueryFirstOrDefault<RRSPModel>(sql, new { UserId = userId });
        }
    }
}
