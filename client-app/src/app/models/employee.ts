import { EmployeeHrFormValues, IEmployeeHr } from "./employeeHr";
import { EmployeeItFormValues, IEmployeeIt } from "./employeeIt";
import { EmployeeTrainingFormValues, IEmployeeTraining } from "./employeeTraining";

export interface IEmployeeEnvelope {
    employees: IEmployee[];
    employeeCount: number;
}

export interface IEmployee {

    adminAssistant: string;
    billingTitle: string;
    cellPhone: string;
    clientName: string;
    comments: string;
    companyCode: string;
    computer: string;
    //Date: Date;

    typeTechnical: string;  // 1 = non-technical, 2 = technical, 3 = row

    didNotAcceptCbx: boolean;
    
    typeCbxUnion: boolean;
    typeCbxBManager: boolean;
    typeCbxNewHire: boolean;
    typeCbxReHire: boolean;
    typeCbxETChange: boolean;
    typeCbxTransfer: boolean;

    gotCbxMNFStandards: boolean;
    gotCbxTEExpenses: boolean;
    gotCbxMInternet: boolean;

    firstName: string;
    lastName: string;
    number: string;         // employee number

    startDate?: Date;
    startTime?: Date;

    office: string;
    location: string;
    pwLocation: string;
    employeeType: string;

    discipline: string;
    //discipline?: number;

    sF330Discipline: string;
    //sF330Discipline?: number;
    jobTitle: string;

    designation: string;
    //designation: number;

    managerName: string;
    managerEmail: string;

    typeCbxMPosition: boolean;
    typeCbxESAMTraining: boolean;



    ssNeeded: string;
    shNeeded: string;
    seatingArrangement: string;

    cvCbxEDMVehicle: boolean;
    cvCbxEAMVehicle: boolean;
    cvCbxGasCard: boolean;
    cvCbxEZPass: boolean;

    e52Week: string;
    //e52Week?: number;
    e48Week: string;
    //e48Week?: number;

    inCbxBCards: boolean;
    inCbxSPhone: boolean;
    inCbxPResume: boolean;
    inCbxLaptop: boolean;           // Office Laptop
    inCbxFieldLaptop: boolean;
    inCbxDesktop: boolean;
    inCbxUsbAccess: boolean;
    inCbxDPhone: boolean;
    inCbxOther: boolean;
    inTxtOther: string;

    inCbxMeetWithMarketing: boolean;

    seCbxHHats: boolean;
    seCbxSVests: boolean;
    seCbxSGlasses: boolean;
    seCbxOther: boolean;

    seHatColor: string;
    seNeededType: string;
    seSize: string;
    seTxtOther: string;

    //employeeNumber: string;
    employeeTraining: IEmployeeTraining;
    //employeeIt: EmployeeIt;
    //employeeHr: EmployeeHr;

    projectName: string;
    jobSiteLocation: string;
    projectNumber: string;

    perDiem: string;
    perDiemTxt: string;

    mileageRate: string;
    mileageRateTxt: string;

    mileage: string;


    updatedByName: string;
    updatedByEmail: string;

    //createdByName: string;
    //createdByEmail: string;

}

export interface IEmployeeFormValues extends Partial<IEmployee> {
    time?: Date;
}

export class EmployeeFormValues implements IEmployeeFormValues {

    typeTechnical: string = '2';  // 1 = non-technical, 2 = technical, 3 = row

    didNotAcceptCbx: boolean = false;

    typeCbxNewHire: boolean = false;
    typeCbxReHire: boolean = false;
    typeCbxETChange: boolean = false;
    typeCbxUnion: boolean = false;
    typeCbxBManager: boolean = false;
    typeCbxTransfer: boolean = false;

    gotCbxMNFStandards: boolean = true;
    gotCbxTEExpenses: boolean = true;
    gotCbxMInternet: boolean = true;

    firstName: string = '';
    lastName: string = '';
    number: string = '';         // employee number

    startDate?: Date = undefined;
    startTime?: Date = undefined;

    office: string = '';
    location: string = '';
    pwLocation: string = '';
    employeeType: string = '';

    discipline: string = '';
    //discipline?: number;

    sF330Discipline: string = '';
    //sF330Discipline?: number;
    billingTitle: string = '';
    jobTitle: string = '';

    designation: string = '0';
    //designation: number = 0;

    managerName: string = '';
    managerEmail: string = '';
    companyCode: string = '';

    adminAssistant: string = '';
    ssNeeded: string = '';
    shNeeded: string = '';
    seatingArrangement: string = '';

    typeCbxMPosition: boolean = false;
    typeCbxESAMTraining: boolean = false;

    cvCbxEDMVehicle: boolean = false;
    cvCbxEAMVehicle: boolean = false;
    cvCbxGasCard: boolean = false;
    cvCbxEZPass: boolean = false;

    e52Week: string = '';
    //e52Week?: number;
    e48Week: string = '';
    //e48Week?: number;

    inCbxBCards: boolean = false;
    inCbxSPhone: boolean = false;
    inCbxPResume: boolean = false;
    inCbxLaptop: boolean = false;           // Office Laptop
    inCbxFieldLaptop: boolean = false;
    inCbxDesktop: boolean = false;
    inCbxUsbAccess: boolean = false;
    inCbxDPhone: boolean = false;
    inCbxOther: boolean = false;
    inTxtOther: string = '';

    inCbxMeetWithMarketing: boolean = false;

    seCbxHHats: boolean = false;
    seCbxSVests: boolean = false;
    seCbxSGlasses: boolean = false;
    seCbxOther: boolean = false;

    seHatColor: string = '';
    seNeededType: string = '';
    seSize: string = '';
    seTxtOther: string = '';

    employeeTraining: IEmployeeTraining = new EmployeeTrainingFormValues();
    employeeIt: IEmployeeIt = new EmployeeItFormValues();
    employeeHr: IEmployeeHr = new EmployeeHrFormValues();

    clientName: string = '';
    projectName: string = '';
    jobSiteLocation: string = '';
    projectNumber: string = '';

    perDiem: string = '';
    perDiemTxt: string = '';

    mileageRate: string = '';
    mileageRateTxt: string = '';

    cellPhone: string = '';
    computer: string = '';
    mileage: string = '';

    comments: string = '';

    updatedByName: string = '';
    updatedByEmail: string = '';

    //createdByName: string = '';
    //createdByEmail: string = '';

    constructor(init?: IEmployeeFormValues) {
        if (init && init.startDate) {
            init.startTime = init.startDate
        }

        Object.assign(this,init);
    }
}
