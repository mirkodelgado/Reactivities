using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Safety
{
    [Table("jobsight_hazard")]
    public class Hazzard
    {
        [Key]
        public Int32 Id { get; set; }

        [Required, StringLength(2)]
        public string Situation { get; set; }

        [Required, StringLength(140)]
        public string Name { get; set; }

        [Column("jobNumber_id")]
        public Int32? JobNumberId { get; set; }
    }
}