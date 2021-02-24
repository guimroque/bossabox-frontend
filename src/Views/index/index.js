import React from 'react';
import './index.css'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Tools from '../../Components/Tool/Tool'
import Container from '@material-ui/core/Container';
function View() {
  return (
    <div>
      <Container maxWidth='sm'>
        <MenuBar/>
      </Container>
    </div>
  
  );
}

export default View;