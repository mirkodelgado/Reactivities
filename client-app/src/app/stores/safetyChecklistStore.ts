import { observable, action, computed, runInAction } from "mobx";
import agent from "../api/agent";

import { IDepartment } from "../models/department";
import { IHazzard } from "../models/hazzard";
import { IProject } from "../models/project";
import { IUser } from "../models/user";

import { RootStore } from "./rootStore";

export default class SafetyChecklistStore {

    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

    @observable loadingInitial = false;
    @observable submitting = false;

    @observable departments: IDepartment[] = [];
    @observable hazzards: IHazzard[] = [];
    @observable users: IUser[] = [];
    @observable projects: IProject[] = [];

  /*****************************************
   * Filter out Site Safety Leaders (SSLs)
   *****************************************/

  @computed get getSSLs() {
    return this.users.filter(u => u.isSSL)
  }

  /*************************************
   *
   *************************************/

  @action loadSafety = async () => {
    this.loadingInitial = true;

    try {

      const response = await agent.Safety.list();

      runInAction("loading safety info", () => {

        // TODO: check to make sure response is not NULL

        this.departments = response.departments;

        this.hazzards = response.hazzards;

        this.users = response.users;

        this.projects = response.projects;

        this.loadingInitial = false;
        //console.log("projects" + JSON.stringify(this.projects));
      });
    } catch (error) {
      runInAction("load safety info error", () => {
        this.loadingInitial = false;
      });
    }
  };



}