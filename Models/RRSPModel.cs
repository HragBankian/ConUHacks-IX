namespace fl_backend.Models
{
    using System;

    public class RRSPModel
    {
        public int id { get; set; }
        public int user_id { get; set; }  // Foreign key referencing the "user" table
        public decimal current_balance { get; set; }
        public decimal rrsp_limit { get; set; }
        public decimal deducted_amount { get; set; }
        public decimal invested_amount { get; set; }
    }

}
