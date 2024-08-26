import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
    
  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #EAEAEA",
        }}
      >
        <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
          {tabs.map((tab, index) => (
            <li
              key={index}
              style={{
                marginRight: "20px",
                cursor: "pointer",
                borderBottom: activeTab === tab ? "2px solid #4A90E2" : "none",
                paddingBottom: activeTab === tab ? "5px" : "0",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      
      </nav>
    </div>
  );
};

export default Tabs;
