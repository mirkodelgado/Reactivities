using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class EmployeeTraining
    {
        [Key]
        public string EmployeeNumber { get; set; }

        public Boolean HSTCbxSSLeader { get; set; }
        public Boolean HSTCbxRFSafety { get; set; }
        public Boolean HSTCbxOsha10Safety { get; set; }
        public Boolean HSTCbxOsha24HazWoper { get; set; }
        public Boolean HSTCbxOsha40HazWoper { get; set; }

        public Boolean HSTCbxOsha8HazWoper { get; set; }
        public Boolean HSTCbxFProtection { get; set; }
        public Boolean HSTCbxCSpace { get; set; }
        public Boolean HSTCbxASLift { get; set; }
        public Boolean HSTCbxAHSCTraining { get; set; }

        public Boolean HSTCbxCprFirstAid { get; set; }
        public Boolean HSTCbxHProtection { get; set; }
        public Boolean HSTCbxESurveyors { get; set; }
        public Boolean HSTCbxRSManagers { get; set; }
        public Boolean HSTCbxOther { get; set; }

        [StringLength(40)]
        public string HSTTxtOther { get; set; }

        public Boolean BSTTCbxPInitiation { get; set; }
        public Boolean BSTTCbxAPayable { get; set; }
        public Boolean BSTTCbxARCllections { get; set; }
        public Boolean BSTTCbxBilling { get; set; }
        public Boolean BSTTCbxIReports { get; set; }
        public Boolean BSTTCbxPortals { get; set; }

        public Boolean TDCbxCStandards { get; set; }
        public Boolean TDCbxSWorkflow { get; set; }
        public Boolean TDCbxSurfaces { get; set; }
        public Boolean TDCbxAlignments { get; set; }
        public Boolean TDCbxProfiles { get; set; }
        public Boolean TDCbxPNetworks { get; set; }
        public Boolean TDCbxCSections { get; set; }
        public Boolean TDCbxParcels { get; set; }

    }
}