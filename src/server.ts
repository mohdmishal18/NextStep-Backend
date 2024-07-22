import app from "./frameworks/configs/app";

import dbConnect from "./frameworks/configs/dbConnect";

// Connect database
dbConnect();

//Run the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})