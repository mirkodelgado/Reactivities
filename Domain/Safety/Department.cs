using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Domain.Safety;

namespace Domain
{
    [Table("jobsight_department")]   
    public class Department
    {
        [Key]
        public Int32 Id { get; set; }

        [Required, StringLength(70)]
        public string Name { get; set; }

        [Column("fsa_completion_target")]
        public Int32? FsaCompletionTarget { get; set; }

        [Column("safety_coordinator_id")]
        public Int32? SafetyCoordinatorId { get; set; }

        public AuthUser SafetyCoordinator { get; set; }

        public Boolean Subdiscipline { get; set; }
    }
}