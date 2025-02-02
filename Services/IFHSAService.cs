using fl_backend.Models;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System;
using Dapper;

namespace fl_backend.Services
{
    public interface IFHSAService
    {
        FHSAModel AddFHSA(int userId, decimal currentBalance, decimal fhsa_limit, decimal deductedAmount, decimal investedAmount);
        FHSAModel GetFHSAByUserId(int userId);
        decimal CalculateLimit(int userId);
        decimal CalculateTotalInvested(int userId);
    }

    public class FHSAService : IFHSAService
    {
        private readonly IConfiguration _configuration;

        public FHSAService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Add new FHSA record
        public FHSAModel AddFHSA(int userId, decimal currentBalance, decimal limit, decimal deductedAmount, decimal investedAmount)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();
            Console.WriteLine($"UserId: {userId}, CurrentBalance: {currentBalance}, Limit: {limit}, DeductedAmount: {deductedAmount}, InvestedAmount: {investedAmount}");

            var sql = @"
        INSERT INTO FHSA (user_id, current_balance, fhsa_limit, deducted_amount, invested_amount) 
        VALUES (@UserId, @CurrentBalance, @Limit, @DeductedAmount, @InvestedAmount);
        SELECT LAST_INSERT_ID();";

            int id = connection.ExecuteScalar<int>(sql, new
            {
                UserId = userId,
                CurrentBalance = currentBalance,
                Limit = limit,
                DeductedAmount = deductedAmount,
                InvestedAmount = investedAmount
            });

            // Return the newly added FHSA entry
            return GetFHSAByUserId(userId);
        }


        // Get FHSA by User ID
        public FHSAModel GetFHSAByUserId(int userId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = "SELECT * FROM FHSA WHERE user_id = @UserId LIMIT 1";
            var fhsa = connection.QueryFirstOrDefault<FHSAModel>(sql, new { UserId = userId });

            return fhsa;
        }

        public decimal CalculateLimit(int userId)
        {
            // Example calculation logic, can be customized based on requirements
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = "SELECT SUM(deducted_amount) FROM FHSA WHERE user_id = @UserId";
            var totalDeducted = connection.ExecuteScalar<decimal>(sql, new { UserId = userId });

            decimal limit = 5000 - totalDeducted;
            return limit;
        }

        // Calculate the total invested amount in FHSA for a user
        public decimal CalculateTotalInvested(int userId)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = "SELECT SUM(invested_amount) FROM FHSA WHERE user_id = @UserId";
            var totalInvested = connection.ExecuteScalar<decimal>(sql, new { UserId = userId });

            return totalInvested;
        }
    }
}
