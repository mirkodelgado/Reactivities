using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Safety
{
    [Table("auth_user")]
    public class AuthUser
    {
        //[Key]
        public Int32 Id { get; set; }

        [Required, StringLength(128)]
        public string Password { get; set; }

        [Column("last_login")]
        public DateTime? LastLogin { get; set; }

        [Column("is_superuser")]
        public Boolean IsSuperuser { get; set; }

        [Required, StringLength(150)]
        public string Username { get; set; }

        [Required, StringLength(30), Column("first_name")]
        public string Firstname { get; set; }

        [Required, StringLength(30), Column("last_name")]
        public string Lastname { get; set; }

        [Required, StringLength(254)]
        public string Email { get; set; }

        [Column("is_staff")]
        public Boolean IsStaff { get; set; }

        [Column("is_active")]
        public Boolean IsActive { get; set; }

        [Column("date_joined")]
        public DateTime DateJoined { get; set; }
    }
}