using fl_backend.Services;
using Microsoft.AspNetCore.Mvc;
using fl_backend.Models;
using fl_backend.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace fl_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // User login endpoint
        [HttpPost("login")]
        public IActionResult UserLogin(string email, string password)
        {
            var user = _userService.UserLogin(email, password);

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
                                      int? credit_score, bool has_credit_card)
        {
            try
            {
                var user = _userService.AddUser(email, password, first_name, last_name, date_of_birth, annual_income, net_worth,
                                                chequing_balance, savings_balance, monthly_expense, is_home_owner, occupation,
                                                is_student, savings_goal, investment_risk_profile, debt_amount, credit_score, has_credit_card);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
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
    }
}