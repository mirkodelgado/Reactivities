import React, { useContext, useEffect, useState } from 'react'

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PageTitle from "../../../app/common/form/PageTitle";
import { Grid, Loader } from 'semantic-ui-react';
import EmployeeList from './EmployeeList';

import InfiniteScroll from 'react-infinite-scroller';

const EmployeeDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadEmployees, loadingInitial, setPage, page, totalPages } = rootStore.employeeStore;

    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
      setLoadingNext(true);
      setPage(page + 1);
      loadEmployees().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadEmployees();
      }, [loadEmployees]);
    
      if (loadingInitial && page === 0)
        return <LoadingComponent content="Loading Employees..." />;
        
    return (
        <>
        <PageTitle title="All Employees" />
  
        <Grid>
          <Grid.Column width={10}>
            <InfiniteScroll pageStart = {0} loadMore={handleGetNext} hasMore={!loadingNext && page + 1 < totalPages} initialLoad={false} >
            <EmployeeList />
            </InfiniteScroll>
            {/* <Button floated='right' content='More..' positive disabled={totalPages === page + 1 }
            onClick={handleGetNext} loading={loadingNext} /> */}
          </Grid.Column>
  
          <Grid.Column width={6}>
            <h2>Employee Filters</h2>
          </Grid.Column>

          <Grid.Column width={10}>
            <Loader active={loadingNext} />
          </Grid.Column>

        </Grid>
      </>
      )
}

export default observer(EmployeeDashboard);
