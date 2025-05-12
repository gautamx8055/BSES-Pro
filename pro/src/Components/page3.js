// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Modal.setAppElement('#root');

// const PersonalDetailsForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     gender: '',
//     connection: '',
//     email: '',
//     phone: '',
//     houseNumber: '',
//     streetName: '',
//     district: '',
//     landmark: '',
//     state: '',
//     pincode: '',
//     photo: null,
//     signature: null,
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isReviewed, setIsReviewed] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? files[0] : value,
//     });
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'firstName', 'lastName', 'dob', 'gender', 'connection', 'email', 'phone',
//       'houseNumber', 'streetName', 'district', 'landmark', 'state', 'pincode',
//       'photo', 'signature'
//     ];

//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required`);
//         return false;
//       }
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error('Invalid email format');
//       return false;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       toast.error('Phone number must be 10 digits');
//       return false;
//     }

//     if (!/^\d{6}$/.test(formData.pincode)) {
//       toast.error('Pincode must be a 6-digit number');
//       return false;
//     }

//     return true;
//   };

//   const handleReview = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setModalOpen(true);
//       setIsReviewed(true);
//     }
//   };

//   const handleFinalSubmit = async (e) => {
//     e.preventDefault();
//     if (!isReviewed) {
//       toast.warn('Please review the application before submitting.');
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Personal Details Form', 20, 20);

//     autoTable(doc, {
//       startY: 30,
//       body: [
//         ['First Name', formData.firstName],
//         ['Last Name', formData.lastName],
//         ['Date of Birth', formData.dob],
//         ['Gender', formData.gender],
//         ['Connection Type', formData.connection],
//         ['Email', formData.email],
//         ['Phone', formData.phone],
//         ['House Number', formData.houseNumber],
//         ['Street Name', formData.streetName],
//         ['District', formData.district],
//         ['Landmark', formData.landmark],
//         ['State', formData.state],
//         ['Pincode', formData.pincode],
//       ],
//       theme: 'grid',
//       styles: { fontSize: 12, cellPadding: 3 },
//     });

//     const loadImage = (file) => {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onload = (e) => resolve(e.target.result);
//         reader.readAsDataURL(file);
//       });
//     };

//     let currentY = doc.lastAutoTable.finalY + 10;

//     if (formData.photo) {
//       const imgData = await loadImage(formData.photo);
//       doc.text('Uploaded Photo:', 20, currentY);
//       doc.addImage(imgData, 'JPEG', 60, currentY - 5, 40, 40);
//       currentY += 50;
//     }

//     if (formData.signature) {
//       const sigData = await loadImage(formData.signature);
//       doc.text('Signature:', 20, currentY);
//       doc.addImage(sigData, 'JPEG', 60, currentY - 5, 40, 20);
//       currentY += 30;
//     }

//     doc.save('PersonalDetails.pdf');
//     toast.success('Form submitted and saved as PDF!');
//   };

//   const previewImage = (file) => file ? URL.createObjectURL(file) : '';

//   return (
//     <div style={styles.fullScreen}>
//       <ToastContainer />
//       <div style={styles.container}>
//         <h2>Personal Details Form</h2>
//         <form encType="multipart/form-data">
//           <div style={styles.group}><label>First Name:</label><input style={styles.input} type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Last Name:</label><input style={styles.input} type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Date of Birth:</label><input style={styles.input} type="date" name="dob" value={formData.dob} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Gender:</label><select style={styles.input} name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
//           <div style={styles.group}><label>Connection Type:</label><select style={styles.input} name="connection" value={formData.connection} onChange={handleChange}><option value="">Select</option><option value="Individual">Individual</option><option value="Commercial">Commercial</option><option value="ThreePhaseConnection">Three Phase Connection</option></select></div>
//           <div style={styles.group}><label>Email ID:</label><input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Phone Number:</label><input style={styles.input} type="tel" name="phone" value={formData.phone} onChange={handleChange} /></div>
//           <div style={styles.group}><label>House Number:</label><input style={styles.input} type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Street Name:</label><input style={styles.input} type="text" name="streetName" value={formData.streetName} onChange={handleChange} /></div>
//           <div style={styles.group}><label>District:</label><select style={styles.input} name="district" value={formData.district} onChange={handleChange}><option value="">Select</option><option value="Central">Central</option><option value="East">East</option><option value="New Delhi">New Delhi</option><option value="North">North</option><option value="North East">North East</option><option value="North West">North West</option><option value="Shahdara">Shahdara</option><option value="South">South</option><option value="South East">South East</option><option value="South West">South West</option></select></div>
//           <div style={styles.group}><label>Landmark:</label><input style={styles.input} type="text" name="landmark" value={formData.landmark} onChange={handleChange} /></div>
//           <div style={styles.group}><label>State:</label><input style={styles.input} type="text" name="state" value={formData.state} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Pincode:</label><input style={styles.input} type="number" name="pincode" value={formData.pincode} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Upload Picture:</label><input style={styles.input} type="file" name="photo" accept="image/*" onChange={handleChange} /></div>
//           <div style={styles.group}><label>Upload Signature:</label><input style={styles.input} type="file" name="signature" accept="image/*" onChange={handleChange} /></div>
//           <div style={{ ...styles.group, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//             <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
//             <label htmlFor="terms">I accept the terms and confirm my details are correct.</label>
//           </div>
//           <div style={styles.buttonRow}>
//             <button onClick={handleReview} style={styles.button}>Review Application</button>
//             <button onClick={handleFinalSubmit} type="submit" disabled={!acceptedTerms} style={{ ...styles.button, backgroundColor: acceptedTerms ? '#1f8ef1' : '#ccc', cursor: acceptedTerms ? 'pointer' : 'not-allowed' }}>Submit</button>
//           </div>
//         </form>
//       </div>

//       <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Review Details" style={{ content: { maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '10px' } }}>
//         <h2>Review Your Details</h2>
//         <ul>
//           {Object.entries(formData).map(([key, value]) => (
//             key === 'photo' || key === 'signature' ? null : (
//               <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>
//             )
//           ))}
//           <li><strong>Photo:</strong> {formData.photo && <img src={previewImage(formData.photo)} alt="Uploaded" style={{ width: 100 }} />}</li>
//           <li><strong>Signature:</strong> {formData.signature && <img src={previewImage(formData.signature)} alt="Signature" style={{ width: 100 }} />}</li>
//         </ul>
//         <button onClick={() => setModalOpen(false)} style={{ ...styles.button, marginTop: '10px' }}>Close Review</button>
//       </Modal>
//     </div>
//   );
// };

// const styles = {
//   fullScreen: {
//     minHeight: '100vh',
//     backgroundColor: '#f2f2f2',
//     padding: '30px',
//   },
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#fff',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px #ccc',
//     width: '100%',
//     maxWidth: '1200px',
//     margin: 'auto',
//   },
//   group: {
//     marginBottom: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     marginTop: '5px',
//   },
//   buttonRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '10px',
//   },
//   button: {
//     backgroundColor: '#f23f1f',
//     color: 'white',
//     padding: '12px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     flex: 1,
//     fontSize: '16px',
//   },
// };

// export default PersonalDetailsForm;

// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// Modal.setAppElement('#root');

// const PersonalDetailsForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     gender: '',
//     connection: '',
//     email: '',
//     phone: '',
//     houseNumber: '',
//     streetName: '',
//     district: '',
//     landmark: '',
//     state: '',
//     pincode: '',
//     photo: null,
//     signature: null,
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isReviewed, setIsReviewed] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? files[0] : value,
//     });
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'firstName', 'lastName', 'dob', 'gender', 'connection', 'email', 'phone',
//       'houseNumber', 'streetName', 'district', 'landmark', 'state', 'pincode',
//       'photo', 'signature'
//     ];

//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required`);
//         return false;
//       }
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error('Invalid email format');
//       return false;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       toast.error('Phone number must be 10 digits');
//       return false;
//     }

//     if (!/^\d{6}$/.test(formData.pincode)) {
//       toast.error('Pincode must be a 6-digit number');
//       return false;
//     }

//     return true;
//   };

//   const handleReview = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setModalOpen(true);
//       setIsReviewed(true);
//     }
//   };

//   const handleFinalSubmit = async (e) => {
//     e.preventDefault();
//     if (!isReviewed) {
//       toast.warn('Please review the application before submitting.');
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     // Append form fields to formData
//     for (let key in formData) {
//       formDataToSubmit.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/submit', formDataToSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Form submitted successfully!');
//       console.log(response.data);
//     } catch (error) {
//       toast.error('Error submitting form');
//       console.error(error);
//     }
//   };

//   const previewImage = (file) => file ? URL.createObjectURL(file) : '';

//   return (
//     <div style={styles.fullScreen}>
//       <ToastContainer />
//       <div style={styles.container}>
//         <h2>Personal Details Form</h2>
//         <form encType="multipart/form-data">
//           <div style={styles.group}><label>First Name:</label><input style={styles.input} type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Last Name:</label><input style={styles.input} type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Date of Birth:</label><input style={styles.input} type="date" name="dob" value={formData.dob} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Gender:</label><select style={styles.input} name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
//           <div style={styles.group}><label>Connection Type:</label><select style={styles.input} name="connection" value={formData.connection} onChange={handleChange}><option value="">Select</option><option value="Individual">Individual</option><option value="Commercial">Commercial</option><option value="ThreePhaseConnection">Three Phase Connection</option></select></div>
//           <div style={styles.group}><label>Email ID:</label><input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Phone Number:</label><input style={styles.input} type="tel" name="phone" value={formData.phone} onChange={handleChange} /></div>
//           <div style={styles.group}><label>House Number:</label><input style={styles.input} type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Street Name:</label><input style={styles.input} type="text" name="streetName" value={formData.streetName} onChange={handleChange} /></div>
//           <div style={styles.group}><label>District:</label><select style={styles.input} name="district" value={formData.district} onChange={handleChange}><option value="">Select</option><option value="Central">Central</option><option value="East">East</option><option value="New Delhi">New Delhi</option><option value="North">North</option><option value="North East">North East</option><option value="North West">North West</option><option value="Shahdara">Shahdara</option><option value="South">South</option><option value="South East">South East</option><option value="South West">South West</option></select></div>
//           <div style={styles.group}><label>Landmark:</label><input style={styles.input} type="text" name="landmark" value={formData.landmark} onChange={handleChange} /></div>
//           <div style={styles.group}><label>State:</label><input style={styles.input} type="text" name="state" value={formData.state} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Pincode:</label><input style={styles.input} type="number" name="pincode" value={formData.pincode} onChange={handleChange} /></div>
//           <div style={styles.group}><label>Upload Picture:</label><input style={styles.input} type="file" name="photo" accept="image/*" onChange={handleChange} /></div>
//           <div style={styles.group}><label>Upload Signature:</label><input style={styles.input} type="file" name="signature" accept="image/*" onChange={handleChange} /></div>
//           <div style={{ ...styles.group, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//             <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
//             <label htmlFor="terms">I accept the terms and confirm my details are correct.</label>
//           </div>
//           <div style={styles.buttonRow}>
//             <button onClick={handleReview} style={styles.button}>Review Application</button>
//             <button onClick={handleFinalSubmit} type="submit" disabled={!acceptedTerms} style={{ ...styles.button, backgroundColor: acceptedTerms ? '#1f8ef1' : '#ccc', cursor: acceptedTerms ? 'pointer' : 'not-allowed' }}>Submit</button>
//           </div>
//         </form>
//       </div>

//       <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Review Details" style={{ content: { maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '10px' } }}>
//         <h2>Review Your Details</h2>
//         <ul>
//           {Object.entries(formData).map(([key, value]) => (
//             key === 'photo' || key === 'signature' ? null : (
//               <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>
//             )
//           ))}
//           <li><strong>Photo:</strong> {formData.photo && <img src={previewImage(formData.photo)} alt="Uploaded" style={{ width: 100 }} />}</li>
//           <li><strong>Signature:</strong> {formData.signature && <img src={previewImage(formData.signature)} alt="Signature" style={{ width: 100 }} />}</li>
//         </ul>
//         <button onClick={() => setModalOpen(false)} style={{ ...styles.button, marginTop: '10px' }}>Close Review</button>
//       </Modal>
//     </div>
//   );
// };

// const styles = {
//   fullScreen: {
//     minHeight: '100vh',
//     backgroundColor: '#f2f2f2',
//     padding: '30px',
//   },
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#fff',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px #ccc',
//     width: '100%',
//     maxWidth: '1200px',
//     margin: 'auto',
//   },
//   group: {
//     marginBottom: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     marginTop: '5px',
//   },
//   buttonRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '10px',
//   },
//   button: {
//     backgroundColor: '#f23f1f',
//     color: 'white',
//     padding: '12px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     flex: 1,
//     fontSize: '16px',
//   },
// };

// export default PersonalDetailsForm;

import React, { useState } from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const PersonalDetailsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    connection: '',
    email: '',
    phone: '',
    houseNumber: '',
    streetName: '',
    district: '',
    landmark: '',
    state: '',
    pincode: '',
    photo: null,
    signature: null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'dob', 'gender', 'connection', 'email', 'phone',
      'houseNumber', 'streetName', 'district', 'landmark', 'state', 'pincode',
      'photo', 'signature'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Pincode must be a 6-digit number');
      return false;
    }

    return true;
  };

  const previewImage = (file) => file ? URL.createObjectURL(file) : '';

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Personal Details Form', 14, 20);

    const data = Object.entries(formData)
      .filter(([key]) => key !== 'photo' && key !== 'signature')
      .map(([key, value]) => [key.replace(/([A-Z])/g, ' $1'), value]);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: data,
    });

    const loadImageAndGenerate = (file, label) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          doc.addPage();
          doc.setFontSize(14);
          doc.text(label, 14, 20);
          doc.addImage(reader.result, 'JPEG', 14, 30, 100, 60);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    };

    const imagePromises = [];

    if (formData.photo) {
      imagePromises.push(loadImageAndGenerate(formData.photo, 'Uploaded Photo'));
    }

    if (formData.signature) {
      imagePromises.push(loadImageAndGenerate(formData.signature, 'Signature'));
    }

    Promise.all(imagePromises).then(() => {
      doc.save(`${formData.firstName || 'form'}_application.pdf`);
    });
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setModalOpen(true);
      setIsReviewed(true);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!isReviewed) {
      toast.warn('Please review the application before submitting.');
      return;
    }

    if (!validateForm()) return;

    const formDataToSubmit = new FormData();
    for (let key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/submit', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Form submitted successfully!');
      generatePDF();
    } catch (error) {
      toast.error('Error submitting form');
      console.error(error);
    }
  };

  return (
    <div style={styles.fullScreen}>
      <ToastContainer />
      <div style={styles.container}>
        <h2>Personal Details Form</h2>
        <form encType="multipart/form-data">
          <div style={styles.group}><label>First Name:</label><input style={styles.input} type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></div>
          <div style={styles.group}><label>Last Name:</label><input style={styles.input} type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
          <div style={styles.group}><label>Date of Birth:</label><input style={styles.input} type="date" name="dob" value={formData.dob} onChange={handleChange} /></div>
          <div style={styles.group}><label>Gender:</label><select style={styles.input} name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
          <div style={styles.group}><label>Connection Type:</label><select style={styles.input} name="connection" value={formData.connection} onChange={handleChange}><option value="">Select</option><option value="Individual">Individual</option><option value="Commercial">Commercial</option><option value="ThreePhaseConnection">Three Phase Connection</option></select></div>
          <div style={styles.group}><label>Email ID:</label><input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} /></div>
          <div style={styles.group}><label>Phone Number:</label><input style={styles.input} type="tel" name="phone" value={formData.phone} onChange={handleChange} /></div>
          <div style={styles.group}><label>House Number:</label><input style={styles.input} type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} /></div>
          <div style={styles.group}><label>Street Name:</label><input style={styles.input} type="text" name="streetName" value={formData.streetName} onChange={handleChange} /></div>
          <div style={styles.group}><label>District:</label><select style={styles.input} name="district" value={formData.district} onChange={handleChange}><option value="">Select</option><option value="Central">Central</option><option value="East">East</option><option value="New Delhi">New Delhi</option><option value="North">North</option><option value="North East">North East</option><option value="North West">North West</option><option value="Shahdara">Shahdara</option><option value="South">South</option><option value="South East">South East</option><option value="South West">South West</option></select></div>
          <div style={styles.group}><label>Landmark:</label><input style={styles.input} type="text" name="landmark" value={formData.landmark} onChange={handleChange} /></div>
          <div style={styles.group}><label>State:</label><input style={styles.input} type="text" name="state" value={formData.state} onChange={handleChange} /></div>
          <div style={styles.group}><label>Pincode:</label><input style={styles.input} type="number" name="pincode" value={formData.pincode} onChange={handleChange} /></div>
          <div style={styles.group}><label>Upload Picture:</label><input style={styles.input} type="file" name="photo" accept="image/*" onChange={handleChange} /></div>
          <div style={styles.group}><label>Upload Signature:</label><input style={styles.input} type="file" name="signature" accept="image/*" onChange={handleChange} /></div>
          <div style={{ ...styles.group, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
            <label htmlFor="terms">I accept the terms and confirm my details are correct.</label>
          </div>
          <div style={styles.buttonRow}>
            <button onClick={handleReview} style={styles.button}>Review Application</button>
            <button onClick={handleFinalSubmit} type="submit" disabled={!acceptedTerms} style={{ ...styles.button, backgroundColor: acceptedTerms ? '#1f8ef1' : '#ccc', cursor: acceptedTerms ? 'pointer' : 'not-allowed' }}>Submit</button>
          </div>
        </form>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Review Details" style={{ content: { maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '10px' } }}>
        <h2>Review Your Details</h2>
        <ul>
          {Object.entries(formData).map(([key, value]) =>
            key === 'photo' || key === 'signature' ? null : (
              <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>
            )
          )}
          <li><strong>Photo:</strong> {formData.photo && <img src={previewImage(formData.photo)} alt="Uploaded" style={{ width: 100 }} />}</li>
          <li><strong>Signature:</strong> {formData.signature && <img src={previewImage(formData.signature)} alt="Signature" style={{ width: 100 }} />}</li>
        </ul>
        <button onClick={() => setModalOpen(false)} style={{ ...styles.button, marginTop: '10px' }}>Close Review</button>
      </Modal>
    </div>
  );
};

const styles = {
  fullScreen: {
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
    padding: '30px',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 10px #ccc',
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
  },
  group: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  button: {
    backgroundColor: '#f23f1f',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '16px',
  },
};

export default PersonalDetailsForm;
