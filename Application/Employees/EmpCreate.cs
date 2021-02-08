using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class EmpCreate
    {
        public class Command : IRequest
        {
            public string TypeTechnical { get; set; }

            public Boolean DidNotAcceptCbx { get; set; }

            public Boolean TypeCbxMPosition { get; set; }
            public Boolean TypeCbxUnion { get; set; }
            public Boolean TypeCbxBManager { get; set; }
            public Boolean TypeCbxNewHire { get; set; }
            public Boolean TypeCbxReHire { get; set; }
            public Boolean TypeCbxETChange { get; set; }
            public Boolean TypeCbxESAMTraining { get; set; }
            public Boolean TypeCbxTransfer { get; set; }

            public Boolean GOTCbxMNFStandards { get; set; }
            public Boolean GOTCbxTEExpenses { get; set; }
            public Boolean GOTCbxMInternet { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }
            public string Number { get; set; }

            public DateTime? StartDate { get; set; }

            public Int16 Office { get; set; }

            public Int16 Location { get; set; }

            public string PWLocation { get; set; }

            public Int16 EmployeeType { get; set; }
            public Int16 Discipline { get; set; }

            public string JobTitle { get; set; }

            public string Designation { get; set; }
            //public Int16 Designation { get; set; }

            public string ManagerName { get; set; }
            public string ManagerEmail { get; set; }

            public Int16 CompanyCode { get; set; }

            public string CreatedByName { get; set; }

            public string CreatedByEmail { get; set; }

            public DateTime CreateDate { get; set; }


            /******************************/

            public string SF330Discipline { get; set; }
            public string BillingTitle { get; set; }

            public string AdminAssistant { get; set; }

            public string SSNeeded { get; set; }

            public string SHNeeded { get; set; }

            public string SeatingArrangement { get; set; }

            public Boolean CVCbxEDMVehicle { get; set; }
            public Boolean CVCbxEAMVehicle { get; set; }
            public Boolean CVCbxGasCard { get; set; }
            public Boolean cvCbxEZPass { get; set; }

            public string E52Week { get; set; }
            public string E48Week { get; set; }

            public Boolean INCbxBCards { get; set; }
            public Boolean INCbxSPhone { get; set; }
            public Boolean INCbxPResume { get; set; }
            public Boolean INCbxLaptop { get; set; }        // Office Laptop

            public Boolean INCbxFieldLaptop { get; set; }

            public Boolean INCbxDesktop { get; set; }
            public Boolean INCbxUsbAccess { get; set; }
            public Boolean INCbxDPhone { get; set; }
            public Boolean INCbxOther { get; set; }

            public string INTxtOther { get; set; }

            public Boolean INCbxMeetWithMarketing { get; set; }

            public Boolean SECbxHHats { get; set; }
            public Boolean SECbxSVests { get; set; }
            public Boolean SECbxSGlasses { get; set; }
            public Boolean SECbxOther { get; set; }

            public string SEHatColor { get; set; }
            public string SENeededType { get; set; }
            public string SESize { get; set; }

            public string SETxtOther { get; set; }

            public string EmployeeNumber { get; set; }

            public EmployeeTraining EmployeeTraining { get; set; }
            //public EmployeeIt EmployeeIt { get; set; }
            //public EmployeeHr EmployeeHr { get; set; }


            public string ClientName { get; set; }

            public string ProjectName { get; set; }

            public string JobSiteLocation { get; set; }

            public string ProjectNumber { get; set; }

            public string PerDiem { get; set; }

            public string PerDiemTxt { get; set; }

            public string MileageRate { get; set; }

            public string MileageRateTxt { get; set; }

            public string CellPhone { get; set; }
            public string Computer { get; set; }
            public string Mileage { get; set; }

            public string Comments { get; set; }

            public string UpdatedByName { get; set; }

            public string UpdatedByEmail { get; set; }

            public DateTime? UpdateDate { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var employee = new Employee
                {
                    Number = request.Number,
                    TypeTechnical = request.TypeTechnical,
                    DidNotAcceptCbx = request.DidNotAcceptCbx,

                    TypeCbxNewHire = request.TypeCbxNewHire,
                    TypeCbxReHire = request.TypeCbxReHire,
                    TypeCbxETChange = request.TypeCbxETChange,
                    TypeCbxUnion = request.TypeCbxUnion,
                    TypeCbxBManager = request.TypeCbxBManager,
                    TypeCbxMPosition = request.TypeCbxMPosition,

                    GOTCbxMNFStandards = request.GOTCbxMNFStandards,
                    GOTCbxTEExpenses = request.GOTCbxTEExpenses,
                    GOTCbxMInternet = request.GOTCbxMInternet,

                    FirstName = request.FirstName,
                    LastName = request.LastName,

                    StartDate = request.StartDate,

                    Office = request.Office,

                    Location = request.Location,

                    PWLocation = request.PWLocation,

                    EmployeeType = request.EmployeeType,

                    Discipline = request.Discipline,

                    JobTitle = request.JobTitle,

                    Designation = Convert.ToInt16(request.Designation),
                    //Designation = request.Designation,

                    ManagerName = request.ManagerName,
                    ManagerEmail = request.ManagerEmail,

                    CompanyCode = request.CompanyCode,

                    TypeCbxESAMTraining = request.TypeCbxESAMTraining,
                    TypeCbxTransfer = request.TypeCbxTransfer,

                    CreatedByName = request.CreatedByName,

                    CreatedByEmail = request.CreatedByEmail,

                    CreateDate = DateTime.Now
                };

                _context.Employees.Add(employee);
                
                // handler login 
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }

    }
}