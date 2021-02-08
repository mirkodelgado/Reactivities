using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Safety
{
    public class User
    {
        public Int32 Id { get; set; }

        [StringLength(80)]
        public string Name { get; set; }

        public Int32 GroupId { get; set; }

        public Boolean IsSSL { get; set; }


        public User(Int32 Id, string Name, Int32 GroupId, Boolean IsSSL) {

            this.Id = Id;
            this.Name = Name;
            this.GroupId = GroupId;
            this.IsSSL = IsSSL;
        }
    }
}