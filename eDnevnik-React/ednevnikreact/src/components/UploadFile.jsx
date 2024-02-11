import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import BackButton from "./BackButton";
import { Chart } from "react-google-charts";
import { getGradesFoStudentForType } from "../service/services.tsx";

const UploadForm = () => {
  const { user, token } = useStateContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [quote, setQuote] = useState("");


  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchQuote = async () => {
    try {
      debugger;
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=education",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "emBkfLL9D3vWcGu13rtpEw==ebGifglRsPsfGsvV",
          },
        }
      );
      setQuote(response.data[0].quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      setLoading(true);
      await axios.post("/api/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      console.log("PDF file successfully sent.");
    } catch (error) {
      console.error("Error sending PDF file:", error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      debugger;
      setLoading(true);
      const response = await getGradesFoStudentForType(user.id, 2, token);
      setData(response.spisak_ocena);
      gradeCount(response.spisak_ocena);
      fetchQuote();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const gradeCount = (grades) => {
    const counts = [0,0,0,0,0];
    grades.forEach(element => {
      counts[element.grade - 1]++;
    });

    const chartData = [["Ocena", "Broj"]];
    counts.forEach((count, index) => {
      if(index)
      chartData.push([`Ocena ${index + 1}`, count]);
    });
    setChartData(chartData);
  }

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="nesto">
        <div
          className="doc"
          style={{ marginTop: "100px", marginBottom: "120px" }}
        >
          <p>Priložite diplomu u PDF formatu</p>
          <form onSubmit={handleSubmit} className="logInArg">
            <input
              type="file"
              onChange={handleChange}
              accept=".pdf"
              style={{}}
            />
            <button type="submit" style={{ marginTop: "20px" }}>
              Pošalji PDF
            </button>
          </form>
        </div>
        <div>
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={loading}
            data={chartData}
            options={{
              title: "Ocene studenta",
            }}
          />
        </div>
      </div>
      <div className="school">
        <BackButton Path={"/"} />
        <p style={{ marginLeft: "10px" }}>{quote}</p>
      </div>
    </div>
  );
};

export default UploadForm;
