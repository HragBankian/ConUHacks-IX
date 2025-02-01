using fl_backend.Enumerations;
namespace fl_backend.Models
{
    public class FinancialGoalModel
    {
        public int id { get; set; }
        public int user_id { get; set; }  // Foreign key referencing the "user" table
        public Goal goal { get; set; }
    }
}
