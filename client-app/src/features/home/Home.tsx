import React from "react";
import { AuthenticationState, IAccountInfo } from "react-aad-msal";
import { Link } from "react-router-dom";
import { Card, Container, Grid, Image, Segment } from "semantic-ui-react";
import PageTitle from "../../app/common/form/PageTitle";

interface IProps {
  login: () => void;
  accountInfo: IAccountInfo | null;
  authenticationState: AuthenticationState;
}

const Home: React.FC<IProps> = ({ accountInfo }) => {
  return (
    <>
      <PageTitle title="React Try Home" />

      {accountInfo && <h2>Welcome {accountInfo.account.name}</h2>}

      <Segment inverted textAlign="center" vertical className="masthead">
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Card as={Link} to="/createActivity">
                  <Image src="/assets/imagesP.png" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>New Activity</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card as={Link} to="/activities">
                  <Image src="/assets/imagesS.png" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>All Activities</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card as={Link} to="/newemployee">
                  <Image src="/assets/imagesT.png" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>New Employee</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Card as={Link} to="/employees">
                  <Image src="/assets/imagesP.png" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>All Employees</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card as={Link} to="/newChecklist">
                  <Image src="/assets/imagesS.png" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>New Checklist</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
};

export default Home;
