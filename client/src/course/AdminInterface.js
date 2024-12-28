import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";  // Importation de Bootstrap Modal et Button

const AdminInterface = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);  // État pour gérer l'ouverture du modal
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (editingCourse) {
        // Update existing course
        await axios.put(`${apiUrl}/${editingCourse._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setEditingCourse(null); // Reset editing state
      } else {
        // Create new course
        await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      reset();
      fetchCourses();
      setShowModal(false);  // Fermer le modal après soumission
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  const deleteCourse = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (confirmed) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setValue("title", course.title);
    setValue("price", course.price);
    setShowModal(true);  // Ouvrir le modal pour modifier le cours
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>

      {/* Bouton pour ouvrir le modal d'ajout */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          className="btn rounded-5" style={{ backgroundColor: '#af2f64', color: 'white', padding: '15px 30px', fontWeight: 'bold', width: '220px' }}
          onClick={() => {
            setEditingCourse(null); // Réinitialiser l'état d'édition pour l'ajout d'un nouveau cours
            setShowModal(true);
          }}
        >
          Add Course
        </button>

        {/* <button className="btn rounded-5" style={{ backgroundColor: '#af2f64', color: 'white', padding: '15px 30px', fontWeight: 'bold', width: '220px' }}>
      REGISTER NOW
    </button> */}

      </div>

      {/* Modal Bootstrap */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCourse ? "Update Course" : "Add Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "400px",
              margin: "auto",
            }}
          >
            <div>
              <label style={{ fontWeight: "bold" }}>Title:</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: `1px solid ${errors.title ? 'red' : '#ddd'}`,
                }}
              />
              {errors.title && <span style={{ color: "red", fontSize: "12px" }}>{errors.title.message}</span>}
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Price:</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: `1px solid ${errors.price ? 'red' : '#ddd'}`,
                }}
              />
              {errors.price && <span style={{ color: "red", fontSize: "12px" }}>{errors.price.message}</span>}
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Image:</label>
              <input
                type="file"
                {...register("image")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              style={{
                backgroundColor: "#af2f64",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {editingCourse ? "Update Course" : "Add Course"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      
      <h2 style={{ textAlign: "center", margin: "30px 0", color: "#333" }}>Courses</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {courses.map((course) => (
          <div
            key={course._id}
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#af2f64" }}>{course.title}</h3>
            <p style={{ color: "#333", fontWeight: "bold" }}>Price: {course.price} DT/ Month</p>
            {course.image && (
              <img
                src={`http://localhost:5000${course.image}`}
                alt={course.title}
                style={{ width: "100%", height: "150px", objectFit: "cover", marginBottom: "10px" }}
              />
            )}
            <div style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",    
          gap: "10px",             
          marginTop: "10px",       
        }}>
              <button type="button" class="btn btn-outline-dark" data-toggle="tooltip" data-placement="bottom" title="Update the Course"
                onClick={() => editCourse(course)}
                size="md"
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                }}
              >
                <FaEdit/> 
              </button>
              <button type="button" class="btn btn-outline-danger" data-toggle="tooltip" data-placement="bottom" title="Delete the Course"
                onClick={() => deleteCourse(course._id)}
                  
                size="md"
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                }}
              >
                <FaTrash/> 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInterface;
