import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/landingpage');
  };

  const navigateToAdminInterface = () => {
    navigate('/admininterface');
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="text-center">
        <Col>
          <Button 
            variant="light" 
            size="lg" 
            className="mb-3" 
            onClick={navigateToLanding}
            style={{ width: '200px', fontSize: '18px', borderColor: 'black', color: 'black' }}
          >
            Landing Page
          </Button>
        </Col>
        <Col>
          <Button 
            variant="light" 
            size="lg" 
            className="mb-3" 
            onClick={navigateToAdminInterface}
            style={{ width: '200px', fontSize: '18px', borderColor: 'black', color: 'black' }}
          >
            Admin Interface
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
