import "./App.css";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const optionsTimeExecution = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sort Algorithms Time Execution",
    },
  },
};
export const optionsComparisons = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sort Algorithms Comparisons Number",
    },
  },
};
export const optionsInterchanges = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sort Algorithms Interchanges Number",
    },
  },
};

function App() {
  const [n, setN] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    show: false,
  });

  const sortInitialState = {
    timeExecution: 0,
    numberSwap: 0,
    numberComparisons: 0,
    sortArray: [],
  };

  const [randomArray, setRandomArray] = useState(sortInitialState);
  const [shellSortState, setShellSortState] = useState(sortInitialState);
  const [bubbleSortState, setBubbleSortState] = useState(sortInitialState);
  // const [quickSortState, setQuickSortState] = useState(sortInitialState);

  // Data Sets.
  const [labels, setLabels] = useState([]);
  const [bubbleData, setBubbleData] = useState({
    times: [],
    comparisons: [],
    interchanges: [],
  });
  const [shellData, setShellData] = useState({
    times: [],
    comparisons: [],
    interchanges: [],
  });

  const dataTimesExecution = {
    labels,
    datasets: [
      {
        label: "Bubble Sort",
        data: [...bubbleData.times],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Shell Sort",
        data: [...shellData.times],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataComparisons = {
    labels,
    datasets: [
      {
        label: "Bubble Sort",
        data: [...bubbleData.comparisons],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Shell Sort",
        data: [...shellData.comparisons],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataInterchanges = {
    labels,
    datasets: [
      {
        label: "Bubble Sort",
        data: [...bubbleData.interchanges],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Shell Sort",
        data: [...shellData.interchanges],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const addNotification = (notification) => {
    setNotification({
      type: notification.type,
      message: notification.message,
      show: true,
    });
    removeNotification();
  };
  const removeNotification = () => {
    setTimeout(() => {
      setNotification({
        type: "",
        message: "",
        show: false,
      });
    }, 1000);
  };

  const handleTextChange = ({ target }) => {
    setN(target.value);
  };

  const createNewArray = (n) => {
    let tempArray = [];
    for (let i = 0; i < n; i++) {
      tempArray[i] = Math.floor(1000 + Math.random() * 9000);
    }
    setRandomArray(tempArray);
    setLabels((lastLabels) => {
      let updatedLabels = [...lastLabels];
      updatedLabels.push(n);
      return updatedLabels;
    });
    setBubbleSortState(sortInitialState);
    setShellSortState(sortInitialState);
  };
  const handleCreateNewArray = () => {
    // Check N Length
    if (n <= 0) {
      addNotification({
        type: "danger",
        message: "Please Write the Length to Create Random Array",
        show: true,
      });
      return;
    }
    addNotification({
      type: "success",
      message: `Creating New Array with ${n} elements`,
      show: true,
    });
    createNewArray(n);
  };

  const handleSort = () => {
    setIsSorting(true);
    bubbleSort(randomArray);
    shellSort(randomArray);
    setIsSorting(false);
  };
  const bubbleSort = (arr) => {
    addNotification({
      type: "success",
      message: "Bubble Sort is Running",
    });
    let interchanges = 0;
    let numberComparisons = 0;
    let timeInit, timeEnd;
    let bubleSortArray = [...arr];
    timeInit = new Date();
    for (let i = 0; i < bubleSortArray.length; i++) {
      // Last i elements are already in place
      for (let j = 0; j < bubleSortArray.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        numberComparisons = numberComparisons + 1;
        if (bubleSortArray[j] > bubleSortArray[j + 1]) {
          // If the condition is true then swap them
          interchanges++;
          let temp = bubleSortArray[j];
          bubleSortArray[j] = bubleSortArray[j + 1];
          bubleSortArray[j + 1] = temp;
        }
      }
    }
    // Print the sorted array
    timeEnd = new Date();

    setBubbleSortState({
      ...bubbleSortState,
      timeExecution: timeEnd.getTime() - timeInit.getTime(),
      numberComparisons: numberComparisons,
      numberSwap: interchanges,
      sortArray: bubleSortArray,
    });
    setBubbleData({
      ...bubbleData,
      times: [...bubbleData.times, timeEnd.getTime() - timeInit.getTime()],
      comparisons: [...bubbleData.comparisons, numberComparisons],
      interchanges: [...bubbleData.interchanges, interchanges],
    });
  };

  const shellSort = (arr) => {
    addNotification({
      type: "success",
      message: "Shell Sort is Running",
    });
    let interchanges = 0;
    let numberComparisons = 0;
    let timeInit, timeEnd;
    let shellSortArray = [...arr];
    timeInit = new Date();

    timeEnd = new Date();

    let increment = shellSortArray.length / 2;
    while (increment > 0) {
      for (let i = increment; i < shellSortArray.length; i++) {
        let j = i;
        let temp = shellSortArray[i];
        numberComparisons = numberComparisons + 1;
        while (j >= increment && shellSortArray[j - increment] > temp) {
          interchanges = interchanges + 1;
          shellSortArray[j] = shellSortArray[j - increment];
          j = j - increment;
        }
        shellSortArray[j] = temp;
      }

      if (increment === 2) {
        increment = 1;
      } else {
        increment = parseInt((increment * 5) / 11);
      }
    }

    setShellSortState({
      ...shellSortState,
      timeExecution: timeEnd.getTime() - timeInit.getTime(),
      numberComparisons: numberComparisons,
      numberSwap: interchanges,
      sortArray: shellSortArray,
    });
    setShellData({
      ...shellData,
      times: [...shellData.times, timeEnd.getTime() - timeInit.getTime()],
      comparisons: [...shellData.comparisons, numberComparisons],
      interchanges: [...shellData.interchanges, interchanges],
    });
  };

  useEffect(() => {
    if (randomArray.length > 0) {
      handleSort();
      console.log("Random Array Was changed");
    }
  }, [randomArray]);
  return (
    <div className="App">
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow mb-4">
        <div className="header-author mx-2 col-2 py-4 ">
          <h1 className="h1 text-white text-start">UTP</h1>
          <h2 className="h6 text-white">
            &lt;/cguzman&gt; / &lt;/jsalazar&gt;
          </h2>
        </div>
        <div className="col-7 col-offset-2">
          <form>
            <div className="mb-3">
              <input
                value={n}
                type="number"
                className="form-control"
                id="n"
                aria-describedby="N"
                onChange={handleTextChange}
              />
              <div id="fieldHelp" className="form-text"></div>
            </div>
          </form>
        </div>
        <div className="col">
          {!isSorting && (
            <button
              type="button"
              onClick={handleCreateNewArray}
              className="btn btn-light"
            >
              Random Array
            </button>
          )}
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* <h1>Dashboard</h1> */}
            {n > 0 && <h2>N:{n}</h2>}
          </div>
          {notification.show && (
            <div className="offset-2 col-8">
              {notification.type === "danger" && (
                <div className="alert alert-danger" role="alert">
                  {notification.message}
                </div>
              )}
              {notification.type === "success" && (
                <div className="alert alert-success" role="alert">
                  {notification.message}
                </div>
              )}
            </div>
          )}
          {/* {randomArray.length > 0 && (
            <div className="col-12 mb-5">
              <h3>Array to Sort</h3>
              <p>
                <code>{JSON.stringify(randomArray)}</code>
              </p>
              <button
                type="button"
                onClick={handleSort}
                className="btn btn-success"
              >
                Sort Elements
              </button>
            </div>
          )} */}
        </div>
        <div className="row">
          <div className="col-4 mb-5">
            <h1>Bubble Sort</h1>
            <>
              <ul className="list-group">
                <li className="list-group-item">
                  Time Execution: {bubbleSortState.timeExecution} ms
                </li>
                <li className="list-group-item">
                  Comparisons: {bubbleSortState.numberComparisons}
                </li>
                <li className="list-group-item">
                  Interchanges: {bubbleSortState.numberSwap}
                </li>
              </ul>
              {/* {bubbleSortState.sortArray.length > 0 && (
                <p>
                  Sort Array
                  <code>{JSON.stringify(bubbleSortState.sortArray)}</code>
                </p>
              )} */}
            </>
          </div>
          <div className="col-4">
            <h1>Shell Sort</h1>
            <>
              <ul className="list-group">
                <li className="list-group-item">
                  Time Execution: {shellSortState.timeExecution} ms
                </li>
                <li className="list-group-item">
                  Comparisons: {shellSortState.numberComparisons}
                </li>
                <li className="list-group-item">
                  Interchanges: {shellSortState.numberSwap}
                </li>
              </ul>
              {/* {shellSortState.sortArray.length > 0 && (
                <p>
                  Sort Array
                  <code>{JSON.stringify(shellSortState.sortArray)}</code>
                </p>
              )} */}
            </>
          </div>
        </div>
      </div>
      <div className="fluid-container">
        <div className="row">
          <div className="offset-2 col-8 offset-2 ">
            <Line options={optionsTimeExecution} data={dataTimesExecution} />
          </div>
          <div className="offset-2 col-8 offset-2 ">
            <Line options={optionsComparisons} data={dataComparisons} />
          </div>
          <div className="offset-2 col-8 offset-2 ">
            <Line options={optionsInterchanges} data={dataInterchanges} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// <div className="App container bg-light rounded-3">
//   <h1>Sort Algoritms</h1>
//   <div className="">
//     <div className="alert alert-primary" role="alert">
//       A simple primary alert—check it out!
//     </div>
//   </div>
//   <p>
//     In this App, you can compare the performance between Shell Sort and
//     QuickSort.
//   </p>
//   <ul>
//     <li>Execution Time </li>
//     <li>Comparisons Number </li>
//     <li>Swap Number </li>
//   </ul>
// </div>
