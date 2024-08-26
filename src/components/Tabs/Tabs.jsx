import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
    
  const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0px",
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
                fontWeight: activeTab === tab ? "700" : "500",
                color: activeTab === tab ? "#1A243A" : "#6F7177",
                borderBottom: activeTab === tab ? "3px solid #4B40EE" : "none",
                paddingBottom: activeTab === tab ? "5px" : "0",
                transition: "all ease-in-out 0.3s"
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
