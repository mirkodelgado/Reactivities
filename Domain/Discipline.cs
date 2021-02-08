using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Discipline
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Int16 Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string DisciplineName { get; set; }

        //public short OrderId { get; set; }     
        
    }
}