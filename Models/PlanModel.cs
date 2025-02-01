namespace fl_backend.Models
{
    using System;

    public class PlanModel
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string overview { get; set; }
        public string RRSP_plan { get; set; }
        public string TFSA_plan { get; set; }
        public string FHSA_plan { get; set; }
        public string unregistered_plan { get; set; }
        public decimal RRSP_amount { get; set; }
        public decimal TFSA_amount { get; set; }
        public decimal FHSA_amount { get; set; }
        public decimal unregistered_amount { get; set; }
    }

}
