import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import Tabs from "./../Tabs/Tabs";

import Icon1 from "../../assets/icon.png";
import Icon2 from "../../assets/icon2.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockMarketChart = () => {
  const [activeTab, setActiveTab] = useState("Chart");

  const [timeframe, setTimeframe] = useState("1d");
  const [fullScreen, setFullScreen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [hoverValue, setHoverValue] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [marketDifference, setMarketDifference] = useState({
    percent: 0,
    amount: 0,
  });
  const [finalValue, setFinalValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = generateDummyData(timeframe);
      setChartData(data);
      calculateMarketDifference(data.data);
      setFinalValue(data.data[data.data.length - 1].toFixed(2));
    };
    fetchData();
  }, [timeframe]);

  const generateDummyData = (timeframe) => {
    const labels = [];
    const data = [];
    let points;
    switch (timeframe) {
      case "1d":
        points = 24;
        break;
      case "3d":
        points = 72;
        break;
      case "1w":
        points = 7;
        break;
      case "1m":
        points = 30;
        break;
      case "1y":
        points = 12;
        break;
      case "max":
        points = 60;
        break;
      default:
        points = 24;
    }
    for (let i = 0; i < points; i++) {
      labels.push(`Point ${i + 1}`);
      data.push(Math.random() * 10000 + 50);
    }
    return { labels, data };
  };

  const calculateMarketDifference = (data) => {
    if (data && data.length > 1) {
      const startValue = data[0];
      const endValue = data[data.length - 1];
      const difference = endValue - startValue;
      const percentDifference = ((difference / startValue) * 100).toFixed(2);
      setMarketDifference({
        percent: percentDifference,
        amount: difference.toFixed(2),
      });
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      crosshair: {
        line: {
          color: "#4B40EE",
          width: 1,
          dashPattern: [5, 5],
        },
        sync: {
          enabled: true,
          group: 1,
          suppressTooltips: false,
        },
        zoom: {
          enabled: false,
        },
        snap: {
          enabled: true,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: "rgba(211, 211, 211, 0.5)",
          lineWidth: 2,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: "rgba(211, 211, 211, 0.5)",
          lineWidth: 2,
        },
        ticks: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
    onHover: (event, elements) => {
      if (elements && elements.length) {
        const { x, y } = elements[0].element;
        setHoverPosition({ x, y });
        setHoverValue(elements[0].element.$context.raw.toFixed(2));
      } else {
        setHoverPosition(null);
        setHoverValue(null);
      }
    },
  };

  const data = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: "Stock Value",
        data: chartData?.data || [],
        borderColor: "#4B40EE",
        display: "none",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(75, 64, 238, 0.5)");
          gradient.addColorStop(1, "rgba(75, 64, 238, 0)");
          return gradient;
        },
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <>
      {finalValue && (
        <div className="flex my-5">
          <h2 className="text-5xl font-bold ">{finalValue}</h2>
          <span className="text-m font-bold text-gray-500 "> USD </span>
        </div>
      )}

      <div>
        {marketDifference && (
          <div className=" mt-2 ml-2 px-2 py-1 rounded flex items-center ">
            {parseFloat(marketDifference.percent) >= 0 ? (
              <FaArrowUp className="mr-1 text-green-700" />
            ) : (
              <FaArrowDown className="mr-1 text-red-700" />
            )}
            <span
              className={`font-bold ${
                parseFloat(marketDifference.percent) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
               ${Math.abs(marketDifference.amount)} ({marketDifference.percent}%)
            </span>
          </div>
        )}
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Chart" && (
        <div
          className={`p-4 ${fullScreen ? "fixed inset-0 z-50 bg-white" : ""}`}
        >
          <div className="flex flex-wrap gap-16 items-center mb-4">
            <div className="flex gap-4">
              <button
                onClick={toggleFullScreen}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                {fullScreen ? (
                  <div className="flex">
                    <FaCompressArrowsAlt className="pe-2 pt-2" /> <h4>Exit</h4>
                  </div>
                ) : (
                  <div className="flex">
                    <img
                      src={Icon1}
                      alt="full screen icon"
                      className="w-6 pe-2"
                    />
                    <h4>Fullscreen</h4>
                  </div>
                )}
              </button>

              <button className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors flex">
                <img src={Icon2} alt="Compare Icon" className="w-8 pe-2" />
                Compare
              </button>
            </div>

            <div className="flex space-x-2 mb-2 sm:mb-0">
              {["1d", "3d", "1w", "1m", "1y", "max"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={`px-3 py-1 rounded ${
                    timeframe === tf
                      ? "bg-[#4B40EE] text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-[#4B40EE] hover:text-white transition-colors`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`chart-container relative ${
              fullScreen ? "h-full" : "h-64 sm:h-96"
            }`}
          >
            {chartData && <Line options={options} data={data} />}
            {hoverPosition && (
              <>
                <div
                  className="absolute border-l border-dashed border-[#4B40EE]"
                  style={{
                    left: `${hoverPosition.x}px`,
                    top: 0,
                    bottom: 0,
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="absolute border-t border-dashed border-[#4B40EE]"
                  style={{
                    top: `${hoverPosition.y}px`,
                    left: 0,
                    right: 0,
                    pointerEvents: "none",
                  }}
                />
              </>
            )}
            {hoverValue && (
              <div
                className="absolute bg-black text-white px-2 py-1 rounded"
                style={{
                  left: hoverPosition ? `${hoverPosition.x}px` : 0,
                  top: hoverPosition ? `${hoverPosition.y}px` : 0,
                  transform: "translate(-50%, -100%)",
                  pointerEvents: "none",
                }}
              >
                ${hoverValue}
              </div>
            )}
            {chartData && (
              <div className="absolute bottom-0 right-0 mb-2 mr-2 bg-[#4B40EE] text-2xl font-semibold text-white px-5 py-1 rounded">
                ${chartData.data[chartData.data.length - 1].toFixed(2)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StockMarketChart;
