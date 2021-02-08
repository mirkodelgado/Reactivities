using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Employee
    {
        [Key]
        public string Number { get; set; }

        //[Required]
        //[StringLength(40)]
        public string FirstName { get; set; }

        //[Required]
        //[StringLength(40)]
        public string LastName { get; set; }

        public DateTime? StartDate { get; set; }

        //[Required]
        public Int16 Office { get; set; }

        //[Required]
        public Int16 Location { get; set; }

        //[StringLength(40)]
        public string PWLocation { get; set; }

        public Int16 EmployeeType { get; set; }
        public Int16  Discipline { get; set; }
        public Int16  SF330Discipline { get; set; }
        public Int16  BillingTitle { get; set; }

        //[StringLength(40)]
        public string JobTitle { get; set; }
        public Int16  Designation { get; set; }

        //[StringLength(40)]
        public string ManagerName { get; set; }

        //[StringLength(60)]
        public string ManagerEmail { get; set; }
        public Int16  CompanyCode { get; set; }

        //[StringLength(40)]
        public string AdminAssistant { get; set; }

        //[StringLength(200)]
        public string SSNeeded { get; set; }

        //[StringLength(200)]
        public string SHNeeded { get; set; }

        //[StringLength(200)]
        public string SeatingArrangement { get; set; }

        //[Required]
        //[StringLength(20)]
        public string TypeTechnical { get; set; }
        
        public Boolean DidNotAcceptCbx { get; set; }

        public Boolean TypeCbxMPosition { get; set; }
        public Boolean TypeCbxUnion { get; set; }
        public Boolean TypeCbxBManager { get; set; }
        public Boolean TypeCbxNewHire { get; set; }
        public Boolean TypeCbxReHire { get; set; }
        public Boolean TypeCbxETChange { get; set; }
        public Boolean TypeCbxESAMTraining { get; set; }
        public Boolean TypeCbxTransfer { get; set; }

        public Boolean GOTCbxMNFStandards { get; set; }
        public Boolean GOTCbxTEExpenses { get; set; }
        public Boolean GOTCbxMInternet { get; set; }

        public Boolean CVCbxEDMVehicle { get; set; }
        public Boolean CVCbxEAMVehicle { get; set; }
        public Boolean CVCbxGasCard { get; set; }
        public Boolean cvCbxEZPass { get; set; }

        public Int16 E52Week { get; set; }
        public Int16 E48Week { get; set; }

        public Boolean INCbxBCards { get; set; }
        public Boolean INCbxSPhone { get; set; }
        public Boolean INCbxPResume { get; set; }
        public Boolean INCbxLaptop { get; set; }        // Office Laptop

        public Boolean INCbxFieldLaptop { get; set; }

        public Boolean INCbxDesktop { get; set; }
        public Boolean INCbxUsbAccess { get; set; }
        public Boolean INCbxDPhone { get; set; }
        public Boolean INCbxOther { get; set; }

        //[StringLength(40)]
        public string INTxtOther { get; set; }

        public Boolean INCbxMeetWithMarketing { get; set; }

        public Boolean SECbxHHats { get; set; }
        public Boolean SECbxSVests { get; set; }
        public Boolean SECbxSGlasses { get; set; }
        public Boolean SECbxOther { get; set; }

        public Int16 SEHatColor { get; set; }
        public Int16 SENeededType { get; set; }
        public Int16 SESize { get; set; }

        //[StringLength(40)]
        public string SETxtOther { get; set; }

        public string EmployeeNumber { get; set; }

        public EmployeeTraining EmployeeTraining { get; set; }
        public EmployeeIt EmployeeIt { get; set; }
        public EmployeeHr EmployeeHr { get; set; }


        //[StringLength(40)]
        public string ClientName { get; set; }

        //[StringLength(40)]
        public string ProjectName { get; set; }

        //[StringLength(40)]
        public string JobSiteLocation { get; set; }

        //[StringLength(40)]
        public string ProjectNumber { get; set; }

        public Int16 PerDiem { get; set; }

        //[StringLength(40)]
        public string PerDiemTxt { get; set; }

        //[StringLength(40)]
        public Int16 MileageRate { get; set; }

        public string MileageRateTxt { get; set; }

        public Int16 CellPhone { get; set; }
        public Int16 Computer { get; set; }
        public Int16 Mileage { get; set; }

        //[StringLength(200)]
        public string Comments { get; set; }

        //[StringLength(40)]
        public string UpdatedByName { get; set; }

        //[StringLength(60)]
        public string UpdatedByEmail { get; set; }

        public DateTime? UpdateDate { get; set; }

        //[StringLength(40)]
        public string CreatedByName { get; set; }

        //[StringLength(60)]
        public string CreatedByEmail { get; set; }

        public DateTime CreateDate { get; set; }
         
    }
}