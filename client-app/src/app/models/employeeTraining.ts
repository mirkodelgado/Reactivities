export interface IEmployeeTraining {

    employeeNumber: string;

    hstCbxSSLeader: boolean;
    hstCbxRFSafety: boolean;
    hstCbxOsha10Safety: boolean;
    hstCbxOsha24HazWoper: boolean;
    hstCbxOsha40HazWoper: boolean;

    hstCbxOsha8HazWoper: boolean;
    hstCbxFProtection: boolean;
    hstCbxCSpace: boolean;
    hstCbxASLift: boolean;
    hstCbxAHSCTraining: boolean;

    hstCbxCprFirstAid: boolean;
    hstCbxHProtection: boolean;
    hstCbxESurveyors: boolean;
    hstCbxRSManagers: boolean;
    hstCbxOther: boolean;

    hstTxtOther: string;

    bsttCbxPInitiation: boolean;
    bsttCbxAPayable: boolean;
    bsttCbxARCllections: boolean;
    bsttCbxBilling: boolean;
    bsttCbxIReports: boolean;
    bsttCbxPortals: boolean;

    tdCbxCStandards: boolean;
    tdCbxSWorkflow: boolean;
    tdCbxSurfaces: boolean;
    tdCbxAlignments: boolean;
    tdCbxProfiles: boolean;
    tdCbxPNetworks: boolean;
    tdCbxCSections: boolean;
    tdCbxParcels: boolean;
}

export class EmployeeTrainingFormValues implements IEmployeeTraining {

    employeeNumber: string = '';

    // Health & Safety Training Checkbox Group
    hstCbxSSLeader: boolean = false; 
    hstCbxRFSafety: boolean = false; 
    hstCbxOsha10Safety: boolean = false; 
    hstCbxOsha24HazWoper: boolean = false; 
    hstCbxOsha40HazWoper: boolean = false;
    hstCbxOsha8HazWoper: boolean = false; 
    hstCbxFProtection: boolean = false; 
    hstCbxCSpace: boolean = false; 
    hstCbxASLift: boolean = false; 
    hstCbxAHSCTraining: boolean = false;
    hstCbxCprFirstAid: boolean = false; 
    hstCbxHProtection: boolean = false; 
    hstCbxESurveyors: boolean = false; 
    hstCbxRSManagers: boolean = false; 
    hstCbxOther: boolean = false; 
    hstTxtOther: string = '';

    // BST Training Checkbox Group
    bsttCbxPInitiation: boolean = false; 
    bsttCbxAPayable: boolean = false; 
    bsttCbxARCllections: boolean = false;
    bsttCbxBilling: boolean = false; 
    bsttCbxIReports: boolean = false; 
    bsttCbxPortals: boolean = false;

    // Technical & Design Checkbox Group
    tdCbxCStandards: boolean = false; 
    tdCbxSWorkflow: boolean = false; 
    tdCbxSurfaces: boolean = false; 
    tdCbxAlignments: boolean = false;
    tdCbxProfiles: boolean = false; 
    tdCbxPNetworks: boolean = false; 
    tdCbxCSections: boolean = false; 
    tdCbxParcels: boolean = false;
}
