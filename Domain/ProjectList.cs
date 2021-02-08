using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class ProjectList
    {
        [Key]
        [Column("project_code")]
        public string Title { get; set; }
        //public string ProjectCode { get; set; }

        [Column("project_name")]
        public string Description { get; set; }
        //public string ProjectName { get; set; }

        [Column("proj_org")]
        public string ProjectOrg { get; set; }

        [Column("status")]
        public string ProjectStatus { get; set; }
    }
}