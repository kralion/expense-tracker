import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";

import React from "react";

export default function Chart() {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <LineChart
        data={{
          labels: ["L", "M", "M", "J", "V", "S", "D"],
          datasets: [
            {
              data: [100, 225, 150, 375, 200, 190, 130],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={300}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: "#F5F3F3",
          backgroundGradientTo: "#F5F3F3",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(54, 137, 131, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(109, 104, 104, ${opacity})`,
          strokeWidth: 4,

          propsForBackgroundLines: {
            opacity: 0.5,
          },

          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#368983",
            fill: "#FEFED5",
          },
        }}
        bezier
      />
    </View>
  );
}
