using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RemoveEmployees : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Number = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AdminAssistant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillingTitle = table.Column<short>(type: "smallint", nullable: false),
                    CVCbxEAMVehicle = table.Column<bool>(type: "bit", nullable: false),
                    CVCbxEDMVehicle = table.Column<bool>(type: "bit", nullable: false),
                    CVCbxGasCard = table.Column<bool>(type: "bit", nullable: false),
                    CellPhone = table.Column<short>(type: "smallint", nullable: false),
                    ClientName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyCode = table.Column<short>(type: "smallint", nullable: false),
                    Computer = table.Column<short>(type: "smallint", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Designation = table.Column<short>(type: "smallint", nullable: false),
                    DidNotAcceptCbx = table.Column<bool>(type: "bit", nullable: false),
                    Discipline = table.Column<short>(type: "smallint", nullable: false),
                    E48Week = table.Column<short>(type: "smallint", nullable: false),
                    E52Week = table.Column<short>(type: "smallint", nullable: false),
                    EmployeeNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeType = table.Column<short>(type: "smallint", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GOTCbxMInternet = table.Column<bool>(type: "bit", nullable: false),
                    GOTCbxMNFStandards = table.Column<bool>(type: "bit", nullable: false),
                    GOTCbxTEExpenses = table.Column<bool>(type: "bit", nullable: false),
                    INCbxBCards = table.Column<bool>(type: "bit", nullable: false),
                    INCbxDPhone = table.Column<bool>(type: "bit", nullable: false),
                    INCbxDesktop = table.Column<bool>(type: "bit", nullable: false),
                    INCbxFieldLaptop = table.Column<bool>(type: "bit", nullable: false),
                    INCbxLaptop = table.Column<bool>(type: "bit", nullable: false),
                    INCbxMeetWithMarketing = table.Column<bool>(type: "bit", nullable: false),
                    INCbxOther = table.Column<bool>(type: "bit", nullable: false),
                    INCbxPResume = table.Column<bool>(type: "bit", nullable: false),
                    INCbxSPhone = table.Column<bool>(type: "bit", nullable: false),
                    INCbxUsbAccess = table.Column<bool>(type: "bit", nullable: false),
                    INTxtOther = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobSiteLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<short>(type: "smallint", nullable: false),
                    ManagerEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManagerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mileage = table.Column<short>(type: "smallint", nullable: false),
                    MileageRate = table.Column<short>(type: "smallint", nullable: false),
                    MileageRateTxt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Office = table.Column<short>(type: "smallint", nullable: false),
                    PWLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PerDiem = table.Column<short>(type: "smallint", nullable: false),
                    PerDiemTxt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SECbxHHats = table.Column<bool>(type: "bit", nullable: false),
                    SECbxOther = table.Column<bool>(type: "bit", nullable: false),
                    SECbxSGlasses = table.Column<bool>(type: "bit", nullable: false),
                    SECbxSVests = table.Column<bool>(type: "bit", nullable: false),
                    SEHatColor = table.Column<short>(type: "smallint", nullable: false),
                    SENeededType = table.Column<short>(type: "smallint", nullable: false),
                    SESize = table.Column<short>(type: "smallint", nullable: false),
                    SETxtOther = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SF330Discipline = table.Column<short>(type: "smallint", nullable: false),
                    SHNeeded = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SSNeeded = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeatingArrangement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TypeCbxBManager = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxESAMTraining = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxETChange = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxMPosition = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxNewHire = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxReHire = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxTransfer = table.Column<bool>(type: "bit", nullable: false),
                    TypeCbxUnion = table.Column<bool>(type: "bit", nullable: false),
                    TypeTechnical = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedByEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedByName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cvCbxEZPass = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Number);
                });
        }
    }
}
