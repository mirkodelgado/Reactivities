export interface IEmployeeHr {

    employeeNumber: string;

    hrRepresentative: string;
    //hrRepresentative?: number;

    rateType: string;
    //rateType?: number;

    // typeTechnical: string;

    payRate: string;

    halogenUser: boolean;

    hoursWeek: string;

    adpFileNumber: string;

    address: string;

    hrSetupCompleteCbx: boolean;

    welcomeEmailSentDate?: Date;

    phoneOption: string;
    phoneOptionDate?: Date;

    gasCardezPass: string;
    gasCardezPassDate?: Date;

    businessCard: string;
    businessCardDate?: Date;

    orientationDate?: Date;
    orientationDateSetDate?: Date;

    professionalResume: string;
    professionalResumeDate?: Date;

    meetwithMarketing: string;
    welcomeBagSent: string;
    travelForOrientation: string;
    reportOnFirstDayTime: string;

    i9LinkCbx: boolean;
    rvTrainingCompleteCbx: boolean;
    addedToRvCbx: boolean;
    cccCompanyManualCbx: boolean;

    hrOnboardingCompleteCbx: boolean;
}

export class EmployeeHrFormValues implements IEmployeeHr {

    employeeNumber: string = '';


    hrRepresentative: string = '';
    //hrRepresentative?: number;

    rateType: string = '';
    //rateType?: number;

    // typeTechnical: string;

    payRate: string = '';

    halogenUser: boolean = false;

    hoursWeek: string = '';

    adpFileNumber: string = '';

    address: string = '';

    hrSetupCompleteCbx: boolean = false;

    welcomeEmailSentDate?: Date;

    phoneOption: string = '';
    phoneOptionDate?: Date;

    gasCardezPass: string = '';
    gasCardezPassDate?: Date;

    businessCard: string = '';
    businessCardDate?: Date;

    orientationDate?: Date;
    orientationDateSetDate?: Date;

    professionalResume: string = '';
    professionalResumeDate?: Date;

    meetwithMarketing: string = '';
    welcomeBagSent: string = '';
    travelForOrientation: string = '';
    reportOnFirstDayTime: string = '';

    i9LinkCbx: boolean = false;
    rvTrainingCompleteCbx: boolean = false;
    addedToRvCbx: boolean = false;
    cccCompanyManualCbx: boolean = false;

    hrOnboardingCompleteCbx: boolean = false;
}
