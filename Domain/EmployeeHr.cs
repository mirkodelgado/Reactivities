using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class EmployeeHr
    {
        [Key]
        public string EmployeeNumber { get; set; }

        [Required]
        public Int16 HrRepresentative { get; set; }

        [Required]
        public Int16 RateType { get; set; }

        [StringLength(20)]
        public string PayRate { get; set; }

        public Boolean HalogenUser { get; set; }

        [StringLength(20)]
        public string HoursWeek { get; set; }

        [StringLength(20)]
        public string AdpFileNumber { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        public Boolean HrSetupCompleteCbx { get; set; }


        public DateTime? WelcomeEmailSentDate { get; set; }

        public Int16 PhoneOption { get; set; }

        public DateTime? PhoneOptionDate { get; set; }

        public Int16 GasCardezPass { get; set; }
        public DateTime? GasCardezPassDate { get; set; }

        public Int16 BusinessCard { get; set; }
        public DateTime? BusinessCardDate { get; set; }

        public DateTime? OrientationDate { get; set; }
        public DateTime? OrientationDateSetDate { get; set; }

        public Int16 ProfessionalResume { get; set; }
        public DateTime? ProfessionalResumeDate { get; set; }

        [StringLength(80)]
        public string MeetwithMarketing { get; set; }

        [StringLength(80)]
        public string WelcomeBagSent { get; set; }

        [StringLength(80)]
        public string TravelForOrientation { get; set; }

        [StringLength(80)]
        public string ReportOnFirstDayTime { get; set; }

        public Boolean I9LinkCbx { get; set; }
        public Boolean RvTrainingCompleteCbx { get; set; }
        public Boolean AddedToRvCbx { get; set; }
        public Boolean CccCompanyManualCbx { get; set; }

        public Boolean HrOnboardingCompleteCbx { get; set; }
    }
}