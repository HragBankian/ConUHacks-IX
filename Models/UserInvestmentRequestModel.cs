namespace fl_backend.Models
{
    public class UserInvestmentRequestModel
    {
        public decimal? FHSABalance { get; set; }
        public decimal? FHSALimit { get; set; }
        public decimal? FHSADeducted { get; set; }
        public decimal? FHSAMoneyInvested { get; set; }

        public decimal? TFSABalance { get; set; }
        public decimal? TFSALimit { get; set; }
        public decimal? TFSAInvested { get; set; }

        public decimal? RRSPBalance { get; set; }
        public decimal? RRSPLimit { get; set; }
        public decimal? RRSPDeducted { get; set; }
        public decimal? RRSPInvested { get; set; }

        public decimal? UnregisteredBalance { get; set; }
        public decimal? UnregisteredInvested { get; set; }
    }

}
