export interface IEmployeeIt {

    employeeNumber: string;

    loginName: string;
    loginPassword: string;

    itSetupCompleteCbx: boolean;

    equipmentShippedDate?: Date;
    equipmentShippedDescription: string;
    trackingNumber: string;

    userInEmergencyAlertSystem: boolean;

    // equipmentShipped

    monitors: string;
    //monitors: number;

    monitorCablesAdapters: string;

    desktop: boolean;
    desktopModel: string;

    laptop: boolean;
    laptopDockingStation: boolean;
    laptopModel: string;

    keyboard: boolean;
    mouse: boolean;
    speakers: boolean;

    neworkCables: boolean;
    powerCables: boolean;
    powerStrip: boolean;

    deskPhone: boolean;
    deskPhoneExtension: string;

    stipendFormReceived: boolean;
    phoneAgreementReceived: boolean;
    mobilePhoneOrdered: boolean;
    mobilePhoneNumber: string;

    mobileNumberPorted: string;
    //mobileNumberPorted?: number;

    additionalEquipment: string;

    existingEquipmentCbx: boolean;
}

export class EmployeeItFormValues implements IEmployeeIt {

    employeeNumber: string = '';

    loginName: string = '';
    loginPassword: string = '';

    itSetupCompleteCbx: boolean = false;

    equipmentShippedDate?: Date = undefined;
    equipmentShippedDescription: string = '';
    trackingNumber: string = '';

    userInEmergencyAlertSystem: boolean = false;

    // equipmentShipped

    monitors: string = '';
    //monitors: number = 0;

    monitorCablesAdapters: string = '';

    desktop: boolean = false;
    desktopModel: string = '';

    laptop: boolean = false;
    laptopDockingStation: boolean = false;
    laptopModel: string = '';

    keyboard: boolean = false;
    mouse: boolean = false;
    speakers: boolean = false;

    neworkCables: boolean = false;
    powerCables: boolean = false;
    powerStrip: boolean = false;

    deskPhone: boolean = false;
    deskPhoneExtension: string = '';

    stipendFormReceived: boolean = false;
    phoneAgreementReceived: boolean = false;
    mobilePhoneOrdered: boolean = false;
    mobilePhoneNumber: string = '';

    mobileNumberPorted: string = '';
    //mobileNumberPorted?: number;

    additionalEquipment: string = '';

    existingEquipmentCbx: boolean = false;
}
