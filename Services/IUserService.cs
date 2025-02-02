using fl_backend.Models;
using fl_backend.Services;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using Microsoft.AspNetCore.Identity;
using fl_backend.Enumerations;

namespace fl_backend.Services
{
    public interface IUserService
    {
        UserModel UserLogin(string email, string password);
        UserModel AddUser(string email, string password, string first_name, string last_name, string date_of_birth,
                      decimal? annual_income, decimal? net_worth, decimal? chequing_balance, decimal? savings_balance,
                      decimal? monthly_expense, bool? is_home_owner, string occupation, bool is_student,
                      decimal? savings_goal, string investment_risk_profile, decimal? debt_amount,
                      int? credit_score, bool has_credit_card);
        UserModel GetUserById(int id);
        bool DeleteUser(int id);

        void AddUserInvestments(int userId, decimal? fhsaBalance, decimal? fhsaLimit, decimal? fhsaDeducted, decimal? fhsaInvested,
                               decimal? tfsaBalance, decimal? tfsaLimit, decimal? tfsaInvested,
                               decimal? rrspBalance, decimal? rrspLimit, decimal? rrspDeducted, decimal? rrspInvested,
                               decimal? unregisteredBalance);
    }
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailValidator _emailValidator;
        private readonly IPasswordHash _passwordHash;
        private readonly IFHSAService _fhsaService;
        private readonly ITFSAService _tfsaService;
        private readonly IRRSPService _rrspService;
        private readonly IUnregisteredService _unregisteredService;

        public UserService(IConfiguration configuration, IEmailValidator emailValidator, IPasswordHash passwordHasher,
            IFHSAService fhsaService, ITFSAService tfsaService, IRRSPService rrspService, IUnregisteredService unregisteredService)
        {
            _configuration = configuration;
            _emailValidator = emailValidator;
            _passwordHash = passwordHasher;
            _fhsaService = fhsaService;
            _tfsaService = tfsaService;
            _rrspService = rrspService;
            _unregisteredService = unregisteredService;
        }
        public UserModel UserLogin(string email, string password)
        {
            string hashedPassword = _passwordHash.HashPassword(password);
            if (!_emailValidator.IsValid(email))
            {
                return null; // Invalid email format
            }

            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = "SELECT * FROM user WHERE email = @Email LIMIT 1";
            var user = connection.QueryFirstOrDefault<UserModel>(sql, new { Email = email });

            if (user == null || hashedPassword != user.password)
            {
                return null; // User not found or password mismatch
            }

            return user;
        }
        public UserModel AddUser(string email, string password, string first_name, string last_name, string date_of_birth,
               decimal? annual_income, decimal? net_worth, decimal? chequing_balance, decimal? savings_balance,
               decimal? monthly_expense, bool? is_home_owner, string occupation, bool is_student,
               decimal? savings_goal, string investment_risk_profile, decimal? debt_amount,
               int? credit_score, bool has_credit_card)
        {
            if (!_emailValidator.IsValid(email))
            {
                throw new ArgumentException("Invalid email format.");
            }

            // Hash the password before storing it
            string hashedPassword = _passwordHash.HashPassword(password);

            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = @"
                INSERT INTO user (email, password, first_name, last_name, date_of_birth, annual_income, net_worth, 
                                chequing_balance, savings_balance, monthly_expense, is_home_owner, occupation, 
                                is_student, savings_goal, investment_risk_profile, debt_amount, credit_score, 
                                updated_at, has_credit_card)
                VALUES (@Email, @Password, @FirstName, @LastName, @DateOfBirth, @AnnualIncome, @NetWorth, 
                        @ChequingBalance, @SavingsBalance, @MonthlyExpense, @IsHomeOwner, @Occupation, 
                        @IsStudent, @SavingsGoal, @InvestmentRiskProfile, @DebtAmount, @CreditScore, NOW(), @HasCreditCard);
                SELECT LAST_INSERT_ID();";

            int userId = connection.ExecuteScalar<int>(sql, new
            {
                Email = email,
                Password = hashedPassword,
                FirstName = first_name,
                LastName = last_name,
                DateOfBirth = date_of_birth,
                AnnualIncome = annual_income,
                NetWorth = net_worth,
                ChequingBalance = chequing_balance,
                SavingsBalance = savings_balance,
                MonthlyExpense = monthly_expense,
                IsHomeOwner = is_home_owner,
                Occupation = occupation,
                IsStudent = is_student,
                SavingsGoal = savings_goal,
                InvestmentRiskProfile = investment_risk_profile,
                DebtAmount = debt_amount,
                CreditScore = credit_score,
                HasCreditCard = has_credit_card
            });

            //using var transaction = connection.BeginTransaction();
            //try
            //{
            //    var sql = @"
            //INSERT INTO user (email, password, first_name, last_name, date_of_birth, annual_income, net_worth, 
            //                chequing_balance, savings_balance, monthly_expense, is_home_owner, occupation, 
            //                is_student, savings_goal, investment_risk_profile, debt_amount, credit_score, 
            //                updated_at, has_credit_card)
            //VALUES (@Email, @Password, @FirstName, @LastName, @DateOfBirth, @AnnualIncome, @NetWorth, 
            //        @ChequingBalance, @SavingsBalance, @MonthlyExpense, @IsHomeOwner, @Occupation, 
            //        @IsStudent, @SavingsGoal, @InvestmentRiskProfile, @DebtAmount, @CreditScore, NOW(), @HasCreditCard);
            //SELECT LAST_INSERT_ID();";

            //    int userId = connection.ExecuteScalar<int>(sql, new
            //    {
            //        Email = email,
            //        Password = hashedPassword,
            //        FirstName = first_name,
            //        LastName = last_name,
            //        DateOfBirth = date_of_birth,
            //        AnnualIncome = annual_income,
            //        NetWorth = net_worth,
            //        ChequingBalance = chequing_balance,
            //        SavingsBalance = savings_balance,
            //        MonthlyExpense = monthly_expense,
            //        IsHomeOwner = is_home_owner,
            //        Occupation = occupation,
            //        IsStudent = is_student,
            //        SavingsGoal = savings_goal,
            //        InvestmentRiskProfile = investment_risk_profile,
            //        DebtAmount = debt_amount,
            //        CreditScore = credit_score,
            //        HasCreditCard = has_credit_card
            //    }, transaction);

            //    // Insert financial goals for the user
            //    if (financialGoals != null && financialGoals.Count > 0)
            //    {
            //        foreach (var goal in financialGoals)
            //        {
            //            AddGoal(userId, goal, connection, transaction);
            //        }
            //    }

            //    transaction.Commit();
            //    return GetUserById(userId);
            //}
            //catch (Exception ex)
            //{
            //    transaction.Rollback();
            //    throw new Exception($"Failed to add user: {ex.Message}"); ;
            //}

            return GetUserById(userId); // Return the newly added user
        }

        public UserModel GetUserById(int id)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = "SELECT id, email, first_name, last_name, date_of_birth, annual_income, net_worth, chequing_balance, savings_balance, monthly_expense, is_home_owner, occupation, is_student, savings_goal, investment_risk_profile, debt_amount, credit_score, updated_at, has_credit_card FROM user WHERE id = @Id LIMIT 1";
            return connection.QueryFirstOrDefault<UserModel>(sql, new { Id = id });
        }
        public bool DeleteUser(int id)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("MySqlDatabase"));
            connection.Open();

            var sql = "DELETE FROM user WHERE id = @Id";
            int rowsAffected = connection.Execute(sql, new { Id = id });

            return rowsAffected > 0;
        }
        private void AddGoal(int userId, Goal goal, MySqlConnection connection, MySqlTransaction transaction)
        {
            var sql = @"
        INSERT INTO financial_goal (user_id, goal) 
        VALUES (@UserId, @Goal);";

            connection.Execute(sql, new
            {
                UserId = userId,
                Goal = goal.ToString() // Convert enum to string before storing
            }, transaction);
        }

        public void AddUserInvestments(int userId, decimal? fhsaBalance, decimal? fhsaLimit, decimal? fhsaDeducted, decimal? fhsaInvested,
                               decimal? tfsaBalance, decimal? tfsaLimit, decimal? tfsaInvested,
                               decimal? rrspBalance, decimal? rrspLimit, decimal? rrspDeducted, decimal? rrspInvested,
                               decimal? unregisteredBalance)
        {
            // Check and add FHSA if the user has provided relevant data
            if (fhsaBalance.HasValue && fhsaLimit.HasValue && fhsaDeducted.HasValue && fhsaInvested.HasValue)
            {
                _fhsaService.AddFHSA(userId, fhsaBalance.Value, fhsaLimit.Value, fhsaDeducted.Value, fhsaInvested.Value);
            }

            // Check and add TFSA if the user has provided relevant data
            if (tfsaBalance.HasValue && tfsaLimit.HasValue && tfsaInvested.HasValue)
            {
                _tfsaService.AddTFSA(userId, tfsaBalance.Value, tfsaLimit.Value, tfsaInvested.Value);
            }

            // Check and add RRSP if the user has provided relevant data
            if (rrspBalance.HasValue && rrspLimit.HasValue && rrspDeducted.HasValue && rrspInvested.HasValue)
            {
                _rrspService.AddRRSP(userId, rrspBalance.Value, rrspLimit.Value, rrspDeducted.Value, rrspInvested.Value);
            }

            // Check and add Unregistered if the user has provided relevant data
            if (unregisteredBalance.HasValue)
            {
                _unregisteredService.AddUnregistered(userId, unregisteredBalance.Value);
            }
        }



    }
}
