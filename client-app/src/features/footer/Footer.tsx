import React from "react";
import { Container } from "semantic-ui-react";

const getCurrentYear = () => {
  const currentYear = new Date();
  return currentYear.getFullYear();
}

const Footer = () => {
  return (
    
    <div className="Footer">

      <Container style={{textAlign: 'center'}}>
  <p style={{color: 'white'}}>Designed & Developed by <a href="http://www.maserconsulting.com" style={{color: 'gold'}} >Colliers Engineering & Design</a> - Copyright &copy; 2020 - { getCurrentYear() }</p>
      </Container>



    </div>
  );
};

export default Footer;
