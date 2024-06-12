import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

import "./Reporting&Analysis.css";

import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import TrainOwners from './ReportingAnalysisTrain'

interface ReportData {
  vehicleOwner: string;
  totalPassengers: number;
  totalIncome: number;
  averageRate: number;
  predictedIncome?: number; // Add this if predictedIncome is part of your data
}

  const ReportTable: React.FC = () => {
  const [reportType, setReportType] = useState<string>('daily');
  const [busOwners, setBusOwners] = useState<string[]>([]);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('Bus');

//   const [loading, setLoading] = useState<boolean>(false);


  const contentRef = useRef<HTMLDivElement>(null); // Ref for the content to be downloaded
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);


  // Fetch all bus owners when component mounts
  useEffect(() => {
    axios.get('http://localhost:5050/api/AdminReport/busowners')
      .then(response => {
        console.log('Bus Owners:', response.data);
        const ownerIds = response.data.$values;
        setBusOwners(ownerIds);
      })
      .catch(error => {
        console.error('There was an error fetching the bus owners!', error);
      });
  }, []);

  // Fetch report data whenever reportType or busOwners changes
  useEffect(() => {
    if (vehicleType === 'Bus') {
      const fetchReportData = async () => {
        let allData: ReportData[] = [];
        for (const ownerId of busOwners) {
          let data: ReportData | undefined;
          if (reportType === 'daily') {
            data = await fetchDailyStatistics(ownerId);
          } else if (reportType === 'monthly') {
            data = await fetchMonthlyStatistics(ownerId);
          } else if (reportType === '3months') {
            data = await fetchThreeMonthsStatistics(ownerId);
          } else if (reportType === 'yearly') {
            data = await fetchYearlyStatistics(ownerId);
          }
          if (data) {
            allData.push(data);
          }
        }
        console.log('Fetched Report Data:', allData);
        setReportData(allData);
        setLoading(false);
      };

      if (busOwners.length > 0) {
        fetchReportData();
      }
    }
  }, [reportType, busOwners, vehicleType]);

  // Functions to fetch statistics for each date filter
  const fetchDailyStatistics = async (userId: string): Promise<ReportData> => {
    const response = await axios.get(`http://localhost:5050/api/AdminReport/daily/${userId}`);
    return mapResponseToReportData(response.data);
  };

  const fetchMonthlyStatistics = async (userId: string): Promise<ReportData> => {
    const response = await axios.get(`http://localhost:5050/api/AdminReport/monthly/${userId}`);
    return mapResponseToReportData(response.data);
  };

  const fetchThreeMonthsStatistics = async (userId: string): Promise<ReportData> => {
    const response = await axios.get(`http://localhost:5050/api/AdminReport/3months/${userId}`);
    return mapResponseToReportData(response.data);
  };

  const fetchYearlyStatistics = async (userId: string): Promise<ReportData> => {
    const response = await axios.get(`http://localhost:5050/api/AdminReport/yearly/${userId}`);
    return mapResponseToReportData(response.data);
  };

  const mapResponseToReportData = (data: any): ReportData => {
    return {
      vehicleOwner: data.vehicleOwner,
      totalPassengers: data.totalPassengers,
      totalIncome: data.totalIncome,
      averageRate: data.averageRate,
      predictedIncome: data.predictedIncome, // Ensure this matches your data structure
    };
  };

  function handleDateFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setReportType(event.target.value);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleVehicleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setVehicleType(event.target.value);
  }

  const filteredReportData = reportData.filter(data =>
    data.vehicleOwner.includes(searchTerm)
  );

  const barChartData = {
    labels: filteredReportData.map(data => data.vehicleOwner),
    datasets: [
      {
        label: 'Average Rate',
        data: filteredReportData.map(data => data.averageRate),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: filteredReportData.map(data => data.vehicleOwner),
    datasets: [
      {
        label: 'Total Income',
        data: filteredReportData.map(data => data.totalIncome),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };
   //the pdf download function
   async function downloadPDF() {
    const doc = new jsPDF();

    // Capture bar chart as image
    const barChartElement = barChartRef.current;
    const barChartCanvas = barChartElement?.querySelector("canvas");
    let barChartImage = "";

    if (barChartCanvas instanceof HTMLCanvasElement) {
      barChartImage = await html2canvas(barChartCanvas).then((canvas) =>
        canvas.toDataURL("image/png")
      );
    }

    // Capture line chart as image
    const lineChartElement = lineChartRef.current;
    const lineChartCanvas = lineChartElement?.querySelector("canvas");
    let lineChartImage = "";

    if (lineChartCanvas instanceof HTMLCanvasElement) {
      lineChartImage = await html2canvas(lineChartCanvas).then((canvas) =>
        canvas.toDataURL("image/png")
      );
    }

    // Add the table to the PDF first
    doc.autoTable({
      head: [
        [
          "Vehicle Owner",
          "Total Passengers",
          "Total Income",
          "Average Rate",
          "predictedIncome",
        ],
      ],
      body: filteredReportData.map((data) => [
        data.vehicleOwner,
        data.totalPassengers,
        data.totalIncome,
        data.averageRate,
        data.predictedIncome,
       
      ]),
      startY: 10, // Start from a bit below the top
    });

    // Get the current height of the document
    const tableHeight = doc.autoTable.previous.finalY;

    // Determine if there's enough space for both charts on the same page
    const chartHeight = 80; // Height of each chart
    const remainingSpace = doc.internal.pageSize.getHeight() - tableHeight;

    // Add the charts to the PDF
    if (barChartImage && lineChartImage) {
      if (remainingSpace >= 2 * chartHeight) {
        // Enough space for both charts on the same page
        doc.addImage(
          barChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
        doc.addImage(
          lineChartImage,
          "PNG",
          10,
          tableHeight + chartHeight + 20,
          190,
          chartHeight
        );
      } else if (remainingSpace >= chartHeight) {
        // Enough space for one chart on the current page
        doc.addImage(
          barChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
        doc.addPage();
        doc.addImage(lineChartImage, "PNG", 10, 10, 190, chartHeight);
      } else {
        // Not enough space for any chart on the current page
        doc.addPage();
        doc.addImage(barChartImage, "PNG", 10, 10, 190, chartHeight);
        doc.addImage(
          lineChartImage,
          "PNG",
          10,
          20 + chartHeight,
          190,
          chartHeight
        );
      }
    } else if (barChartImage) {
      // Only the bar chart is available
      if (remainingSpace >= chartHeight) {
        doc.addImage(
          barChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
      } else {
        doc.addPage();
        doc.addImage(barChartImage, "PNG", 10, 10, 190, chartHeight);
      }
    } else if (lineChartImage) {
      // Only the line chart is available
      if (remainingSpace >= chartHeight) {
        doc.addImage(
          lineChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
      } else {
        doc.addPage();
        doc.addImage(lineChartImage, "PNG", 10, 10, 190, chartHeight);
      }
    }

    // Save the PDF
    doc.save("report.pdf");
  }



  return (
    <>
      <div
        className="container shadow col-10 justify-center p-3 mb-5 rounded"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div>
        <div className="row">
          <div className="clo-lg-8 col-12 col-md-6">
            {/* Vehicle type radio buttons */}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="radioOptions"
                id="radioOptionBus"
                value="Bus"
                checked={vehicleType === 'Bus'}
                onChange={handleVehicleTypeChange}
              />
              <label className="form-check-label" htmlFor="radioOptionBus">
                Bus
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="radioOptions"
                id="radioOptionTrain"
                value="Train"
                checked={vehicleType === 'Train'}
                onChange={handleVehicleTypeChange}
              />
              <label className="form-check-label" htmlFor="radioOptionTrain">
                Train
              </label>
            </div>
          </div>

         
          {vehicleType === 'Bus' && (
            <>
              <div className="col-lg-3 col-12 col-md-6">
                {/* Search input */}
                <input
                  type="text"
                  placeholder="Search Bus Owner ID"
                  name="search"
                  id="search"
                  className="form-control border rounded-5"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-lg-3 col-12 col-md-6">
                {/* Date filter select */}
                <select value={reportType} onChange={handleDateFilterChange}>
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="3months">Three Months</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </>
          )}
        </div>
        </div>

        
        {vehicleType === 'Bus' ? (
          <>
          
            <div ref={contentRef}>
              <div className="row  ml-2 mt-3 table-responsive table-container">
                {/* Table */}
                <table >
                  <thead>
                    <tr>
                    <th className="text-center">Vehicle No</th>
                    <th className="text-center">Total Passengers</th>
                    <th className="text-center">Average Rate</th>
                    <th className="text-center">Total Income</th>
                    <th className="text-center">Predicted Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReportData.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">{data.vehicleOwner}</td>
                        <td className="text-center">{data.totalPassengers}</td>
                        <td className="text-center">{data.averageRate}</td>
                        <td className="text-center">{data.totalIncome}</td>
                        <td className="text-center">{data.predictedIncome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Charts */}
              <div
                className="container shadow col-10 justify-center p-3 mb-5 rounded "
                style={{ backgroundColor: "#FFFFFF" }}
                ref={barChartRef}
              >
                <div className="container-fluid">
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Vehicle Owner",
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Rate",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div
                className="container shadow col-10 justify-center p-3 mb-5 rounded "
                style={{ backgroundColor: "#FFFFFF" }}
                ref={lineChartRef}
              >
                <div className="container-fluid">
                  <Line
                    data={lineChartData}
                    options={{
                      responsive: true,
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Vehicle Owner",
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Income",
                          },
                          min: 0,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3 p-5 d-flex justify-content-center align-items-center">
              <button
                onClick={downloadPDF}
                className="btn btn-primary px-3 custom-button"
              >
                Download as PDF
              </button>
            </div>
          </>
        ) : (
          <TrainOwners />
        )}
      </div>
    </>
  );
};

export default ReportTable;