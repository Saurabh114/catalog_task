import React , { useState } from "react";
import Tabs from "./../Tabs/Tabs";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Chart');
    const [timeRange, setTimeRange] = useState('1w');
  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Chart" && <h1>Dashboard</h1>}

      <div style={{ padding: "20px 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setTimeRange("1d")}
            style={{ marginRight: "10px" }}
          >
            1d
          </button>
          <button
            onClick={() => setTimeRange("1w")}
            style={{ marginRight: "10px" }}
          >
            1w
          </button>
          <button
            onClick={() => setTimeRange("1m")}
            style={{ marginRight: "10px" }}
          >
            1m
          </button>
          <button
            onClick={() => setTimeRange("6m")}
            style={{ marginRight: "10px" }}
          >
            6m
          </button>
          <button
            onClick={() => setTimeRange("1y")}
            style={{ marginRight: "10px" }}
          >
            1y
          </button>
          <button onClick={() => setTimeRange("max")}>max</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
