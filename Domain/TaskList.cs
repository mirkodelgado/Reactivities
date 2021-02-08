using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    [Table("tasklist")]
    public class TaskList
    {
        [Key]
        [Column("task_code")]
        public string TaskCode { get; set; }

        [Column("task_name")]
        public string TaskName { get; set; }

        [Column("prj_code")]
        public string ProjectCode { get; set; }

        [Column("effectivestatus")]
        public string EffectiveStatus { get; set; }
    }
}