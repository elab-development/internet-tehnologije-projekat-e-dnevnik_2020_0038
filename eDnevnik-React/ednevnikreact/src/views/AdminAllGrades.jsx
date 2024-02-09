import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { getAllGrades } from "../service/services.tsx";
import { useStateContext } from "../contexts/ContextProvider";
import GradeComponent from "./GradeComponent.jsx";
import BackButton from "../components/BackButton.jsx";

export default function AllGrades() {
  const { user, userType, token, setUser, setToken, setUserType } =
    useStateContext();
  const [ocene, setOcene] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOcene(currentPage);
  }, [currentPage]);


  const fetchOcene = async (pageNumber) => {
    try {
      debugger;
      pageNumber = pageNumber-1;
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

  const handlePageClick = (selectedPage) => {
    debugger;
    const curr = selectedPage.selected;
    setCurrentPage(curr);
    //fetchOcene(selectedPage);
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
              id={grade.id}
              GradeType={grade.gradeType.id}
              SubjectName={grade.subject.subject_name}
              Date={grade.date}
              Grade={grade.grade}
            />
          ))}
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={currentPage === 1 ? "disabled" : ""}
          nextClassName={currentPage === pageCount ? "disabled" : ""}
        />
      </div>
      <BackButton Path={"/admin/otherPage"} />
    </div>
  );
}
