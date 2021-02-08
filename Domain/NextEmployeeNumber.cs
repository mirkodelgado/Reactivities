using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class NextEmployeeNumber
    {
        public int Id { get; set; }

        public DateTime  CreateDate{ get; set; }

        public NextEmployeeNumber()
        {
            this.CreateDate = DateTime.Now;
        }

    }
}