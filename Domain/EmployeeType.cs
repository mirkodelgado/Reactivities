using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class EmployeeType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Int16 Id { get; set; }

        [Required]
        [StringLength(50)]
        public string EmployeeTypeName { get; set; }
   }
}