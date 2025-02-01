namespace fl_backend.Models
{
    using System;

    public class UnregisteredModel
    {
        public int id { get; set; }
        public int user_id { get; set; }  // Foreign key referencing the "user" table
        public decimal current_balance { get; set; }
    }

}
