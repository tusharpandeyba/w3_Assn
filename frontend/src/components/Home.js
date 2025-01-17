import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('handle', socialMediaHandle);
    formData.append('imageFile', image);

    try {
      const response = await fetch('http://localhost:5000/api/v1/upload/imageUpload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      alert('Image uploaded successfully!');
      console.log(data);
    } catch (error) {
      alert('Error uploading image');
      console.error(error);
    }
  };

  const handleAdminRedirect = () => {
    navigate('/admin');
  };

  return (
    <div className="form-container">
      <button onClick={handleAdminRedirect} className="admin-btn">
        Admin
      </button>
      <h1>Submit Your Details</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="socialMediaHandle">Social Media Handle:</label>
          <input
            type="text"
            id="socialMediaHandle"
            name="socialMediaHandle"
            value={socialMediaHandle}
            onChange={(e) => setSocialMediaHandle(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="imageFile"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="file-input"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Home;
