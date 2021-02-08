export interface ISafetyChecklist {

    id: number;

    project_number: string;
    title: string;
    siteSafetyLeader_id: string;

    otherAssignedPersonnel_id : string[];
    estimatedStartDate: Date;
    estimatedCompletionDate: Date;

    emergencyCoordinator_id: string;
    emergencyReportingNumber: string;
    emergencyMedicalFacility: string;

    emergencySignal: string;
    evacRouteAndMusterPoint: string;
    medicalFacilityAddressNum: string;

    situation01 : string[];
    situation02 : string[];
    situation03 : string[];
    situation04 : string[];
    situation05 : string[];
    situation06 : string[];

    situation07 : string[];
    situation08 : string[];
    situation09 : string[];
    situation10 : string[];
    situation11 : string[];
    situation12 : string[];
    situation13 : string[];
}

export class SafetyChecklistFormValues implements ISafetyChecklist {

    id: number = 0;

    project_number: string = '';
    title: string = '';
    siteSafetyLeader_id: string = '';

    otherAssignedPersonnel_id : string[] = [];
    estimatedStartDate: Date = new Date();
    estimatedCompletionDate: Date = new Date();

    emergencyCoordinator_id: string = '';
    emergencyReportingNumber: string = '';
    emergencyMedicalFacility: string = '';
    
    emergencySignal: string = '';
    evacRouteAndMusterPoint: string = '';
    medicalFacilityAddressNum: string = '';

    situation01: string[] = [];
    situation02: string[] = [];
    situation03: string[] = [];
    situation04: string[] = [];
    situation05: string[] = [];
    situation06: string[] = [];

    situation07: string[] = [];
    situation08: string[] = [];
    situation09: string[] = [];
    situation10: string[] = [];
    situation11: string[] = [];
    situation12: string[] = [];
    situation13: string[] = [];
}