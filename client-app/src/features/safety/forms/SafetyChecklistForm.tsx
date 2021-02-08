import React, { useContext, useState, useEffect } from "react";

import { Form as FinalForm, Field } from "react-final-form";

import {
  Form,
  Segment,
  Button,
} from "semantic-ui-react";

import { RootStoreContext } from "../../../app/stores/rootStore";
import PageTitle from "../../../app/common/form/PageTitle";

import {
  combineValidators, isRequired,
} from "revalidate";
import { SafetyChecklistFormValues } from "../../../app/models/safetyChecklist";
import { observer } from "mobx-react-lite";
import TextInput from "../../../app/common/form/TextInput";
import DateInput from "../../../app/common/form/DateInput";
import SelectInput from "../../../app/common/form/SelectInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { IProject } from "../../../app/models/project";

const validate = combineValidators({
  emergencyReportingNumber: isRequired({ message: "Emergency Reporting Number is required" }),
  emergencyMedicalFacility: isRequired("Emergency Medical Facility"),
});

const SafetyChecklistForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    loadingInitial,
    loadSafety,
    departments,
    getSSLs,
    users,
    hazzards,
    projects,
  } = rootStore.safetyChecklistStore;

  const [situationValue, setSituationValue] = useState(new Map());

  const handleSituationChange = (key: number, data: any) => {
    console.log("key = " + key + "; value = " + JSON.stringify(data.value));

    if (data.value === "") {
      setSituationValue((situation) => {
        const newSituation = new Map(situation);
        newSituation.delete(key);
        return newSituation;
      });
    } else {
      setSituationValue((situation) => new Map(situation).set(key, data.value));
    }

    //situationValue.forEach((value, key) => {
    //  console.log("key = " + key + '; value = ' + value )
    //})
  };

  const [otherPersonnel, setOtherPersonnelValue] = useState([]);

  const handleOtherPersonnelChange = (data: any) => {
    setOtherPersonnelValue(data.value);
  };

  const [safetyChecklist, setSafetyChecklist] = useState(
    new SafetyChecklistFormValues()
  );

  const [loading, setLoading] = useState(false);

  const getSituation = (value: string) => {
    return hazzards.filter((h) => h.situation === value);
  };

  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchLoading = (loading: boolean) => {
    setSearchLoading(loading);
  };

  const [results, setSeachResultValues] = useState<IProject[]>();

  const handleSeachResultValues = (results: IProject[]) => {
    setSeachResultValues(results);
  };

  const [value, setResultValue] = useState("");

  useEffect(() => {
    loadSafety();
  }, [loadSafety]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Safety Checklist..." />;

  const handleFinalFormSubmit = (values: any) => {
    safetyChecklist.otherAssignedPersonnel_id = otherPersonnel;

    situationValue.forEach((situation, key) => {

      switch (key) {
        case 1:
          safetyChecklist.situation01 = situation;
          break;
        case 2:
          safetyChecklist.situation02 = situation;
          break;
        case 3:
          safetyChecklist.situation03 = situation;
          break;
        case 4:
          safetyChecklist.situation04 = situation;
          break;
        case 5:
          safetyChecklist.situation05 = situation;
          break;
        case 6:
          safetyChecklist.situation06 = situation;
          break;
        case 7:
          safetyChecklist.situation07 = situation;
          break;
        case 8:
          safetyChecklist.situation08 = situation;
          break;
        case 9:
          safetyChecklist.situation09 = situation;
          break;
        case 10:
          safetyChecklist.situation10 = situation;
          break;
        case 11:
          safetyChecklist.situation11 = situation;
          break;
        case 12:
          safetyChecklist.situation12 = situation;
          break;
        case 13:
          safetyChecklist.situation13 = situation;
          break;
      }

      //console.log("safetyChecklist = " + JSON.stringify(safetyChecklist));
    });
  };

  const handleResultValue = (value: string) => {
    console.log("setResultValue = " + value);
    setResultValue(value);
  };

  const handleSingleResultValue = (valueA: string) => {
    //console.log('valueProp = ' + JSON.stringify(valueProp));

    handleSearchLoading(true);

    setTimeout(() => {
      if (valueA.length < 1) {
        handleSearchLoading(false);
        handleSeachResultValues([]);
        handleResultValue("");
        return;
      } else {
        handleResultValue(valueA);
      }

      const condition = new RegExp(valueA, "i");
      const results = projects.filter((res) => condition.test(res.title));

      handleSearchLoading(false);
      handleSeachResultValues(results);
    }, 300);
  };

  return (
    <>
      <PageTitle title="New Safety Checklist" />

      <Segment clearing>
        <FinalForm
          validate={validate}
          initialValues={safetyChecklist}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              <Form.Group widths="equal">

              {/* Option #1 - Throws error, not sure of impact, slow performance */}

              {/* <Field
                  name="project"
                  label="Project"
                  value={safetyChecklist.project_number}
                  search
                  //minCharacters={3}
                  options={projects.map((project) => ({
                    key: project.title,
                    value: project.title,
                    text: project.title,
                  }))}
                  component={SelectInput}
                /> */}

                {/*  Option #2 - Does not throw error, slow performance with indication, cannot get search render properly */}

                {/* <div>
                  <label><b>Project</b></label>
                  <Search
                  //input={{ icon: "search" }}
                  loading={searchLoading}
                  onResultSelect={(e, result) => handleResultValue(result.title)}

                  onSearchChange={(e, result) => handleSingleResultValue(result.value!)}
                  //onSearchChange={_.debounce(handleSearchChange, 500, {
                  //  leading: true,
                  //})}

                  results={results}
                  value={value}
                />
                </div> */}

              {/* Option #3 - Throws error, not sure of impact, slow performance */}

                {/* <Form.Dropdown
                  label="Project"
                  name="project_number"
                  search
                  selection
                  options={projects.map((project) => ({
                    key: project.title,
                    value: project.title,
                    text: project.title,
                  }))}
                /> */}

              {/* Option #4 - Throws error, not sure of impact, best performance, will render properly */}

                <Form.Input list="project" name="project" label="Project" />
                <datalist id="project">
                  {projects.map((project) => (
                    <option
                      key={project.title}
                      value={project.title}
                    >
                      {project.title}
                    </option>
                  ))}
                </datalist>

                <Field
                  name="title"
                  label="Discipline"
                  value={safetyChecklist.title}
                  clearable
                  options={departments.map((department) => ({
                    key: department.id,
                    value: department.id,
                    text: department.name,
                  }))}
                  component={SelectInput}
                />

                <Field
                  name="siteSafetyLeader_id"
                  label="Site Safety Leader"
                  value={safetyChecklist.siteSafetyLeader_id}
                  options={getSSLs.map((ssl) => ({
                    key: ssl.id,
                    value: ssl.id,
                    text: ssl.name,
                  }))}
                  component={SelectInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  name="otherAssignedPersonnel"
                  label="Other Assigned Personnel"
                  multiple
                  selection
                  onChange={(e, data) => handleOtherPersonnelChange(data)}
                  options={users.map((otherUser) => ({
                    key: otherUser.id,
                    value: otherUser.id,
                    text: otherUser.name,
                  }))}
                />

                <Field
                  name="estimatedStartDate"
                  date={true}
                  label="Estimated Start Date"
                  value={safetyChecklist.estimatedStartDate}
                  component={DateInput}
                />

                <Field
                  name="estimatedCompletionDate"
                  date={true}
                  label="Estimated Completion Date"
                  value={safetyChecklist.estimatedCompletionDate}
                  component={DateInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Field
                  name="emergencyCoordinator_id"
                  label="Emergency Coordinator on Site"
                  value={safetyChecklist.emergencyCoordinator_id}
                  options={users.map((user) => ({
                    key: user.id,
                    value: user.id,
                    text: user.name,
                  }))}
                  component={SelectInput}
                />

                <Field
                  name="emergencyReportingNumber"
                  label="Emergency Reporting Number"
                  value={safetyChecklist.emergencyReportingNumber}
                  component={TextInput}
                />

                <Field
                  name="emergencyMedicalFacility"
                  label="Emergency Medical Facility"
                  value={safetyChecklist.emergencyMedicalFacility}
                  component={TextInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Field
                  name="emergencySignal"
                  label="Emergency Signal"
                  rows={2}
                  value={safetyChecklist.emergencySignal}
                  component={TextAreaInput}
                />

                <Field
                  name="evacRouteAndMusterPoint"
                  label="Evacuation Route and Muster Point"
                  rows={2}
                  value={safetyChecklist.evacRouteAndMusterPoint}
                  component={TextAreaInput}
                />

                <Field
                  name="medicalFacilityAddressNum"
                  label="Medical Facility Address & Number"
                  rows={2}
                  value={safetyChecklist.medicalFacilityAddressNum}
                  component={TextAreaInput}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Outdoors/General"
                  name="situation01"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(1, data)}
                  options={getSituation("01").map((s01) => ({
                    key: s01.id,
                    value: s01.id,
                    text: s01.name,
                  }))}
                />

                <Form.Dropdown
                  label="Work on Structures/Buildings"
                  name="situation02"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(2, data)}
                  options={getSituation("02").map((s02) => ({
                    key: s02.id,
                    value: s02.id,
                    text: s02.name,
                  }))}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Work on Active Roadways"
                  name="situation03"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(3, data)}
                  options={getSituation("03").map((s03) => ({
                    key: s03.id,
                    value: s03.id,
                    text: s03.name,
                  }))}
                />

                <Form.Dropdown
                  label="Work on Active Railroad/Railroad Right-of-way"
                  name="situation04"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(4, data)}
                  options={getSituation("04").map((s04) => ({
                    key: s04.id,
                    value: s04.id,
                    text: s04.name,
                  }))}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Construction Sites"
                  name="situation05"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(5, data)}
                  options={getSituation("05").map((s05) => ({
                    key: s05.id,
                    value: s05.id,
                    text: s05.name,
                  }))}
                />

                <Form.Dropdown
                  label="Trench/Excavation"
                  name="situation06"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(6, data)}
                  options={getSituation("06").map((s06) => ({
                    key: s06.id,
                    value: s06.id,
                    text: s06.name,
                  }))}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Waterfront/Bridgework"
                  name="situation07"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(7, data)}
                  options={getSituation("07").map((s07) => ({
                    key: s07.id,
                    value: s07.id,
                    text: s07.name,
                  }))}
                />

                <Form.Dropdown
                  label="Hazardous Waste/Chemicals"
                  name="situation08"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(8, data)}
                  options={getSituation("08").map((s08) => ({
                    key: s08.id,
                    value: s08.id,
                    text: s08.name,
                  }))}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Confined Spaces"
                  name="situation09"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(9, data)}
                  options={getSituation("09").map((s09) => ({
                    key: s09.id,
                    value: s09.id,
                    text: s09.name,
                  }))}
                />

                <Form.Dropdown
                  label="Scaffolds"
                  name="situation10"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(10, data)}
                  options={getSituation("10").map((s10) => ({
                    key: s10.id,
                    value: s10.id,
                    text: s10.name,
                  }))}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Work on Large Chemical/Petrochemical Sites"
                  name="situation11"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(11, data)}
                  options={getSituation("11").map((s11) => ({
                    key: s11.id,
                    value: s11.id,
                    text: s11.name,
                  }))}
                />

                <Form.Dropdown
                  label="Work on Pipeline Sites"
                  name="situation12"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(12, data)}
                  options={getSituation("12").map((s12) => ({
                    key: s12.id,
                    value: s12.id,
                    text: s12.name,
                  }))}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Dropdown
                  label="Wastewater Treatment Facilities"
                  name="situation13"
                  multiple
                  selection
                  onChange={(e, data) => handleSituationChange(13, data)}
                  options={getSituation("13").map((s13) => ({
                    key: s13.id,
                    value: s13.id,
                    text: s13.name,
                  }))}
                />
              </Form.Group>

              <Button
                loading={submitting}
                disabled={loading || invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />

              <Button
                onClick={
                  (e, data) =>
                    situationValue.forEach((value, key) => {
                      console.log("key = " + key + "; value = " + value);
                    })
                }
                disabled={loading}
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          )}
        />
      </Segment>
    </>
  );
};

export default observer(SafetyChecklistForm);
