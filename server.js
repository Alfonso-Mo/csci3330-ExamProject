import app from './src/app.js'
import truckingRoutes from "./src/routes/trucking.routes.js"


const port = 3000;

app.use("/", truckingRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});