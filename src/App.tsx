import './App.css'
import CreateTrainer from "./components/create-trainer.tsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<CreateTrainer/>}/>
                    
                    {/*<Route path="/trainer/:id" element={<TrainerDetails/>}/>*/}
                </Routes>
            </Router>
        </>
    )
}

export default App
