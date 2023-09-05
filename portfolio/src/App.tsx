import { useState } from "react";
import "./App.css";
import { ThemedPage } from "./components/ThemedPage";
import * as React from "react";

function App() {
    return (
        <div style={{ borderLeft: "2px solid blue" }}>
            <ThemedPage></ThemedPage>
        </div>
    );
}

export default App;
