import React from "react";
import { Pie } from 'react-chartjs-2'


function BarChart({ data, title }) {
    return (
        <Pie
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