using fl_backend.Services;
using Microsoft.AspNetCore.Mvc;
using fl_backend.Models;
using System;
using fl_backend.Enumerations;
using Microsoft.AspNetCore.Identity.Data;

namespace fl_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IFHSAService _fhsaService;
        private readonly ITFSAService _tfsaService;
        private readonly IRRSPService _rrspService;
        private readonly IUnregisteredService _unregisteredService;

        public UserController(IUserService userService, IFHSAService fhsaService, ITFSAService tfsaService, IRRSPService rrspService, IUnregisteredService unregisteredService)
        {
            _userService = userService;
            _fhsaService = fhsaService;
            _tfsaService = tfsaService;
            _rrspService = rrspService;
            _unregisteredService = unregisteredService;
        }

        // User login endpoint
        [HttpPost("login")]
        public IActionResult UserLogin([FromBody] LoginRequest loginRequest)
        {
            var user = _userService.UserLogin(loginRequest.Email, loginRequest.Password);

            if (user != null)
            {
                // Login successful, return the user details
                return Ok(user);
            }
            else
            {
                // Login failed
                return Unauthorized(new { message = "Invalid email or password" });
            }
        }

        // Add new user endpoint
        [HttpPost("add")]
        public IActionResult AddUser(string email, string password, string first_name, string last_name, string date_of_birth,
               decimal? annual_income, decimal? net_worth, decimal? chequing_balance, decimal? savings_balance,
               decimal? monthly_expense, bool? is_home_owner, string occupation, bool is_student,
               decimal? savings_goal, string investment_risk_profile, decimal? debt_amount,
               int? credit_score, bool has_credit_card, List<Goal> goals)
        {
            try
            {
                var user = _userService.AddUser(email, password, first_name, last_name, date_of_birth, annual_income, net_worth,
                                                chequing_balance, savings_balance, monthly_expense, is_home_owner, occupation,
                                                is_student, savings_goal, investment_risk_profile, debt_amount, credit_score, has_credit_card, goals);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }

        // Get user by ID
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // Delete user endpoint
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            bool deleted = _userService.DeleteUser(id);
            if (!deleted) return NotFound();
            return Ok(new { message = "User deleted successfully" });
        }

        // Update user details
        //[HttpPut("edit/{id}")]
        //public IActionResult EditUser(int id, string email, string password, string first_name, string last_name,
        //                               string date_of_birth, decimal? annual_income, decimal? net_worth,
        //                               decimal? chequing_balance, decimal? savings_balance, decimal? monthly_expense,
        //                               bool? is_home_owner, string occupation, bool is_student, decimal? savings_goal,
        //                               string investment_risk_profile, decimal? debt_amount, int? credit_score, bool has_credit_card)
        //{
        //    try
        //    {
        //        var user = _userService.EditUser(id, email, password, first_name, last_name, date_of_birth, annual_income,
        //                                         net_worth, chequing_balance, savings_balance, monthly_expense, is_home_owner,
        //                                         occupation, is_student, savings_goal, investment_risk_profile, debt_amount,
        //                                         credit_score, has_credit_card);
        //        return Ok(user);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}







        [HttpPost("add-investments/{userId}")]
        public IActionResult AddInvestments(int userId, [FromBody] UserInvestmentRequestModel request)
        {
            try
            {
                // Call the service to add the investments
                _userService.AddUserInvestments(
                    userId,
                    request.FHSABalance, request.FHSALimit, request.FHSADeducted, request.FHSAMoneyInvested,
                    request.TFSABalance, request.TFSALimit, request.TFSAInvested,
                    request.RRSPBalance, request.RRSPLimit, request.RRSPDeducted, request.RRSPInvested,
                    request.UnregisteredBalance
                );

                return Ok(new { message = "Investments added successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("fhsa/{userId}")]
        public IActionResult GetFHSAByUserId(int userId)
        {
            try
            {
                var fhsa = _fhsaService.GetFHSAByUserId(userId);
                if (fhsa == null)
                {
                    return NotFound(new { message = "FHSA not found for this user" });
                }
                return Ok(fhsa);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("tfsa/{userId}")]
        public IActionResult GetTFSAByUserId(int userId)
        {
            try
            {
                var tfsa = _tfsaService.GetTFSAByUserId(userId);
                if (tfsa == null)
                {
                    return NotFound(new { message = "TFSA not found for this user" });
                }
                return Ok(tfsa);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("rrsp/{userId}")]
        public IActionResult GetRRSPByUserId(int userId)
        {
            try
            {
                var rrsp = _rrspService.GetRRSPByUserId(userId);
                if (rrsp == null)
                {
                    return NotFound(new { message = "RRSP not found for this user" });
                }
                return Ok(rrsp);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("unregistered/{userId}")]
        public IActionResult GetUnregisteredByUserId(int userId)
        {
            try
            {
                var unregistered = _unregisteredService.GetUnregisteredByUserId(userId);
                if (unregistered == null)
                {
                    return NotFound(new { message = "Unregistered account not found for this user" });
                }
                return Ok(unregistered);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("goals/{userId}")]
        public IActionResult GetGoals(int userId)
        {
            try
            {
                var goals = _userService.GetGoalsByUserId(userId);
                return Ok(goals);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }



    }
}