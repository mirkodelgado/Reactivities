using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Safety
{
    [Table("jobsight_jobnumber")]
    public class JobNumber
    {
        [Key]
        public Int32 Id { get; set; }

        [Required, StringLength(200), Column("number")]
        public string ProjectNumber { get; set; }

        [Column("projectManager_id")]
        public Int32 ProjectManagerId { get; set; }

    }
}