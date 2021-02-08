import { format } from "date-fns";
import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Button, Item } from "semantic-ui-react";

import { IEmployee } from "../../../app/models/employee";
import { RootStoreContext } from "../../../app/stores/rootStore";



const EmployeeListItem: React.FC<{ employee: IEmployee }> = ({ employee }) => {

  const rootStore = useContext(RootStoreContext);
  const {
    locations,
  } = rootStore.employeeStore;
  
  const getOfficeName = (value: string) => {
     const office = locations.filter(location => location.id === value)
  
     return office[0].locationName;
  };
  


  return (
    <Item key={employee.number}>
      <Item.Content>
        <Item.Header as="a">
          {employee.firstName} {employee.lastName} - {employee.number}
        </Item.Header>
        <Item.Description><b>Start Date:</b> { employee.startDate === null ? "Pending" : format(new Date(employee.startDate!), "MM-dd-yyyy") }</Item.Description>
        <Item.Description><b>Job Title:</b> {employee.jobTitle}</Item.Description>
        <Item.Description><b>Manager:</b> {employee.managerName}</Item.Description>
        <Item.Description><b>Office:</b> {getOfficeName(employee.office)}</Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`/updateEmployee/${employee.number}`}
            floated="right"
            content="View"
            color="blue"
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default EmployeeListItem;
