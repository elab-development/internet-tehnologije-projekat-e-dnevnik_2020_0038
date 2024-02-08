import React, { useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import BackButton from "./BackButton";

const UploadForm = () => {
    const { user, userType, token, storedHelper, setUser } = useStateContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    debugger;
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    debugger;
    const formData = new FormData();
    formData.append("pdf", file);
    console.log("FormData:", formData);

    try {
        setLoading(true);
      await axios.post(
        "/api/upload-pdf",
        formData ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log("PDF fajl je uspešno poslat.");
    } catch (error) {
      console.error("Greška prilikom slanja PDF fajla:", error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  

  return (
    <div>
      <div className="nesto">
        <div className="doc" style={{ marginTop: "100px", marginBottom: "120px" }}>
          <p>Prilozite diplomu u pdf formatu</p>
          <form onSubmit={handleSubmit} className="logInArg">
            <input type="file" onChange={handleChange} accept=".pdf" style={{}}/>
            <button type="submit" style={{marginTop: "20px"}}>Pošalji PDF</button>
          </form>
        </div>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
};

export default UploadForm;
