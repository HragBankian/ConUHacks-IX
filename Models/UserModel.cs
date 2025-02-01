using fl_backend.Enumerations;
namespace fl_backend.Models
{
    using System;
    public class UserModel
    {
        public int id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public DateTime date_of_birth { get; set; }
        public decimal? annual_income { get; set; }
        public decimal? net_worth { get; set; }
        public decimal? chequing_balance { get; set; }
        public decimal? savings_balance { get; set; }
        public decimal? monthly_expense { get; set; }
        public bool? is_home_owner { get; set; }
        public Occupation occupation { get; set; }
        public bool is_student { get; set; }
        public decimal? savings_goal { get; set; }
        public InvestmentRiskProfile investment_risk_profile { get; set; }
        public decimal? debt_amount { get; set; }
        public int? credit_score { get; set; }
        public DateTime updated_at { get; set; }
        public bool has_credit_card { get; set; }
    }
}
