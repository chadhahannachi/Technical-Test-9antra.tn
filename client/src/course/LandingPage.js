import React, { useState, useEffect }  from 'react';
import logo from '../images/logo.png';
import home from '../images/home.png';
import axios from 'axios';

const LandingPage = () => {

    const [courses, setCourses] = useState([]);

  const apiUrl = "http://localhost:5000/course";

  const fetchCourses = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  const headerStyle = {
    backgroundImage: `url(${home})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    height: '530px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    color: 'white', 
    marginTop: '120px'
};

const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '30px',
    borderRadius: '0px',
    maxWidth: '700px',
    width: '100%',
  };

  const cardContactUs = {
    backgroundColor: 'rgba(249,180,84,255)',
    padding: '30px',
    borderRadius: '50px',
    maxWidth: '1000px',
    width: '100%',
  };

  return (
    <div className="landing-page" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      <img src={logo} alt="logo" style={{ position: 'absolute', top: '20px', left: '20px', width: '200px' }} />

      <header className="text-center py-5" style={headerStyle}>
      <div className="card" style={cardStyle}>

        <p style={{fontSize: '40px',color:'black', fontWeight: 'bold' }}>Improve your skills on your own</p>
        <p style={{fontSize: '40px',color:'black', fontWeight: 'bold' }}>To prepare for a better future</p>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <button className="btn rounded-5" style={{ backgroundColor: '#af2f64', color: 'white', padding: '15px 30px', fontWeight: 'bold', width: '220px' }}>
      REGISTER NOW
    </button>
  </div>
      </div>
      </header>

      <section className="text-center py-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingInline: '100px' }}>
  <p style={{ fontSize: '50px', color: 'black', fontWeight: 'bold', margin: 0 }}>Discover Our Courses</p>
  <button className="btn rounded-5" style={{ backgroundColor: '#af2f64', color: 'white', padding: '10px 30px', fontWeight: 'bold' }}>
    View More
  </button>
</section>


<section className="container py-1">
  <div className="row text-center">
    {courses.map((course, index) => (
      <div className="col-md-4 py-3" key={course._id}>
        <div className="card" style={{ border: 'none', boxShadow: 'none' }}>
          <div className="card-body">
            {course.image && (
              <img
                src={`http://localhost:5000${course.image}`}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  
                }}
              />
            )}
            <h5 className="card-title py-3" style={{ fontSize: '30px', color: 'black', fontWeight: 'bold' }}>
              {course.title}
            </h5>
            <p className="card-text" style={{ fontSize: '20px', color: '#af2f64', fontWeight: 'bold' }}>
              {course.price} DT/ Month
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      <footer 
  className="py-5" 
  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
> 
  <div className="card" style={cardContactUs}>
    <h2 
      className="text-center" 
      style={{
        fontSize: '30px',
        color: 'black',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}
    >
      Contact Us
    </h2>

    <form 
      className="d-flex flex-column align-items-center"
      style={{ gap: '20px' }}
    >
      
      <div 
        className="col-md-12" 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          maxWidth: '400px', 
          width: '100%'
        }}
      >
        <label 
          style={{ fontWeight: 'bold', marginBottom: '10px', alignSelf: 'flex-start' }}
        >
          NAME
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Jiara Martins"
          required
          style={{
            borderRadius: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            paddingInline: '20px',
            width: '100%'
          }}
        />
      </div>

      
      <div 
        className="col-md-12" 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          maxWidth: '400px', 
          width: '100%'
        }}
      >
        <label 
          style={{ fontWeight: 'bold', marginBottom: '10px', alignSelf: 'flex-start' }}
        >
          EMAIL
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="hello@reallygreatsite.com"
          required
          style={{
            borderRadius: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            paddingInline: '20px',
            width: '100%'
          }}
        />
      </div>

      
      <div 
        className="col-md-12" 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          maxWidth: '400px', 
          width: '100%'
        }}
      >
        <label 
          style={{ fontWeight: 'bold', marginBottom: '10px', alignSelf: 'flex-start' }}
        >
          MESSAGE
        </label>
        <textarea
          className="form-control"
          placeholder="Write your message here"
          rows="2"
          required
          style={{
            borderRadius: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px 20px',
            width: '100%'
          }}
        ></textarea>
      </div>

      
      <div 
        className="col-12 text-center"
        style={{ marginTop: '20px' }}
      >
        <button 
          type="submit" 
          className="btn" 
          style={{
            backgroundColor: '#af2f64', 
            color: 'white', 
            fontWeight: 'bold', 
            width: '220px'
          }}
        >
          Send the message
        </button>
      </div>
    </form>
  </div>
</footer>

    </div>
  );
};

export default LandingPage;
