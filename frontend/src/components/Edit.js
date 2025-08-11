import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img6: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/destinations/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error("Fetch error:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await fetch(`http://localhost:4000/destinations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      navigate("/admin");
    }
    setFormData({
      title: '',
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img6: '',
      description: ''
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 rounded">
            <h3 className="text-center mb-4">Edit Destination</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL 1</label>
                <input
                  type="text"
                  name="img1"
                  value={formData.img1}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL 2</label>
                <input
                  type="text"
                  name="img2"
                  value={formData.img2}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL 3</label>
                <input
                  type="text"
                  name="img3"
                  value={formData.img3}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL 4</label>
                <input
                  type="text"
                  name="img4"
                  value={formData.img4}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL 6</label>
                <input
                  type="text"
                  name="img6"
                  value={formData.img6}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
