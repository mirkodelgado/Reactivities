using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Safety
{
    [Table("jobsight_checklist")]
    public class Checklist
    {
        //[Key]
        public Int32 Id { get; set; }

        [Required, StringLength(200), Column("title")]
        public string Discipline { get; set; }

        public DateTime EstimatedStartDate { get; set; }
        public DateTime EstimatedCompletionDate { get; set; }

        [Column("siteSafetyLeader_id")]
        public Int32? SiteSafetyLeaderId { get; set; }
        public AuthUser SiteSafetyLeader { get; set; }


        [Column("jobNumber_id")]
        public Int32 JobNumberId { get; set; }
        public JobNumber JobProjectManager { get; set; }


        [Column("emergencyCoordinator_id")]
        public Int32? EmergencyCoordinatorId { get; set; }
        public AuthUser EmergencyCoordinator { get; set; }


        [Required, StringLength(200)]
        public string EmergencyMedicalFacility { get; set; }

        [Required, StringLength(20)]
        public string EmergencyReportingNumber { get; set; }

        [Required]
        public string EmergencySignal { get; set; }

        [Required]
        public string EvacRouteAndMusterPoint { get; set; }

        [Required]
        public string MedicalFacilityAddressNum { get; set; }

    }
}