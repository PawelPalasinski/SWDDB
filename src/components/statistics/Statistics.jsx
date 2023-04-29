import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// import useCardStore from "../../store/cardStore";
import useCardCountStore from "../../store/cardCountStore";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
  //   const factionsData = useCardStore((state) => state.data);
  // const cardCount = useCardCountStore((state) => state.cardCount);
  const cardRedCount = useCardCountStore((state) => state.cardRedCount);
  const cardYellowCount = useCardCountStore((state) => state.cardYellowCount);
  const cardBlueCount = useCardCountStore((state) => state.cardBlueCount);
  const cardGrayCount = useCardCountStore((state) => state.cardGrayCount);

  console.log(cardRedCount);

  const data = {
    // labels: ["Red", "Blue", "Yellow", "Gray"],
    datasets: [
      {
        label: "# of Votes",
        data: [cardRedCount, cardYellowCount, cardBlueCount, cardGrayCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default Statistics;
