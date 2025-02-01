namespace fl_backend.Models
{
    using System;
    public class FHSAModel
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public decimal current_balance { get; set; }
        public decimal fhsa_limit { get; set; }  // renamed to match the previous column name change
        public decimal deducted_amount { get; set; }
        public decimal invested_amount { get; set; }
    }

}
