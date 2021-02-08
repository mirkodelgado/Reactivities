import React, {useContext} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

const getCurrentYear = () => {
  const currentYear = new Date();
  return currentYear.getFullYear();
}


const ModalExampleModal = () => {

  const rootStore = useContext(RootStoreContext);
  const {modal: {open, body}, closeModal} = rootStore.modalStore;

    return (
      <Modal open={open} onClose={closeModal} size='mini' >
        <Modal.Header>React Try</Modal.Header>
        <Modal.Content image>
          <Image size='small' src='/assets/ced3.png' wrapped />
          <Modal.Description>
            {/* <Header>Your App Name</Header> */}
            <h3><br/>Version 1.x.x</h3>  <h4>February 22, 2021</h4>            

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='blue' onClick={() => closeModal()}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    )}

export default observer(ModalExampleModal);
