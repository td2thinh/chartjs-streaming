
// Example in https://nagix.github.io/chartjs-plugin-streaming/master/tutorials/react/stream.html
// is not correct!  Use Chart from chart.js instead.
import { useState, useRef } from "react";
import {
    Chart as ChartJS, LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from "chart.js";
import StreamingPlugin from "chartjs-plugin-streaming";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { io } from "socket.io-client";
import zoomPlugin from "chartjs-plugin-zoom";
import { Container, Row, Button } from "react-bootstrap";
import { useEffect } from "react";

ChartJS.register(StreamingPlugin,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    zoomPlugin
);

export default function Stream() {
    const chartRef = useRef(null);
    const dataStore = useRef([]);
    const streaming = useRef(true);

    useEffect(() => {
        const socket = io("http://localhost:8080");
        socket.on("data", (data) => {
            dataStore.current.push(data);
            if (chartRef.current) {
                chartRef.current.data.datasets[0].data.push({
                    x: data.x,
                    y: data.y,
                });
                chartRef.current.update('quiet');
            }
        })

        return () => {
            socket.off()
        }
    }, [])



    return (
        <Container>
            <Row>
                <Button onClick={() => {
                    if (chartRef && chartRef.current) {
                        chartRef.current.resetZoom()
                    }
                }}>
                    Reset View
                </Button>
                <Button onClick={() => {
                    chartRef.current._options.plugins.streaming.pause = !chartRef.current._options.plugins.streaming.pause
                }}>
                    Pause/Resume Scroll
                </Button>
                <Button onClick={() => {
                    streaming.current = !streaming.current
                    chartRef.current._options.plugins.streaming.pause = !chartRef.current._options.plugins.streaming.pause

                }
                }>
                    Pause/Resume Streaming
                </Button>
            </Row>
            <Row>
                <Chart type="line"
                    ref={chartRef}
                    width={1200}
                    height={600}
                    data={{
                        datasets: [
                            {
                                label: "Dataset 1",
                                backgroundColor: "rgba(255, 99, 132, 0.5)",
                                borderColor: "rgb(255, 99, 132)",
                                fill: true,
                                data: [],
                            },
                        ]
                    }}
                    options={{
                        parsing: false,
                        animation: false,
                        spanGaps: true,
                        responsive: true,
                        pointRadius: 10,
                        pointStyle: 'circle',
                        pointHoverRadius: 30,
                        plugins: {
                            decimation: {
                                enabled: true,
                                algorithm: 'min-max',
                            },
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Chart.js Line Chart',
                            },
                            zoom: {
                                zoom: {
                                    wheel: {
                                        enabled: true,
                                    },
                                    mode: "xy",
                                    speed: 100
                                },
                                pan: {
                                    enabled: true,
                                    mode: "xy",
                                    speed: 100
                                },
                            },
                            streaming: {
                                ttl: 10 * 60 * 1000,
                                frameRate: 30,
                            }
                        },
                        scales: {
                            x: {
                                type: "realtime",
                            }
                        }
                    }}
                />
            </Row >
        </Container >
    );
}
