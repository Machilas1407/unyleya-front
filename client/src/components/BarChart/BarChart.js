import React from "react";
import { Bar } from 'react-chartjs-2'


function BarChart({ data, title }) {
    return (
        <Bar
            data={data}
            options={{
                "plugins": {
                    "title": {
                        "display": true,
                        "text": title
                    },
                },
                "responsive": true,
            }}
        />

    );
}

export default BarChart;