using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class EmployeeEmtityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Number = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    Office = table.Column<short>(nullable: false),
                    Location = table.Column<short>(nullable: false),
                    PWLocation = table.Column<string>(nullable: true),
                    EmployeeType = table.Column<short>(nullable: false),
                    Discipline = table.Column<short>(nullable: false),
                    SF330Discipline = table.Column<short>(nullable: false),
                    BillingTitle = table.Column<short>(nullable: false),
                    JobTitle = table.Column<string>(nullable: true),
                    Designation = table.Column<short>(nullable: false),
                    ManagerName = table.Column<string>(nullable: true),
                    ManagerEmail = table.Column<string>(nullable: true),
                    CompanyCode = table.Column<short>(nullable: false),
                    AdminAssistant = table.Column<string>(nullable: true),
                    SSNeeded = table.Column<string>(nullable: true),
                    SHNeeded = table.Column<string>(nullable: true),
                    SeatingArrangement = table.Column<string>(nullable: true),
                    TypeTechnical = table.Column<string>(nullable: true),
                    DidNotAcceptCbx = table.Column<bool>(nullable: false),
                    TypeCbxMPosition = table.Column<bool>(nullable: false),
                    TypeCbxUnion = table.Column<bool>(nullable: false),
                    TypeCbxBManager = table.Column<bool>(nullable: false),
                    TypeCbxNewHire = table.Column<bool>(nullable: false),
                    TypeCbxReHire = table.Column<bool>(nullable: false),
                    TypeCbxETChange = table.Column<bool>(nullable: false),
                    TypeCbxESAMTraining = table.Column<bool>(nullable: false),
                    TypeCbxTransfer = table.Column<bool>(nullable: false),
                    GOTCbxMNFStandards = table.Column<bool>(nullable: false),
                    GOTCbxTEExpenses = table.Column<bool>(nullable: false),
                    GOTCbxMInternet = table.Column<bool>(nullable: false),
                    CVCbxEDMVehicle = table.Column<bool>(nullable: false),
                    CVCbxEAMVehicle = table.Column<bool>(nullable: false),
                    CVCbxGasCard = table.Column<bool>(nullable: false),
                    cvCbxEZPass = table.Column<bool>(nullable: false),
                    E52Week = table.Column<short>(nullable: false),
                    E48Week = table.Column<short>(nullable: false),
                    INCbxBCards = table.Column<bool>(nullable: false),
                    INCbxSPhone = table.Column<bool>(nullable: false),
                    INCbxPResume = table.Column<bool>(nullable: false),
                    INCbxLaptop = table.Column<bool>(nullable: false),
                    INCbxFieldLaptop = table.Column<bool>(nullable: false),
                    INCbxDesktop = table.Column<bool>(nullable: false),
                    INCbxUsbAccess = table.Column<bool>(nullable: false),
                    INCbxDPhone = table.Column<bool>(nullable: false),
                    INCbxOther = table.Column<bool>(nullable: false),
                    INTxtOther = table.Column<string>(nullable: true),
                    INCbxMeetWithMarketing = table.Column<bool>(nullable: false),
                    SECbxHHats = table.Column<bool>(nullable: false),
                    SECbxSVests = table.Column<bool>(nullable: false),
                    SECbxSGlasses = table.Column<bool>(nullable: false),
                    SECbxOther = table.Column<bool>(nullable: false),
                    SEHatColor = table.Column<short>(nullable: false),
                    SENeededType = table.Column<short>(nullable: false),
                    SESize = table.Column<short>(nullable: false),
                    SETxtOther = table.Column<string>(nullable: true),
                    EmployeeNumber = table.Column<string>(nullable: true),
                    ClientName = table.Column<string>(nullable: true),
                    ProjectName = table.Column<string>(nullable: true),
                    JobSiteLocation = table.Column<string>(nullable: true),
                    ProjectNumber = table.Column<string>(nullable: true),
                    PerDiem = table.Column<short>(nullable: false),
                    PerDiemTxt = table.Column<string>(nullable: true),
                    MileageRate = table.Column<short>(nullable: false),
                    MileageRateTxt = table.Column<string>(nullable: true),
                    CellPhone = table.Column<short>(nullable: false),
                    Computer = table.Column<short>(nullable: false),
                    Mileage = table.Column<short>(nullable: false),
                    Comments = table.Column<string>(nullable: true),
                    UpdatedByName = table.Column<string>(nullable: true),
                    UpdatedByEmail = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: true),
                    CreatedByName = table.Column<string>(nullable: true),
                    CreatedByEmail = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Number);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
