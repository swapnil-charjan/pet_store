import app from "./app";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});