"use client";

import React from "react";
import { useState } from "react";
import Usertable from "./components/Usertable";
import FilterButton from "./components/FilterButton";

export default function Home() {
  const [filteredUsers, setFilteredUsers] = useState([]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ textDecoration: "underline" }}>User Table</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <FilterButton filterType="income-car" setFilteredUsers={setFilteredUsers} />
        <FilterButton filterType="male-phone" setFilteredUsers={setFilteredUsers} />
        <FilterButton filterType="last-name-quote-email" setFilteredUsers={setFilteredUsers} />
        <FilterButton filterType="car-email" setFilteredUsers={setFilteredUsers} />
        <FilterButton filterType="top-cities" setFilteredUsers={setFilteredUsers} />
      </div>

      <Usertable users={filteredUsers.length > 0 ? filteredUsers : []} />
    </>
  );
}
