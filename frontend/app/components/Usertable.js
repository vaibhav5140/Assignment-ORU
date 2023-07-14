"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Usertable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersPerPage = 10; // Number of users to display per page

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = currentPage * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const tableStyle = {
    marginTop: "20px",
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#073980",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
    color: "white",
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const buttonStyle = {
    marginLeft: "5px",
    marginRight: "5px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#073980",
    color: "white",
    cursor: "pointer",
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Income</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>Car</th>
            <th style={thStyle}>Quote</th>
            <th style={thStyle}>Phone Price</th>
            <th style={thStyle}>Average Income</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td style={tdStyle}>{user.first_name}</td>
              <td style={tdStyle}>{user.last_name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.gender}</td>
              <td style={tdStyle}>{user.income}</td>
              <td style={tdStyle}>{user.city}</td>
              <td style={tdStyle}>{user.car}</td>
              <td style={tdStyle}>{user.quote}</td>
              <td style={tdStyle}>{user.phone_price}</td>
              <td style={tdStyle}>{user.averageIncome}</td>
              {/* Display average income */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={paginationStyle}>
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
          style={buttonStyle}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
          style={buttonStyle}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Usertable;
