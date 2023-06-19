import { useEffect, useState  } from "react";
import { Alert, Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import {useNavigate } from "react-router-dom";

const initialValues = {
    name: "",
    email: "",
    password: "",
    isMember: true,
};

function Register(){
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);
    const {
        user, 
        isLoading, 
        showAlert, 
        displayAlert, 
        removeAlert, 
        setUpUser,
    } = useAppContext();

    const handleChange = (event)=>{ 
        const {name ,email, password, isMember} = values;
        if(email && password && (isMember || name)){
            removeAlert();
        }
        setValues({...values , 
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = (event)=>{
        event.preventDefault();

        const {name ,email, password, isMember} = values;

        if(!email || !password || (!isMember && !name)){
            displayAlert();
            return;
        }

        const currUser = {email, password};
        if(!isMember){
            currUser.name = name;
        }
        setUpUser({currUser, isMember});
    }

    useEffect(()=>{
        if(user){
            // setTimeout(()=>{
                navigate("/");
            // }, 1000)
        }
    }
    , [user, navigate]);

    const toggleMember = ()=>{
        const newValues = {...values, isMember: !(values.isMember)};
        setValues(newValues);
    }
    return (
        <Wrapper className="full-page">
        <form className="form" onSubmit={handleSubmit}>
            <header>
                <Logo/>  
                <h3>{values.isMember ? "Login" : "Register" }</h3>
            </header>
            <div>
                {showAlert && <Alert />}
                {!values.isMember && 
                    <FormRow name="name" type="text" value={values.name} onChange={handleChange}/>
                }
                <FormRow name="email" type="email" value={values.email} onChange={handleChange}/>

                <FormRow name="password" type="password" value={values.password} onChange={handleChange}/>

                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    Submit
                </button>

                <button
                    type="button"
                    className="btn btn-block btn-hisper"
                    disabled={isLoading}
                    onClick={()=>{
                        setUpUser({
                            currUser: {
                                email: "test@user.com",
                                password: "secret",
                            },
                            isMember: true,
                        });     
                    }}
                >
                    {isLoading? "loading...": "Demo app"}
                </button>
            </div>
            <p>
                {values.isMember ? "Not a member yet? " : "Already registered? "}
                
                <span onClick={toggleMember} className="member-btn">
                    {values.isMember ? "Register" : "Login"}
                </span>
            </p>
        </form>
        </Wrapper>
    );
}

export default Register;