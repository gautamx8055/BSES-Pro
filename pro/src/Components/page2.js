// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Request = () => {
//   const navigate = useNavigate();

//   const handleNewConnection = () => {
//     navigate("/page3"); // adjust this route if "page3" is actually a different path
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.header}>
//         <h2>My Requests</h2>
//         <div style={styles.topBar}>
//           <span style={styles.pendingText}>
//             You have <strong>0</strong> pending connection requests. If you want to create a new request, click on
//           </span>
//           <button style={styles.newConnectionBtn} onClick={handleNewConnection}>
//             New Connection
//           </button>
//         </div>
//       </div>

//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Request No</th>
//               <th style={styles.th}>District</th>
//               <th style={styles.th}>Request Type</th>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Current Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td colSpan="5" style={styles.noRecords}>No Records !!</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f6f6f6",
//     minHeight: "100vh",
//     padding: "1rem",
//   },
//   header: {
//     backgroundColor: "#ffffff",
//     padding: "1rem",
//     borderBottom: "1px solid #ddd",
//   },
//   topBar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "1rem",
//   },
//   pendingText: {
//     color: "red",
//     fontWeight: "500",
//   },
//   newConnectionBtn: {
//     backgroundColor: "#0d6efd",
//     color: "#fff",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   tableContainer: {
//     backgroundColor: "#fff",
//     marginTop: "1rem",
//     padding: "1rem",
//     borderRadius: "4px",
//     boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     textAlign: "left",
//   },
//   th: {
//     padding: "0.75rem",
//     borderBottom: "1px solid #ddd",
//     backgroundColor: "#f9f9f9",
//     fontWeight: "bold",
//   },
//   noRecords: {
//     textAlign: "center",
//     padding: "1rem",
//     color: "#888",
//   },
// };

// export default Request;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Request = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Fetch data when component is mounted
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/personaldetail');
        setRequests(response.data); // Set the fetched data into the state
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []); // Empty dependency array to run only once when component mounts

  const handleNewConnection = () => {
    navigate("/page3"); // adjust this route if "page3" is actually a different path
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2>My Requests</h2>
        <div style={styles.topBar}>
          <span style={styles.pendingText}>
            You have <strong>{requests.length}</strong> pending connection requests. If you want to create a new request, click on
          </span>
          <button style={styles.newConnectionBtn} onClick={handleNewConnection}>
            New Connection
          </button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Request No</th>
              <th style={styles.th}>District</th>
              <th style={styles.th}>Request Type</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noRecords}>No Records !!</td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td style={styles.td}>{req.requestId}</td>
                  <td style={styles.td}>{req.district}</td>
                  <td style={styles.td}>{req.connection}</td>
                  <td style={styles.td}>{`${req.firstName}`}</td>
                  <td style={styles.td}>Pending</td> {/* Replace with actual status if added later */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f6f6f6",
    minHeight: "100vh",
    padding: "1rem",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
  },
  pendingText: {
    color: "red",
    fontWeight: "500",
  },
  newConnectionBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableContainer: {
    backgroundColor: "#fff",
    marginTop: "1rem",
    padding: "1rem",
    borderRadius: "4px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#FF9797",
    fontWeight: "bold",
    borderRadius: "5px",

  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
  },
  noRecords: {
    textAlign: "center",
    padding: "1rem",
    color: "#888",
  },
};

export default Request;
