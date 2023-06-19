import React from "react";
import {Loading, Logo} from "../components/";
import main from "../assets/images/main.svg";
import { Link , Navigate} from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { useAppContext } from "../context/appContext";

function Landing(){
    const {user, userLoading} = useAppContext();
    if(userLoading) return <Loading />

    return (
        <React.Fragment >
            {user && <Navigate to="/" />}
            <Wrapper>
                <nav>
                    <Logo/>
                </nav>
                <div className="container page">
                    <div className="info">
                        <h1>Job <span>Tracing</span> App</h1>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ex dignissimos reprehenderit dolorum cupiditate obcaecati quod, blanditiis illo molestiae voluptatibus atque optio totam veritatis deleniti distinctio aliquam vel magnam sunt!
                        </p>
                        <Link to={"/register"} className="btn btn-hero">Login/Register</Link>
                    </div>
                    <img src={main} alt="job hunt" className="img main-img"/>
                </div>
            </Wrapper>
        </React.Fragment>
    )
}



export default Landing;