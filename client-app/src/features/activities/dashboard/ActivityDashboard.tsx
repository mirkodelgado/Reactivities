import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PageTitle from "../../../app/common/form/PageTitle";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]); // add 2nd param (empty array) to prevent infinite loop !!

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <>
      <PageTitle title="All Activities" />

      <Grid>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>

        <Grid.Column width={6}>
          <h2>Activity filters</h2>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default observer(ActivityDashboard);
