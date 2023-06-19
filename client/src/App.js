import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Landing , Register , Error , ProtectedRoute } from "./pages";
import {
    ShayeredLayout,
    AddJobs, 
    AllJobs,
    Profile,
    Stats
} from "./pages/dashboard";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" 
                element={
                    <ProtectedRoute>
                        <ShayeredLayout/>
                    </ProtectedRoute>
                }>
                    <Route index element={<Stats/>} />
                    <Route path="all-jobs" element={<AllJobs/>} />
                    <Route path="add-jobs" element={<AddJobs/>} />
                    <Route path="profile" element={<Profile/>} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    ); 
}

export default App;