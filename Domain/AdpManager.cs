using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class AdpManager
    {
        [Key]
        [StringLength(20)]
        public string Aiod { get; set; }

        [StringLength(100)]
        public string ManagerName { get; set; }

        [StringLength(100)]
        public string ManagerEmail { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
