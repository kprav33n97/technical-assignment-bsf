import Banner from "./Components/Banner/Banner";
import Header from "./Components/Header/Header";
import SearchForm from "./Components/SearchForm/SearchForm";
import DataGrid from "./Components/DataGrid/DataGrid";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/rockets")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data.slice(0, 10));
        setPageCount(Math.ceil(response.data.length / 10));
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  const handleSearch = (filters) => {
    const { status, launch, type } = filters;
    let filtered = data;

    if (status) {
      filtered = filtered.filter((item) =>
        item.status.toLowerCase().includes(status.toLowerCase())
      );
    }
    if (launch) {
      filtered = filtered.filter(
        (item) => item.original_launch && item.original_launch.includes(launch)
      );
    }
    if (type) {
      filtered = filtered.filter(
        (item) =>
          item.type && item.type.toLowerCase().includes(type.toLowerCase())
      );
    }

    setFilteredData(filtered.slice(0, 10));
    setPageCount(Math.ceil(filtered.length / 10));
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    const offset = selected * 10;
    setFilteredData(data.slice(offset, offset + 10));
  };

  return (
    <>
      <Header />
      <Banner />
      <SearchForm onSearch={handleSearch} />
      <DataGrid
        data={filteredData}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </>
  );
}
