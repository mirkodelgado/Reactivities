import { observable, action, computed, runInAction } from "mobx";

import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

import { IEmployee, IEmployeeEnvelope } from "../models/employee";
import { ILocation } from "../models/location";
import { IEmployeeType } from "../models/employeeType";
import { IDiscipline } from "../models/discipline";
import { IDesignation } from "../models/designation";
import { IManager } from "../models/manager";
import { ISf330Discipline } from "../models/sf330Discipline";
import { IBillingTitle } from "../models/billingTitle";

const LIMIT = 5;

export default class EmployeeStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable employeeRegistry = new Map();

  @observable employee: IEmployee | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @observable locations: ILocation[] = [];
  @observable employeeTypes: IEmployeeType[] = [];
  @observable disciplines: IDiscipline[] = [];
  @observable sF330Disciplines: ISf330Discipline[] = [];
  @observable billingTitles: IBillingTitle[] = [];
  @observable designations: IDesignation[] = [];
  @observable managers: IManager[] = [];

  @observable employeeCount = 0;
  @observable page = 0;

  @observable enumber: string = "";

  @computed get totalPages() {
    return Math.ceil(this.employeeCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  /************************************************************************
   * offices[] is the same as locations[], just remove "Remote" location
   ************************************************************************/

  @computed get getOffices() {
    return this.locations.filter(
      (location) => location.locationName !== "Remote"
    );
  }

  /*************************************
   *
   *************************************/

  @computed get employeesByDefault() {
    return Array.from(this.employeeRegistry.values()).sort(
      (a, b) => Date.parse(b.createDate) - Date.parse(a.createDate)
    ); // sort in descending order

    //return this.groupEmployeesByDefault(
    //  Array.from(this.employeeRegistry.values())
    //);
  }

  /*************************************
   *
   *************************************/

  groupEmployeesByDefault(employees: IEmployee[]) {
    const sortedEmployees = employees;

    //console.log('sortedEmployees = ' + JSON.stringify(sortedEmployees));

    return Object.entries(
      sortedEmployees.reduce((employees, employee) => {
        return employees;
      }, {} as { [key: string]: IEmployee[] })
    );
  }

  /*************************************
   *
   *************************************/

  @action getNextExployeeNumber = async (firstLetter: string) => {
    try {
      let enumber: string = await agent.Employees.nextEmployeeNumber();

      runInAction("getNextExployeeNumber", () => {
        this.enumber = firstLetter + enumber;
      });

      return this.enumber;
    } catch (error) {
      runInAction("getNextExployeeNumber error", () => {
        toast.error("Problem retrieving next employee number");
      });
    }
  };

  /*************************************
   *
   *************************************/

  @action loadEmployees = async () => {
    this.loadingInitial = true;

    try {
      const response = await agent.Employees.list(LIMIT, this.page);

      runInAction("loading employees", () => {
        // TODO: check to make sure response is not NULL

        //const employees: IEmployee[] = response.employees;
        const employeeEnvelope: IEmployeeEnvelope = response.employees;

        const { employees, employeeCount } = employeeEnvelope;

        this.employeeCount = employeeCount;

        this.locations = response.locations;

        this.employeeTypes = response.employeeTypes;

        this.disciplines = response.disciplines;

        this.sF330Disciplines = response.sF330Disciplines;

        this.billingTitles = response.billingTitles;

        this.designations = response.designations;

        this.managers = response.managersToReturn;

        //this.offices = this.locations.filter(location => location.locationName !== "Remote")

        employees.forEach((employee) => {
          if (employee.startDate != null) {
            employee.startDate = new Date(employee.startDate);
          }

          this.employeeRegistry.set(employee.number, employee);
        });

        this.loadingInitial = false;
      });

      //console.log(this.groupActivitesByDate(activities));
    } catch (error) {
      runInAction("load employees error", () => {
        this.loadingInitial = false;
      });

      //console.log(error);
    }
  };

  /*************************************
   *
   *************************************/

  @action newEmployeeInfo = async () => {
    this.loadingInitial = true;

    try {
      const response = await agent.Employees.newEmployeeInfo();

      runInAction("loading new employee info", () => {
        // TODO: check to make sure response is not NULL

        this.locations = response.locations;

        this.employeeTypes = response.employeeTypes;

        this.disciplines = response.disciplines;

        this.sF330Disciplines = response.sF330Disciplines;

        this.billingTitles = response.billingTitles;

        this.designations = response.designations;

        this.managers = response.managersToReturn;

        //this.offices = this.locations.filter(location => location.locationName !== "Remote")

        this.loadingInitial = false;
      });

      //console.log(this.groupActivitesByDate(activities));
    } catch (error) {
      runInAction("load new employee info error", () => {
        this.loadingInitial = false;
      });

      //console.log(error);
    }
  };

  /*************************************
   *
   *************************************/

  @action loadEmployee = async (id: string) => {
    let employee = this.getEmployee(id);

    if (employee) {
      this.employee = employee;
      return employee;
    } else {
      this.loadingInitial = true;

      try {
        const response = await agent.Employees.details(id);

        //employee = await agent.Employees.details(id);

        runInAction("getting employee", () => {
          // TODO: check to make sure response is not NULL

          employee = response.employee;

          this.locations = response.locations;

          this.employeeTypes = response.employeeTypes;

          this.disciplines = response.disciplines;

          this.sF330Disciplines = response.sF330Disciplines;

          this.billingTitles = response.billingTitles;

          this.designations = response.designations;

          this.managers = response.managersToReturn;

          if (employee.startDate != null) {
            employee.startDate = new Date(employee.startDate);
          }

          this.employee = employee;
          this.employeeRegistry.set(employee.number, employee);
          this.loadingInitial = false;
        });
        return employee;
      } catch (error) {
        runInAction("get employee error", () => {
          this.loadingInitial = false;
        });

        console.log(error);
      }
    }
  };

  /*************************************
   *
   *************************************/

  @action clearEmployee = () => {
    this.employee = null;
  };

  /*************************************
   *
   *************************************/

  getEmployee = (id: string) => {
    return this.employeeRegistry.get(id);
  };

  /*************************************
   *
   *************************************/

  @action createEmployee = async (employee: IEmployee) => {
    this.submitting = true;
    try {
      await agent.Employees.create(employee);

      runInAction("create employee", () => {
        this.employeeRegistry.set(employee.number, employee);
        this.submitting = false;
      });

      toast.success("Employee " + employee.firstName + " " + employee.lastName + " created");

      //history.push(`/employee/${employee.number}`);
      history.push(`/`);

    } catch (error) {
      runInAction("create employee error", () => {
        this.submitting = false;
      });

      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  /*************************************
   *
   *************************************/

  @action editEmployee = async (employee: IEmployee) => {
    this.submitting = true;

    try {
      await agent.Employees.update(employee);

      runInAction("editing employee", () => {
        this.employeeRegistry.set(employee.number, employee);
        this.employee = employee;
        this.submitting = false;
      });

      history.push(`/employee/${employee.number}`);
    } catch (error) {
      runInAction("edit employee error", () => {
        this.submitting = false;
      });

      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };
}
