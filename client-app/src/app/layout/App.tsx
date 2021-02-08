import React, { Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
import Footer from "../../features/footer/Footer";
import { Container } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import 'mobx-react-lite/batchingForReactDom';  // https://stackoverflow.com/questions/61654633/mobx-react-console-warning-related-observer

import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import Home from "../../features/home/Home";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import ModalExampleModal from "../common/modals/ModalExampleModal";
import AzureAD, { IAzureADFunctionProps } from "react-aad-msal";
import { AuthProvider } from "./AuthProvider";
import EmployeeForm from "../../features/employees/form/EmployeeForm";
import EmployeeDashboard from "../../features/employees/dashboard/EmployeeDashboard";
import SafetyChecklistForm from "../../features/safety/forms/SafetyChecklistForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <AzureAD provider={AuthProvider} forceLogin={true}>
      {({ login, logout, accountInfo, authenticationState, error }: IAzureADFunctionProps) => {
        return (
          <Fragment>
            <ModalExampleModal />
            <ToastContainer position="bottom-right" />
            <NavBar login={login} logout={logout} authenticationState={authenticationState} />

            <Container style={{ marginTop: "4em" }}>
              <Switch>
                <Route exact path="/" render={rp => <Home login={login} accountInfo={accountInfo} authenticationState={authenticationState} {...rp} /> }/>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route exact path="/employees" component={EmployeeDashboard} />
                <Route exact path={["/newEmployee", "/updateEmployee/:id"]} component={EmployeeForm} />
                <Route exact path="/newChecklist" component={SafetyChecklistForm} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>

            <div className="margin_bottom_40"></div>
            <div className="margin_bottom_40"></div>

            <Footer />
          </Fragment>
        );
      }}
    </AzureAD>
  );
};

export default withRouter(observer(App));
