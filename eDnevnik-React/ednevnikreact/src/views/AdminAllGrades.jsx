import React, { useState, useEffect } from "react";
import { getAllGrades } from "../service/services.tsx";
import { useStateContext } from "../contexts/ContextProvider";
import GradeComponent from "./GradeComponent.jsx";
import BackButton from "../components/BackButton.jsx";

export default function AllGrades() {
  const { user, userType, token, setUser, setToken, setUserType } =
    useStateContext();
  const [ocene, setOcene] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10; // Broj stavki po stranici

  useEffect(() => {
    fetchOcene(currentPage);
  }, [currentPage]);

  const fetchOcene = async (pageNumber) => {
    try {
      debugger;
      pageNumber = pageNumber - 1;
      setLoading(true);
      const response = await getAllGrades(pageNumber, token);
      setOcene(response.ocene);
      setPageCount(response.total_pages);
      setCurrentPage(response.pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error("Greška pri dohvatanju ocena:", error);
      setLoading(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pagination = [];
    let start = Math.max(1, Math.min(currentPage - 1, pageCount - 2)); // Početak paginacije
    let end = Math.min(start + 2, pageCount); // Kraj paginacije

    // Dodajeme strelicu za nazad ako nije prva stranica
    if (currentPage > 1) {
      pagination.push(
        <li
          key="prev"
          onClick={() => handlePageClick(currentPage - 1)}
          className="pagination li"
        >
          <button>{"<"}</button>
        </li>
      );
    }

    for (let i = start; i <= end; i++) {
      pagination.push(
        <li
          key={i}
          className={currentPage === i ? "active pagination li" : "pagination li"}
          onClick={() => handlePageClick(i)}
        >
          <button>{i}</button>
        </li>
      );
    }

    // Dodajeme strelicu za napred ako nije posljednja stranica
    if (currentPage < pageCount) {
      pagination.push(
        <li
          key="next"
          onClick={() => handlePageClick(currentPage + 1)}
          className="pagination li"
        >
          <button>{">"}</button>
        </li>
      );
    }

    return pagination;
  };




  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="adminInsert">
        <p>Ocene</p>
        <div className="grades" style={{ height: "415px" }}>
          {ocene.map((grade) => (
            <GradeComponent
              key={grade.id}
              id={grade.id}
              GradeType={grade.gradeType.id}
              SubjectName={grade.subject.subject_name}
              Date={grade.date}
              Grade={grade.grade}
            />
          ))}
        </div>
        <ul className="pagination">{renderPagination()}</ul>
      </div>
      <BackButton Path={"/admin/otherPage"} />
    </div>
  );
}
