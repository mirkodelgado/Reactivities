using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class EmployeeIt
    {
        [Key]
        public string EmployeeNumber { get; set; }

        [StringLength(20)]
        public string LoginName { get; set; }

        [StringLength(20)]
        public string LoginPassword { get; set; }

        public Boolean ItSetupCompleteCbx { get; set; }

        public DateTime? EquipmentShippedDate { get; set; }

        [StringLength(60)]
        public string EquipmentShippedDescription { get; set; }

        [StringLength(60)]
        public string TrackingNumber { get; set; }

        public Int16 Monitors { get; set; }

        [StringLength(60)]
        public string MonitorCablesAdapters { get; set; }

        public Boolean UserInEmergencyAlertSystem { get; set; }

        public Boolean Desktop { get; set; }

        [StringLength(60)]
        public string DesktopModel { get; set; }

        public Boolean Laptop { get; set; }
        public Boolean LaptopDockingStation { get; set; }

        [StringLength(60)]
        public string LaptopModel { get; set; }

        public Boolean Keyboard { get; set; }
        public Boolean Mouse { get; set; }
        public Boolean Speakers { get; set; }

        public Boolean NeworkCables { get; set; }
        public Boolean PowerCables { get; set; }
        public Boolean PowerStrip { get; set; }

        public Boolean DeskPhone { get; set; }

        [StringLength(60)]
        public string DeskPhoneExtension { get; set; }

        public Boolean StipendFormReceived { get; set; }
        public Boolean PhoneAgreementReceived { get; set; }
        public Boolean MobilePhoneOrdered { get; set; }

        [StringLength(60)]
        public string MobilePhoneNumber { get; set; }

        public Int16 MobileNumberPorted { get; set; }

        [StringLength(200)]
        public string AdditionalEquipment { get; set; }

        public Boolean ExistingEquipmentCbx { get; set; }
    }
}