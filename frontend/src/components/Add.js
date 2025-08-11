import React, { useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Add = () => {
    const [user, setUser] = useState({
        title: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img6:"",
        description: "",
    });

    const navigate =useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/destinations", user);
            alert(response.data.message || "Submitted successfully!");
           setUser({ title: "", img1: "", img2: "", img3: "", img4: "",img6:"", description: "" });

            navigate("/admin");
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed!");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4 rounded">
                        <h3 className="text-center mb-4">Add Destination</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={user.title}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL1</label>
                                <input
                                    type="text"
                                    name="img1"
                                    value={user.img1}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </div>
                             <div className="mb-3">
                                <label className="form-label">Image URL 2</label>
                                <input
                                    type="text"
                                    name="img2"
                                    value={user.img2}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL 3</label>
                                <input
                                    type="text"
                                    name="img3"
                                    value={user.img3}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL 4</label>
                                <input
                                    type="text"
                                    name="img4"
                                    value={user.img4}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </div>
                             <div className="mb-3">
                                <label className="form-label">Image URL 6</label>
                                <input
                                    type="text"
                                    name="img6"
                                    value={user.img6}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter image URL"
                                    required
                                />
                             </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={user.description}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
