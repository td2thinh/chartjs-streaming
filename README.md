# chartjs-streaming
<br/>
<p align="center">
  <a href="https://github.com/td2thinh/lcjs">
  </a>

  <h3 align="center">React App implementing Chart.js and its plugins for live streaming data from IOT devices</h3>

</p>

## Lesson Learned

Set up live streaming chart using Chart.js with live data feed using WebSocket (SocketIO lib), this library is free and has many features with great docs and great community but sadly it doesn't suupport WebGL rendering of charts, the app will get laggy very quick.

After researching, Lightning Chart JS, even though only offer free license that comes with a watermark, is found to be the only library with full fledged docs and examples and integrations out there that supports WebGL, available here: https://github.com/td2thinh/lcjs/

### Live Streaming Chart 

Remember to register everything that is going to be used to avoid bugs
```js
ChartJS.register(StreamingPlugin,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    zoomPlugin,
);
```
Adding data by pushing data to the ref holding the chart
```js
chartRef.current.data.datasets[0].data.push({
                    x: data.x,
                    y: data.y,
                });
chartRef.current.update('quiet');
```

## Built With

ReactJS, chart.js, chartjs-plugin-streaming, chartjs-plugin-zoom, react-bootstrap, Vite

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm

Note that ```chartjs-plugin-streaming``` hasn't been updated in over 2 years and only supports Chart.js 3.x.x

Need to have a WebSocket server running that send data in the format 
```js
 data = {
            "x": new Date().getTime(),
            "y": sensorData,
        };
socket.emit('data', data);
```
ExpressJS SocketIO server available here https://github.com/td2thinh/socketIO-server-iot/


### Installation

1. Clone the repo

```sh
git clone https://github.com/td2thinh/chartjs-streaming.git
```

2. Install dependencies

```sh
npm install
```

## Usage
Run app
```sh
npm run dev 
```
App available at http://localhost:5173



