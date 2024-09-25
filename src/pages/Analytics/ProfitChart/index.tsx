import React, {useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import useChartColors from "../../../Common/useChartColors";
import axios from "axios";

const ProfitChart = ({ chartId }: any) => {

    const chartColors = useChartColors(chartId);
    const [chartData, setChartData] = React.useState([]);

    useEffect(() => {
        fetchChartData()
    }, []);

    const fetchChartData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}analytics/chart`)
            .then(response => {
                setChartData(response.data.chartData);
            })
    }

    const series = [{
        name: 'Профит',
        data: chartData,
    }];

    var ru = require("apexcharts/dist/locales/ru.json")

    var options: any = {
        chart: {
            type: 'area',
            stacked: false,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: false,
            },
            toolbar: {
                autoSelected: 'zoom'
            },
            locales: [ru],
            defaultLocale: 'ru'
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        // title: {
        //     text: 'Stock Price Movement',
        //     align: 'left'
        // },
        colors: chartColors,
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                // formatter: function (val: any) {
                //     return (val / 1000000).toFixed(0);
                // },
            },
            title: {

            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd.MM',
                    hour: 'HH:mm'
                }
            }
        },
        tooltip: {

            shared: true,
            x: {
                show: false,
                format: 'dd MMMM',
            },
            marker: {
                show: false,
            },

            // y: {
            //     formatter: function (val: any) {
            //         return (val / 1000000).toFixed(0)
            //     }
            // }
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series || []}
                data-chart-colors='["bg-green-500"]'
                id={chartId}
                className="apex-charts"
                type='area'
                height={420}
            />
        </React.Fragment>
    )
}

export default ProfitChart
