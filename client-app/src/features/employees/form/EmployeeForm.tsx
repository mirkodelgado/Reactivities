import React, { useContext, useState, useEffect } from "react";
import { EmployeeFormValues } from "../../../app/models/employee";

import { Form as FinalForm, Field } from "react-final-form";

import {
  Form,
  Segment,
  Tab,
  Grid,
  Button,
  Popup,
  Icon,
  CheckboxProps,
  Divider,
  Accordion,
} from "semantic-ui-react";

import { combineValidators, isRequired } from "revalidate";

import { RootStoreContext } from "../../../app/stores/rootStore";
import PageTitle from "../../../app/common/form/PageTitle";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

import { companyCode } from "../../../app/common/options/companyCodeOptions";

import CheckboxInput from "../../../app/common/form/CheckboxInput";
import TextInput from "../../../app/common/form/TextInput";
import DateInput from "../../../app/common/form/DateInput";
import SelectInput from "../../../app/common/form/SelectInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import {
  seHatColors,
  seNeededTypes,
  seSizes,
} from "../../../app/common/options/seOptions";
import {
  billNonBill,
  businessCard,
  gasCardEzPass,
  mileageRate,
  perDiem,
  phone,
  professionalResume,
  rateType,
  yesNo,
  hrRepresentative,
} from "../../../app/common/options/hrOptions";
import { toast } from "react-toastify";

const validate = combineValidators({
  firstName: isRequired({ message: "First Name is required" }),
  lastName: isRequired("Last Name"),
  number: isRequired("Employee Number"),
  office: isRequired("Reports to Office"),
  location: isRequired("Location"),
  employeeType: isRequired("Employee Type"),
  discipline: isRequired("Discipline"),
  jobTitle: isRequired("Job Title"),
  managerEmail: isRequired("Manager"),
  companyCode: isRequired("Company Code"),
});

interface DetailParams {
  id: string;
}

const EmployeeForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createEmployee,
    editEmployee,
    submitting,
    loadEmployee,
    locations,
    getOffices,
    employeeTypes,
    disciplines,
    sF330Disciplines,
    billingTitles,
    designations,
    managers,
    newEmployeeInfo,
    getNextExployeeNumber,
  } = rootStore.employeeStore;

  const [employee, setEmployee] = useState(new EmployeeFormValues());
  const [loading, setLoading] = useState(false);

  const [loadingEmployeeNumber, setEmployeeNumberLoading] = useState(false);

  const [accordionActive, setAccordion] = useState(false);

  const handleCbxInputChange = (event: any, data: CheckboxProps) => {
    //console.log("data: " + JSON.stringify(data));
    setEmployee({ ...employee, [data.name!]: data.checked });
  };

  const handleTrainingCbxInputChange = (event: any, data: CheckboxProps) => {
    //console.log("data: " + JSON.stringify(data));

    setEmployee((emp) => ({
      ...emp,
      employeeTraining: {
        ...emp.employeeTraining,
        hstCbxOther: data.checked!,
      },
    }));
  };

  const [activeTabIndex, setActiveTab] = useState(0);

  const handleTabChange = (index: any) => {
    //console.log("data is: " + index + "; activeTabIndex: " + activeTabIndex );
    setActiveTab(index);
  };

  const handleNextEmployeeNumber = () => {
    console.log("lastName = " + employee.lastName);

    let firstLetter: string = "";

    if (employee.lastName.length > 0) {
      firstLetter = employee.lastName.charAt(0);
    }

    getNextExployeeNumber(firstLetter)
      .then((enumber) => setEmployee({ ...employee, number: enumber! }))
      .finally(() => setEmployeeNumberLoading(false));
  };

  const handleFinalFormSubmit = (values: any) => {

    let counter: number = 0;

    if (values.typeCbxNewHire) counter++;
    if (values.typeCbxReHire) counter++;
    if (values.typeCbxETChange) counter++;
    if (values.typeCbxUnion) counter++;
    if (values.typeCbxBManager) counter++;
    if (values.typeCbxTransfer) counter++;

    if (counter > 1) {
      toast.error("Please select one employee type");
      return;
    }

    const { ...employee } = values; // remove date, time

    const mngr = managers.filter(manager => manager.managerEmail === values.managerEmail);
  
    let newEmployee = {
      ...employee,
      managerName: mngr[0].managerName,
    };

    createEmployee(newEmployee);
    //console.log(newEmployee);
  };

  const panes = [
    {
      menuItem: "Employee",

      pane: (
        <Tab.Pane key="tab1">
          <Grid>
            <Grid.Column width={8}>
              <Form.Group inline>
                <label>This Employee is:</label>

                <label>
                  <Field
                    style={{ marginTop: "4px" }}
                    name="typeTechnical"
                    component="input"
                    type="radio"
                    value="2"
                  />
                  &nbsp;&nbsp;Technical&nbsp;&nbsp;
                </label>
                <label>
                  <Field
                    style={{ marginTop: "4px" }}
                    name="typeTechnical"
                    component="input"
                    type="radio"
                    value="1"
                  />
                  &nbsp;&nbsp;Non-technical&nbsp;&nbsp;
                </label>
                <label>
                  <Field
                    style={{ marginTop: "4px" }}
                    name="typeTechnical"
                    component="input"
                    type="radio"
                    value="3"
                  />
                  &nbsp;&nbsp;Row
                </label>
              </Form.Group>
            </Grid.Column>

            <Grid.Column width={8}>
              <Field
                name="didNotAcceptCbx"
                label="Employee will NOT be starting"
                checked={employee.didNotAcceptCbx}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={8}>
              <h3>Type</h3>
              <Segment>
                <Grid>
                  <Grid.Column width={8}>
                    <Field
                      name="typeCbxNewHire"
                      label="New Hire"
                      checked={employee.typeCbxNewHire}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="typeCbxReHire"
                      label="Re-Hire"
                      checked={employee.typeCbxReHire}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="typeCbxETChange"
                      label="Employee Type Change"
                      checked={employee.typeCbxETChange}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Field
                      name="typeCbxUnion"
                      label="Union"
                      checked={employee.typeCbxUnion}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="typeCbxBManager"
                      label="Billing Manager"
                      checked={employee.typeCbxBManager}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="typeCbxTransfer"
                      label="Transfer"
                      checked={employee.typeCbxTransfer}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>

            <Grid.Column width={8}>
              <h3>General Office Training</h3>
              <Segment>
                <Field
                  name="gotCbxMNFStandards"
                  label="Maser Network & Filing Standards"
                  checked={employee.gotCbxMNFStandards}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="gotCbxTEExpenses"
                  label="Timesheet Entry / Expenses"
                  checked={employee.gotCbxTEExpenses}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="gotCbxMInternet"
                  label="Maser Intranet"
                  checked={employee.gotCbxMInternet}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Segment>
            </Grid.Column>
          </Grid>

          <br />

          <Form.Group>
            <Field
              name="firstName"
              label="First Name"
              width={4}
              value={employee.firstName}
              component={TextInput}
            />

            <Field
              name="lastName"
              label="Last Name"
              width={4}
              value={employee.lastName}
              component={TextInput}
            />

            <Field
              name="number"
              width={3}
              label="Employee Number"
              value={employee.number}
              component={TextInput}
            />

            <Button
              icon="user"
              loading={loadingEmployeeNumber}
              primary
              style={{ marginTop: "24px", height: "36px" }}
              type="button"
              onClick={() => handleNextEmployeeNumber()}
            />

            {/* <div
              className="enumberbtn"
              style={{ marginTop: "24px", height: "36px" }}
              onClick={() => console.log("clicked = ")}
            /> */}

            <Field
              name="startDate"
              date={true}
              label="Start Date"
              width={5}
              value={employee.startDate}
              component={DateInput}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Field
              name="office"
              label="Reports to Office"
              value={employee.office}
              options={getOffices.map((office) => ({
                key: office.id,
                value: office.id,
                text: office.locationName,
              }))}
              component={SelectInput}
            />

            <Field
              name="location"
              label="Location"
              value={employee.location}
              options={locations.map((location) => ({
                key: location.id,
                value: location.id,
                text: location.locationName,
              }))}
              component={SelectInput}
            />

            <Field
              name="pwLocation"
              label="Physical Work Location"
              value={employee.pwLocation}
              component={TextInput}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Field
              name="employeeType"
              label="Employee Type"
              value={employee.employeeType}
              options={employeeTypes.map((empType) => ({
                key: empType.id,
                value: empType.id,
                text: empType.employeeTypeName,
              }))}
              component={SelectInput}
            />

            <Field
              name="discipline"
              label="Discipline"
              value={employee.discipline}
              options={disciplines.map((discipline) => ({
                key: discipline.id,
                value: discipline.id,
                text: discipline.disciplineName,
              }))}
              component={SelectInput}
            />

            <Field
              name="jobTitle"
              label="Job Title"
              value={employee.jobTitle}
              component={TextInput}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Field
              name="designation"
              label="Designation"
              value={employee.designation}
              clearable
              options={designations.map((designation) => ({
                key: designation.id,
                value: designation.id,
                text: designation.designationName,
              }))}
              component={SelectInput}
            />

            <Field
              name="managerEmail"
              label="Manager"
              value={employee.managerEmail}
              search
              options={managers.map((manager) => ({
                key: manager.managerEmail,
                value: manager.managerEmail,
                text: manager.managerName,
              }))}
              component={SelectInput}
            />

            <Field
              name="companyCode"
              label="Company Code"
              value={employee.companyCode}
              options={companyCode}
              component={SelectInput}
            />
          </Form.Group>

          {employee.typeTechnical === "3" && (
            <>
              <h3>Row Project Information</h3>

              <Form.Group widths="equal">
                <Field
                  name="clientName"
                  label="Client Name"
                  value={employee.clientName}
                  component={TextInput}
                />

                <Field
                  name="projectName"
                  label="Project Name"
                  value={employee.projectName}
                  component={TextInput}
                />

                <Field
                  name="jobSiteLocation"
                  label="Job Site Location"
                  value={employee.jobSiteLocation}
                  component={TextInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Field
                  name="projectNumber"
                  label="Project Number"
                  value={employee.projectNumber}
                  component={TextInput}
                />

                <Field
                  name="perDiem"
                  label="Per Diem (logding & meals)"
                  value={employee.perDiem}
                  options={perDiem}
                  component={SelectInput}
                />

                <Field
                  name="mileageRate"
                  label="Mileage Rate"
                  value={employee.mileageRate}
                  options={mileageRate}
                  component={SelectInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Field
                  name="cellPhone"
                  label="Cell Phone (per days worked)"
                  value={employee.cellPhone}
                  options={billNonBill}
                  component={SelectInput}
                />

                <Field
                  name="computer"
                  label="Computer (per days worked)"
                  value={employee.computer}
                  options={billNonBill}
                  component={SelectInput}
                />

                <Field
                  name="mileage"
                  label="Mileage"
                  value={employee.mileage}
                  options={billNonBill}
                  component={SelectInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Field
                  name="employeeHr.address"
                  label="Address"
                  rows={2}
                  value={employee.employeeHr.address}
                  component={TextAreaInput}
                />
                <Field
                  name="comments"
                  label="Comments"
                  rows={2}
                  value={employee.comments}
                  component={TextAreaInput}
                />
              </Form.Group>
            </>
          )}

          <Accordion>
            <Accordion.Title
              active={accordionActive}
              onClick={(e, data) => setAccordion(!accordionActive)}
            >
              <h3>For HR Department Use Only</h3>
            </Accordion.Title>
            <Accordion.Content active={accordionActive}>
              <Grid>
                <Grid.Column width={16}>
                  <Grid.Row>
                    <Form.Group widths="equal">
                      <Field
                        name="employeeHr.hrRepresentative"
                        label="HR Representative"
                        value={employee.employeeHr.hrRepresentative}
                        options={hrRepresentative}
                        component={SelectInput}
                      />
                      <Field
                        name="employeeHr.rateType"
                        label="Rate Type"
                        value={employee.employeeHr.rateType}
                        options={rateType}
                        component={SelectInput}
                      />

                      <Field
                        name="employeeHr.payRate"
                        label="Pay Rate"
                        value={employee.employeeHr.payRate}
                        component={TextInput}
                      />
                    </Form.Group>
                  </Grid.Row>

                  <Grid.Row>
                    <Form.Group widths="equal">
                      <Field
                        name="employeeHr.hoursWeek"
                        label="Hours/Week"
                        value={employee.employeeHr.hoursWeek}
                        component={TextInput}
                      />
                      <Field
                        name="employeeHr.adpFileNumber"
                        label="ADP File Number"
                        value={employee.employeeHr.adpFileNumber}
                        component={TextInput}
                      />

                      <Field
                        name="updatedByName"
                        label="Last Updated By"
                        value={employee.updatedByName}
                        component={TextInput}
                      />
                    </Form.Group>
                  </Grid.Row>

                  <Grid.Row>
                    <Form.Group widths="equal">
                      <Field
                        name="billingTitle"
                        label="Billing Title"
                        value={employee.billingTitle}
                        options={billingTitles.map((billingTitle) => ({
                          key: billingTitle.id,
                          value: billingTitle.id,
                          text: billingTitle.billingTitleName,
                        }))}
                        component={SelectInput}
                      />
                      <Field
                        name="e48Week"
                        label="48 Week Billable Goal (in Hours)"
                        value={employee.e48Week}
                        component={TextInput}
                      />

                      <Field
                        name="e52Week"
                        label="52 Week Billable Goal (in Hours)"
                        value={employee.e52Week}
                        component={TextInput}
                      />
                    </Form.Group>
                  </Grid.Row>
                </Grid.Column>
              </Grid>

              <Grid style={{ marginTop: "-24px" }}>
                <Grid.Column width={5} style={{ marginTop: "10px" }}>
                  <br />
                  <Field
                    name="employeeHr.halogenUser"
                    label="Halogen User"
                    checked={employee.employeeHr.halogenUser}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeHr.hrSetupCompleteCbx"
                    label="HR Setup Complete"
                    checked={employee.employeeHr.hrSetupCompleteCbx}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                </Grid.Column>
                <Grid.Column width={11}>
                  <Field
                    name="comments"
                    label="Comments"
                    rows={3}
                    value={employee.comments}
                    component={TextAreaInput}
                  />
                </Grid.Column>
              </Grid>
            </Accordion.Content>
          </Accordion>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Needs",

      pane: (
        <Tab.Pane key="tab2">
          <h3>
            Checklist for {employee.firstName} {employee.lastName}{" "}
          </h3>

          <Grid>
            <Grid.Column width={8}>
              <h3>Position Type</h3>

              <Segment>
                <Grid>
                  <Grid.Column width={16}>
                    <Field
                      name="typeCbxMPosition"
                      label="Management Position"
                      checked={employee.typeCbxMPosition}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="typeCbxESAMTraining"
                      label="This Employee Should Attend Management Training"
                      checked={employee.typeCbxESAMTraining}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                </Grid>
              </Segment>

              <h3>Company Vehicle</h3>

              <Segment>
                <Grid>
                  <Grid.Column width={16}>
                    <Field
                      name="cvCbxEDMVehicle"
                      label="Employee will be Driving Maser Vehicle"
                      checked={employee.cvCbxEDMVehicle}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="cvCbxEAMVehicle"
                      label="Employee Assigned Maser Vehicle"
                      checked={employee.cvCbxEAMVehicle}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="cvCbxGasCard"
                      label="Gas Card"
                      checked={employee.cvCbxGasCard}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="cvCbxEZPass"
                      label="EZ Pass"
                      checked={employee.cvCbxEZPass}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <h3>Items Needed</h3>

              <Segment>
                <Grid>
                  <Grid.Column width={8}>
                    <Field
                      name="inCbxBCards"
                      label="Business Cards"
                      checked={employee.inCbxBCards}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="inCbxSPhone"
                      label="Smart Phone / Stipend"
                      checked={employee.inCbxSPhone}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="inCbxPResume"
                      label="Profess. Resume"
                      checked={employee.inCbxPResume}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Form.Group inline>
                      <Field
                        name="inCbxLaptop"
                        label="Office Laptop"
                        checked={employee.inCbxLaptop}
                        type="checkbox"
                        component={CheckboxInput}
                      />
                      <Popup
                        trigger={
                          <Icon
                            color="black"
                            size="tiny"
                            inverted
                            circular
                            name="info"
                          />
                        }
                        content="Refer to email file attachment: Typical Computer Hardware by Employee Role to determine if a laptop can or should be selected"
                        inverted
                      />
                    </Form.Group>

                    <Form.Group inline>
                      <Field
                        name="inCbxDesktop"
                        label="Desktop"
                        checked={employee.inCbxDesktop}
                        type="checkbox"
                        component={CheckboxInput}
                      />
                      <Popup
                        trigger={
                          <Icon
                            color="black"
                            size="tiny"
                            inverted
                            circular
                            name="info"
                          />
                        }
                        content="Refer to email file attachment: Typical Computer Hardware by Employee Role to determine if a desktop can or should be selected"
                        inverted
                      />
                    </Form.Group>

                    <Field
                      name="inCbxUsbAccess"
                      label="USB Access"
                      checked={employee.inCbxUsbAccess}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="inCbxDPhone"
                      label="Desktop Phone"
                      checked={employee.inCbxDPhone}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    {/* <Field
                      name="inCbxOther"
                      label="Other"
                      checked={employee.inCbxOther}
                      type="checkbox"
                      component={CheckboxInput}
                    /> */}

                    <Form.Checkbox
                      name="inCbxOther"
                      label="Other"
                      checked={employee.inCbxOther}
                      onChange={handleCbxInputChange}
                    />
                  </Grid.Column>
                  <Grid.Column style={{ marginTop: "98px" }} width={8}>
                    <Form.Group inline>
                      <Field
                        name="inCbxFieldLaptop"
                        label="Field Laptop"
                        checked={employee.inCbxFieldLaptop}
                        type="checkbox"
                        component={CheckboxInput}
                      />
                      <Popup
                        trigger={
                          <Icon
                            color="black"
                            size="tiny"
                            inverted
                            circular
                            name="info"
                          />
                        }
                        content="Refer to email file attachment: Typical Computer Hardware by Employee Role to determine if a field laptop can or should be selected"
                        inverted
                      />
                    </Form.Group>
                  </Grid.Column>
                </Grid>

                {employee.inCbxOther && (
                  <Grid>
                    <Grid.Column style={{ marginTop: "-20px" }} width={16}>
                      <Field
                        name="inTxtOther"
                        placeholder="enter other item info needed here"
                        value={employee.inTxtOther}
                        component={TextInput}
                      />
                    </Grid.Column>
                  </Grid>
                )}
              </Segment>
            </Grid.Column>
          </Grid>

          <br />

          <Grid>
            <Grid.Column width={8}>
              <Field
                name="adminAssistant"
                label="Administrative Assistant"
                value={employee.adminAssistant}
                component={TextInput}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
                name="sF330Discipline"
                label="SF 330 Discipline Code"
                value={employee.sF330Discipline}
                options={sF330Disciplines.map((sF330Discipline) => ({
                  key: sF330Discipline.id,
                  value: sF330Discipline.id,
                  text: sF330Discipline.sf330DisciplineName,
                }))}
                component={SelectInput}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={8}>
              <Field
                name="billingTitle"
                label="Billing Title"
                value={employee.billingTitle}
                options={billingTitles.map((billingTitle) => ({
                  key: billingTitle.id,
                  value: billingTitle.id,
                  text: billingTitle.billingTitleName,
                }))}
                component={SelectInput}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Grid>
                <Grid.Column width={8}>
                  <Field
                    name="e48Week"
                    label="48 Week Billable Goal (in Hours)"
                    value={employee.e48Week}
                    component={TextInput}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name="e52Week"
                    label="52 Week Billable Goal (in Hours)"
                    value={employee.e52Week}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>

          <h3>Safety Equipment</h3>

          <Segment>
            <Grid>
              <Grid.Column width={4}>
                <Form.Checkbox
                  name="seCbxHHats"
                  label="Hard Hats"
                  checked={employee.seCbxHHats}
                  onChange={handleCbxInputChange}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Field
                  name="seCbxSGlasses"
                  label="Safety Glasses"
                  checked={employee.seCbxSGlasses}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Checkbox
                  name="seCbxSVests"
                  label="Safety Vests"
                  checked={employee.seCbxSVests}
                  onChange={handleCbxInputChange}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Checkbox
                  name="seCbxOther"
                  label="Other"
                  checked={employee.seCbxOther}
                  onChange={handleCbxInputChange}
                />
              </Grid.Column>
            </Grid>

            {employee.seCbxHHats && (
              <Grid>
                <Grid.Column width={16}>
                  <Field
                    name="seHatColor"
                    placeholder="select hard hat color"
                    value={employee.seHatColor}
                    options={seHatColors}
                    component={SelectInput}
                  />
                </Grid.Column>
              </Grid>
            )}

            {employee.seCbxSVests && (
              <Grid>
                <Grid.Column width={8}>
                  <Field
                    name="seNeededType"
                    placeholder="select vest type"
                    value={employee.seNeededType}
                    options={seNeededTypes}
                    component={SelectInput}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name="seSize"
                    placeholder="select vest size"
                    value={employee.seSize}
                    options={seSizes}
                    component={SelectInput}
                  />
                </Grid.Column>
              </Grid>
            )}

            {employee.seCbxOther && (
              <Grid>
                <Grid.Column width={16}>
                  <Field
                    name="seTxtOther"
                    placeholder="enter other safety equipment description here"
                    value={employee.seTxtOther}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid>
            )}
          </Segment>

          <Form.Group widths="equal">
            <Field
              name="ssNeeded"
              label="Special Software Needed"
              rows={3}
              value={employee.ssNeeded}
              component={TextAreaInput}
            />
            <Field
              name="shNeeded"
              label="Special Hardware Needed"
              rows={3}
              value={employee.shNeeded}
              component={TextAreaInput}
            />
            <Field
              name="seatingArrangement"
              label="Seating Arrangement"
              rows={3}
              value={employee.seatingArrangement}
              component={TextAreaInput}
            />
          </Form.Group>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Training",

      pane: (
        <Tab.Pane key="tab3">
          <h3>
            Checklist for {employee.firstName} {employee.lastName}{" "}
          </h3>

          <Grid>
            <Grid.Column width={16}>
              <h3>Health & Safety Training</h3>

              <Segment>
                <Form.Group widths="equal">
                  <Field
                    name="employeeTraining.hstCbxSSLeader"
                    label="Site Safety Leader/PM"
                    checked={employee.employeeTraining.hstCbxSSLeader}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxOsha8HazWoper"
                    label="OSHA 8 Hour HAZWoper Refresher"
                    checked={employee.employeeTraining.hstCbxOsha8HazWoper}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxCprFirstAid"
                    label="CPR/First Aid/AED"
                    checked={employee.employeeTraining.hstCbxCprFirstAid}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Field
                    name="employeeTraining.hstCbxRFSafety"
                    label="Radio frequency/Rooftop Safety"
                    checked={employee.employeeTraining.hstCbxRFSafety}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxFProtection"
                    label="Fall Protection"
                    checked={employee.employeeTraining.hstCbxFProtection}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxHProtection"
                    label="Hearing Protection"
                    checked={employee.employeeTraining.hstCbxHProtection}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Field
                    name="employeeTraining.hstCbxOsha10Safety"
                    label="OSHA 10 Hour Construction Safety"
                    checked={employee.employeeTraining.hstCbxOsha10Safety}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxCSpace"
                    label="Confiined Space"
                    checked={employee.employeeTraining.hstCbxCSpace}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxESurveyors"
                    label="Ethics for Surveyors"
                    checked={employee.employeeTraining.hstCbxESurveyors}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Field
                    name="employeeTraining.hstCbxOsha24HazWoper"
                    label="OSHA 24 Hour HazWoper"
                    checked={employee.employeeTraining.hstCbxOsha24HazWoper}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxASLift"
                    label="Aerial/Scissor Lift"
                    checked={employee.employeeTraining.hstCbxASLift}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxRSManagers"
                    label="Reasonable Suspicion for Managers"
                    checked={employee.employeeTraining.hstCbxRSManagers}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Field
                    name="employeeTraining.hstCbxOsha40HazWoper"
                    label="OSHA 40 Hour Hazwoper"
                    checked={employee.employeeTraining.hstCbxOsha40HazWoper}
                    type="checkbox"
                    component={CheckboxInput}
                  />
                  <Field
                    name="employeeTraining.hstCbxAHSCTraining"
                    label="Admin H&S Checklist Training"
                    checked={employee.employeeTraining.hstCbxAHSCTraining}
                    type="checkbox"
                    component={CheckboxInput}
                  />

                  <Form.Checkbox
                    name="employeeTraining.hstCbxOther"
                    label="Other - Contact Lisa"
                    checked={employee.employeeTraining.hstCbxOther}
                    onChange={handleTrainingCbxInputChange}
                  />
                </Form.Group>

                {employee.employeeTraining.hstCbxOther && (
                  <Grid>
                    <Grid.Column floated={"right"} width={6}>
                      <Field
                        name="employeeTraining.hstTxtOther"
                        placeholder="enter other H&S training needed here"
                        value={employee.employeeTraining.hstTxtOther}
                        component={TextInput}
                      />
                    </Grid.Column>
                  </Grid>
                )}
              </Segment>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={16}>
              <h3>BST Training</h3>

              <Segment>
                <Grid>
                  <Grid.Column width={8}>
                    <Field
                      name="employeeTraining.bsttCbxPInitiation"
                      label="Project Initiation"
                      checked={employee.employeeTraining.bsttCbxPInitiation}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="employeeTraining.bsttCbxAPayable"
                      label="Accounts Payable"
                      checked={employee.employeeTraining.bsttCbxAPayable}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="employeeTraining.bsttCbxARCllections"
                      label="Accounts Receivable/Collections"
                      checked={employee.employeeTraining.bsttCbxARCllections}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Field
                      name="employeeTraining.bsttCbxBilling"
                      label="Billing"
                      checked={employee.employeeTraining.bsttCbxBilling}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="employeeTraining.bsttCbxIReports"
                      label="Inquires/Reports"
                      checked={employee.employeeTraining.bsttCbxIReports}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                    <Field
                      name="employeeTraining.bsttCbxPortals"
                      label="Portals"
                      checked={employee.employeeTraining.bsttCbxPortals}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={16}>
              <h3>Technical & Design</h3>

              <Segment>
                <h4 style={{ textAlign: "center" }}>
                  General & Introductory Education (1000 Courses)
                </h4>
                <Divider />
                <Grid>
                  <Grid.Column width={8}>
                    <h4>
                      All new employees who will be working in CAD are required
                      to take:
                    </h4>
                    <Field
                      name="employeeTraining.tdCbxCStandards"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1010%20-%20CADD%20Standards/1010_-_cadd_standards_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            CADD Standards - 1010{" "}
                          </a>
                          (4 hours),{" "}
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1020%20-%20Vault/1020%20-%20Vault%20Course%20Description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Vault - 1020{" "}
                          </a>
                          (4 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxCStandards}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Field
                      name="employeeTraining.tdCbxSWorkflow"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1000%20-%20Survey%20Workflow/1000_-_survey_workflow_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Survey Workflow - 1000{" "}
                          </a>
                          (4 hours) SURVEY DEPT ONLY
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxSWorkflow}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <h4 style={{ marginTop: "114px" }}>
                      *Click the course title for description and requirements
                    </h4>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <h4>All employees are recommended to take:</h4>
                    <Field
                      name="employeeTraining.tdCbxSurfaces"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1030%20-%20Surfaces/1030_-_surfaces_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Surfaces - 1030{" "}
                          </a>
                          (3 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxSurfaces}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Field
                      name="employeeTraining.tdCbxAlignments"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1040%20-%20Alignments/1040_-_alignments_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Aligments - 1040{" "}
                          </a>
                          (2.5 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxAlignments}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Field
                      name="employeeTraining.tdCbxProfiles"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1050%20-%20Profiles/1050_-_profiles_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Profiles - 1050{" "}
                          </a>
                          (2.5 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxProfiles}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Field
                      name="employeeTraining.tdCbxPNetworks"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1060%20-%20Pipe%20Networks/1060_-_pipe_networks_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Pipe Networks - 1060{" "}
                          </a>
                          (2.5 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxPNetworks}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Field
                      name="employeeTraining.tdCbxCSections"
                      label={
                        <label>
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner/Shared%20Documents/Training/1000%20Courses/1070%20-%20Cross%20Sections/1070_-_cross_sections_course_description.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Cross Sections - 1070{" "}
                          </a>
                          (2.5 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxCSections}
                      type="checkbox"
                      component={CheckboxInput}
                    />

                    <Field
                      name="employeeTraining.tdCbxParcels"
                      label={
                        <label>
                          <a href="/">Parcels - 1080 </a>(4 hours)
                        </label>
                      }
                      checked={employee.employeeTraining.tdCbxParcels}
                      type="checkbox"
                      component={CheckboxInput}
                    />
                  </Grid.Column>
                  <Grid>
                    <Grid.Column width={16}>
                      <Grid.Row>
                        <h4>
                          *Please refer to the{" "}
                          <a
                            href="https://maserc.sharepoint.com/sites/CADDCorner"
                            target="_blank"
                            rel="noreferrer"
                          >
                            CADD Training Calendar
                          </a>{" "}
                          on the intranet for the next available training
                        </h4>
                      </Grid.Row>
                      <Grid.Row>
                        <h4>
                          *These trainings do not account for the additional
                          2000, 3000, and 4000 courses that may be required in
                          the future
                        </h4>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Onboarding",

      pane: (
        <Tab.Pane key="tab4">
          <h3>
            Onboarding Info for {employee.firstName} {employee.lastName}{" "}
          </h3>

          <Grid>
            <Grid.Column width={16}>
              <h3>IT Information</h3>
            </Grid.Column>

            <Grid.Column width={8}>
              <Field
                name="employeeIt.loginName"
                label="Login Name"
                value={employee.employeeIt.loginName}
                component={TextInput}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
                name="employeeIt.loginPassword"
                label="Password"
                value={employee.employeeIt.loginPassword}
                component={TextInput}
              />
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.equipmentShippedDate"
                date={true}
                label="Equipment Shipped Date"
                value={employee.employeeIt.equipmentShippedDate}
                component={DateInput}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Field
                name="employeeIt.equipmentShippedDescription"
                label="Equipment Setup Date"
                value={employee.employeeIt.equipmentShippedDescription}
                component={TextInput}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Field
                name="employeeIt.trackingNumber"
                label="Tracking Number(s)"
                value={employee.employeeIt.trackingNumber}
                component={TextInput}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.monitors"
                label="Monitors"
                value={employee.employeeIt.monitors}
                component={TextInput}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Field
                name="employeeIt.monitorCablesAdapters"
                label="Monitor Cable/Adapters"
                value={employee.employeeIt.monitorCablesAdapters}
                component={TextInput}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.userInEmergencyAlertSystem"
                label="In Emergency Alert System"
                checked={employee.employeeIt.userInEmergencyAlertSystem}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.desktop"
                label="Desktop"
                checked={employee.employeeIt.desktop}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.laptop"
                label="Laptop"
                checked={employee.employeeIt.laptop}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.laptopDockingStation"
                label="Docking Station"
                checked={employee.employeeIt.laptopDockingStation}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={8}>
              <Field
                name="employeeIt.desktopModel"
                label="Desktop Model"
                value={employee.employeeIt.desktopModel}
                component={TextInput}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
                name="employeeIt.laptopModel"
                label="Laptop Model"
                value={employee.employeeIt.laptopModel}
                component={TextInput}
              />
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={16}>
              <Form.Group widths="equal">
                <Field
                  name="employeeIt.keyboard"
                  label="Keyboard"
                  checked={employee.employeeIt.keyboard}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.mouse"
                  label="Mouse"
                  checked={employee.employeeIt.mouse}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.speakers"
                  label="Speakers"
                  checked={employee.employeeIt.speakers}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Field
                  name="employeeIt.neworkCables"
                  label="Network Cables"
                  checked={employee.employeeIt.neworkCables}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.powerCables"
                  label="Power Cables"
                  checked={employee.employeeIt.powerCables}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.powerStrip"
                  label="Power Strip"
                  checked={employee.employeeIt.powerStrip}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Field
                  name="employeeIt.deskPhone"
                  label="Desk Phone"
                  checked={employee.employeeIt.deskPhone}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.stipendFormReceived"
                  label="Stipend Form Received"
                  checked={employee.employeeIt.stipendFormReceived}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.phoneAgreementReceived"
                  label="Phone Agreement Received"
                  checked={employee.employeeIt.phoneAgreementReceived}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeIt.mobilePhoneOrdered"
                  label="Mobile Phone Ordered"
                  checked={employee.employeeIt.mobilePhoneOrdered}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Form.Group>
            </Grid.Column>

            <Grid.Column width={16}>
              <Grid.Row>
                <Form.Group widths="equal">
                  <Field
                    name="employeeIt.deskPhoneExtension"
                    label="Desk Phone Extension"
                    value={employee.employeeIt.deskPhoneExtension}
                    component={TextInput}
                  />
                  <Field
                    name="employeeIt.mobilePhoneNumber"
                    label="Mobile Phone Number"
                    value={employee.employeeIt.mobilePhoneNumber}
                    component={TextInput}
                  />

                  <Field
                    name="employeeIt.mobileNumberPorted"
                    label="Number Ported"
                    value={employee.employeeIt.mobileNumberPorted}
                    options={yesNo}
                    component={SelectInput}
                  />
                </Form.Group>
              </Grid.Row>

              <Grid.Row>
                <Field
                  name="employeeIt.additionalEquipment"
                  label="Additional Equipment"
                  rows={3}
                  value={employee.employeeIt.additionalEquipment}
                  component={TextAreaInput}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid>

          <Grid centered>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.additionalEquipment"
                label="Existing Equipment"
                checked={employee.employeeIt.additionalEquipment}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Field
                name="employeeIt.itSetupCompleteCbx"
                label="IT Setup Complete"
                checked={employee.employeeIt.itSetupCompleteCbx}
                type="checkbox"
                component={CheckboxInput}
              />
            </Grid.Column>
          </Grid>

          <Divider />

          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <h3>HR Information</h3>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name="employeeHr.welcomeEmailSentDate"
                  date={true}
                  label="Welcome Email Sent Date"
                  value={employee.employeeHr.welcomeEmailSentDate}
                  component={DateInput}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Field
                  name="employeeHr.phoneOption"
                  label="Phone Options"
                  value={employee.employeeHr.phoneOption}
                  options={phone}
                  component={SelectInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name="employeeHr.gasCardezPass"
                  label="Gas Card / Ez Pass"
                  value={employee.employeeHr.gasCardezPass}
                  options={gasCardEzPass}
                  component={SelectInput}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Field
                  name="employeeHr.businessCard"
                  label="Business Cards"
                  value={employee.employeeHr.businessCard}
                  options={businessCard}
                  component={SelectInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name="employeeHr.orientationDate"
                  date={true}
                  label="Orientation Date"
                  value={employee.employeeHr.orientationDate}
                  component={DateInput}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Field
                  name="employeeHr.professionalResume"
                  label="Professional Resume"
                  value={employee.employeeHr.professionalResume}
                  options={professionalResume}
                  component={SelectInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name="employeeHr.meetwithMarketing"
                  label="Meet with Marketing"
                  rows={3}
                  value={employee.employeeHr.meetwithMarketing}
                  component={TextAreaInput}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Field
                  name="employeeHr.welcomeBagSent"
                  label="Welcome Bag Sent"
                  rows={3}
                  value={employee.employeeHr.welcomeBagSent}
                  component={TextAreaInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name="employeeHr.travelForOrientation"
                  label="Travel for Orientation"
                  rows={3}
                  value={employee.employeeHr.travelForOrientation}
                  component={TextAreaInput}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Field
                  name="employeeHr.reportOnFirstDayTime"
                  label="Report to on First Day and Time"
                  rows={3}
                  value={employee.employeeHr.reportOnFirstDayTime}
                  component={TextAreaInput}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Field
                  name="employeeHr.i9LinkCbx"
                  label="I9 Link"
                  checked={employee.employeeHr.i9LinkCbx}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeHr.rvTrainingCompleteCbx"
                  label="RV Training Complete"
                  checked={employee.employeeHr.rvTrainingCompleteCbx}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <Field
                  name="employeeHr.addedToRvCbx"
                  label="Added to RV"
                  checked={employee.employeeHr.addedToRvCbx}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeHr.cccCompanyManualCbx"
                  label="Company Code of Conduct & Company Manual Acknowledgement"
                  checked={employee.employeeHr.cccCompanyManualCbx}
                  type="checkbox"
                  component={CheckboxInput}
                />
                <Field
                  name="employeeHr.hrOnboardingCompleteCbx"
                  label="HR Onboarding Complete"
                  checked={employee.employeeHr.hrOnboardingCompleteCbx}
                  type="checkbox"
                  component={CheckboxInput}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadEmployee(match.params.id)
        .then((employee) => setEmployee(new EmployeeFormValues(employee)))
        .finally(() => setLoading(false));

      //console.log("emp " + JSON.stringify(employee));
      //setInCbxOther(true);
    } else {
      setLoading(true);
      newEmployeeInfo()
        //.then(() => setEmployee(new EmployeeFormValues()))
        .finally(() => setLoading(false));
    }
  }, [loadEmployee, match.params.id, newEmployeeInfo]);

  return (
    <>
      <PageTitle title="New Employee" />

      <Segment clearing>
        <FinalForm
          validate={validate}
          initialValues={employee}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine, values }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              {/* {console.log("values = " + JSON.stringify(values))} */}

              <Tab
                menu={{
                  color: "blue",
                  inverted: true,
                  attached: false,
                  tabular: false,
                }}
                panes={panes}
                renderActiveOnly={false}
                activeIndex={activeTabIndex}
                onTabChange={(e, { activeIndex }) =>
                  handleTabChange(activeIndex)
                }
              />

              <br />

              {activeTabIndex === 0 && (
                <Grid>
                  <Grid.Column width={8}>
                    <Button
                      primary
                      onClick={(e, data) => handleTabChange(1)}
                      fluid
                      type="button"
                      icon="right arrow"
                      labelPosition="right"
                      content="Needs"
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <Button
                      color="red"
                      loading={submitting}
                      disabled={loading || invalid || pristine}
                      fluid
                      type="submit"
                      content="Submit"
                    />
                  </Grid.Column>
                </Grid>
              )}

              {activeTabIndex === 1 && (
                <Grid>
                  <Grid.Column width={8}>
                    <Button
                      primary
                      onClick={(e, data) => handleTabChange(0)}
                      fluid
                      type="button"
                      icon="left arrow"
                      labelPosition="left"
                      content="Employee"
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <Button
                      primary
                      onClick={
                        (e, data) => handleTabChange(2)
                        //(e, data) => console.log("load emp = " + JSON.stringify(employee))
                      }
                      fluid
                      type="button"
                      icon="right arrow"
                      labelPosition="right"
                      content="Training"
                    />
                  </Grid.Column>
                </Grid>
              )}

              {activeTabIndex === 2 && (
                <Grid>
                  <Grid.Column width={8}>
                    <Button
                      primary
                      onClick={
                        (e, data) => handleTabChange(1)
                        //console.log("load emp = " + JSON.stringify(employee))
                      }
                      fluid
                      type="button"
                      icon="left arrow"
                      labelPosition="left"
                      content="Needs"
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <Button
                      color="red"
                      loading={submitting}
                      disabled={loading || invalid || pristine}
                      fluid
                      type="submit"
                      content="Submit"
                    />
                  </Grid.Column>
                </Grid>
              )}

              {activeTabIndex === 3 && (
                <Grid>
                  <Grid.Column width={16}>
                    <Button
                      color="red"
                      loading={submitting}
                      disabled={loading}
                      fluid
                      type="submit"
                      content="Update Onboarding"
                    />
                  </Grid.Column>
                </Grid>
              )}
            </Form>
          )}
        />
      </Segment>
    </>
  );
};

export default observer(EmployeeForm);
