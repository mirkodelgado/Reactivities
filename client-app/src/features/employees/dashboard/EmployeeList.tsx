import React, { Fragment, useContext } from "react";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Item, Segment } from "semantic-ui-react";
import EmployeeListItem from "./EmployeeListItem";

const EmployeeList = () => {
  const rootStore = useContext(RootStoreContext);
  const { employeesByDefault } = rootStore.employeeStore;

  //console.log("employeesByDefault = " + JSON.stringify(employeesByDefault));

  return (
    <Fragment>
      <Segment clearing>
        <Item.Group divided>
          {employeesByDefault.map((employee) => (
            <EmployeeListItem key={employee.number} employee={employee} />
          ))}
        </Item.Group>
      </Segment>

      {/* {employeesByDefault.map(([group, employees]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {employees.map((employee) => (
              <EmployeeListItem key={employee.number} employee={employee} />
            ))}
          </Item.Group>
        </Fragment>
      ))} */}
    </Fragment>
  );
};

export default observer(EmployeeList);
