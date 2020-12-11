# chart-generator

`Node version v14.15.1`

- `yarn install`

- `yarn start`

- [http://localhost:3000](http://localhost:3000) to view it in the browser.

![Line Chart Demo](/images/chart-generator-demo1.png)
![Rectangle Chart Demo](/images/chart-generator-demo2.png)
![Bars Chart Demo](/images/chart-generator-demo3.png)

### Generate your own charts sending:

- a _data array_ of objects specifying `name` `quantity` (array of numbers per period) and `color`

i.e

> [{
> color: "red",
> name: "HTML",
> quantity: [123, 145, 320, 350, 352, 354],
> },
> {
> color: "orange",
> name: "Javascript",
> quantity: [290, 410, 240, 255, 120, 300],
> },
> {
> color: "black",
> name: "Next",
> quantity: [120, 130, 155, 110, 140, 150],
> },
> {
> color: "lightblue",
> name: "React",
> quantity: [57, 75, 83, 110, 10, 99],
> },
> {
> color: "green",
> name: "Node",
> quantity: [75, 84, 104, 106, 106, 200],
> },
> {
> color: "pink",
> name: "Graphql",
> quantity: [80, 94, 210, 5, 300, 45],
> }]

- a _config object_ specifying `periodName`, `periods`, `showName`, `sortBy`, `type`, `unit`,

i.e

> {
> periodName: "Period", //string
> periods: 6, // number
> showName: true, // boolean - true by default
> sortBy: "quantityDesc", // string - quantityDesc, quantityAsc, alphaDesc, alphaAsc
> type: "bars", // string - rectangle, bars, line
> unit: "units", string
> }
