import React, { useContext } from "react";
import { Container, Menu, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { AuthenticationState } from "react-aad-msal";



interface IProps {
  login: () => void;
  logout: () => void;
  authenticationState: AuthenticationState;
}

const NavBar: React.FC<IProps> = ({ login, logout, authenticationState }) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;

  const isInProgress = authenticationState === AuthenticationState.InProgress;
  const isAuthenticated =
    authenticationState === AuthenticationState.Authenticated;
  const isUnauthenticated =
    authenticationState === AuthenticationState.Unauthenticated;
    
  return (
    <Segment inverted>

      <Menu fixed="top" inverted size="large" stackable >
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img
              src="/assets/CED_Horizontal Logo_WHITE_RBG_small.png"
              alt="logo"
              style={{ height:"100%", width:"100%"}}
            />
          </Menu.Item>

          <Menu.Menu position="right">
            {(isUnauthenticated || isInProgress) && (
              <Menu.Item name="Login" onClick={login} />
            )}
            {isAuthenticated && <Menu.Item name="Logout" onClick={logout} />}
            <Menu.Item name="Home" as={Link} to="/" />
            <Menu.Item name="About" onClick={() => openModal("test")} />
          </Menu.Menu>
        </Container>
      </Menu>

    </Segment>
  );
};

export default observer(NavBar);
