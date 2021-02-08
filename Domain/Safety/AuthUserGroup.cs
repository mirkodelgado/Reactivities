using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Safety
{
    [Table("auth_user_groups")]
    public class AuthUserGroup
    {
        [Key]
        public Int32 Id { get; set; }

        [Column("user_id")]
        public Int32 UserId { get; set; }

        [Column("group_id")]
        public Int32 GroupId { get; set; }
    }
}