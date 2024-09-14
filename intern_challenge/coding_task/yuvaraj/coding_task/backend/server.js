import app from "./index.js";

const URL = process.env.BUILDENV === "dev" ? process.env.PORT : process.env.LIVEURL;

const serverStart = app.listen(URL, async (err) => {
    if (err) {
        console.log(`Connection failed. Error - ${err}`);
    } else {
        console.log(`Server is running at ${process.env.PORT}`);
    }
})