import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const DualBoxChart = () => {
  // State variables for parameters
  const [parameter1, setParameter1] = useState(0);
  const [parameter2, setParameter2] = useState(0);
  const [parameter3, setParameter3] = useState(0);
  const [parameter4, setParameter4] = useState(0);

  const [textParameter1, setTextParameter1] = useState(0);
  const [textParameter2, setTextParameter2] = useState(0);
  const [textParameter3, setTextParameter3] = useState(0);
  const [textParameter4, setTextParameter4] = useState(0);

  // Initial parameters
  const initialParameters = [
    { name: 'Relative Sea Level Increase (mm)', dataset1: 20, dataset2: parameter1, dataset3: textParameter1 },
    { name: 'Rise in Temperature (by °C)', dataset1: 30, dataset2: parameter2, dataset3: textParameter2},
    { name: 'Air Quality Index Decrease', dataset1: 60, dataset2: parameter3, dataset3: textParameter3},
    { name: 'Wildfire Increase in Percentage', dataset1: 20, dataset2: parameter4,dataset3: textParameter4},
  ];

  const [parameters, setParameters] = useState(initialParameters);

  // Update parameters when individual parameter states change
  useEffect(() => {
    setParameters([
      { name: 'Relative Sea Level Increase (mm)', dataset1: 20, dataset2: parameter1, dataset3: textParameter1  },
      { name: 'Rise in Temperature (by °C)', dataset1: 30, dataset2: parameter2, dataset3: textParameter2  },
      { name: 'Air Quality Index Decrease', dataset1: 60, dataset2: parameter3, dataset3: textParameter3  },
      { name: 'Wildfire Increase in Percentage', dataset1: 20, dataset2: parameter4, dataset3: textParameter4  },
    ]);
  }, [parameter1, parameter2, parameter3, parameter4, textParameter1, textParameter2, textParameter3, textParameter4]); // Added textParameters

  // Prepare data for Chart.js
  const data = {
    labels: parameters.map(param => param.name),
    datasets: [
      {
        label: 'Current',
        data: parameters.map(param => param.dataset1),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Predicted',
        data: parameters.map(param => param.dataset2),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,  // Ensure title display is set to true
        text: 'Dual Dataset Bar Chart',  // Title text
        font: {
          size: 18,  // Adjust font size for better visibility
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  // Handle input changes for Dataset 2
  const handleInputChange = (setter) => (e) => {
    const value = parseFloat(e.target.value);
    console.log(value)
    setter(isNaN(value) ? 0 : value);
  };

  // Common function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      setParameter1(22)
      setParameter2(31)
      setParameter3(54)
      setParameter4(22.4)

      setTextParameter1(2)
      setTextParameter2(1)
      setTextParameter3(6)
      setTextParameter4(2.4)
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Box: Bar Chart */}
      <div style={styles.topBox}>
        <Bar data={data} options={options} />
      </div>

      {/* Bottom Box: Input Forms */}
      <div style={styles.bottomBox}>
        <div style={styles.inputHeader}>
          <span style={styles.paramName}>Parameter Name</span>
          <span style={styles.paramInput}>Predicted Value</span>
        </div>
        {parameters.map((param, index) => (
          <div key={param.name} style={styles.inputRow}>
            <span style={styles.paramName}>{param.name}</span>
            <input
              type="number"
              value={param.dataset3}
              onChange={handleInputChange(
                index === 0
                  ? setTextParameter1
                  : index === 1
                  ? setTextParameter2
                  : index === 2
                  ? setTextParameter3
                  : setTextParameter4
              )}
              onKeyDown={handleKeyPress}
              style={styles.inputBox}
              placeholder="Enter value"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  topBox: {
    flex: 1,
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  bottomBox: {
    flex: 1,
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  inputHeader: {
    display: 'flex',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  paramName: {
    flex: 1,
    fontSize: '16px',
  },
  paramInput: {
    flex: 1,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  inputBox: {
    flex: 1,
    padding: '8px',
    fontSize: '16px',
  },
};

export default DualBoxChart;
