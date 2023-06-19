import {useState} from "react";
import {FormRow , Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = ()=>{
    const {user, showAlert, isLoading, updateUser, displayAlert} = useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        if(!name || !email || !lastName || !location){
            displayAlert();
            return;
        }
        updateUser({name, email, location, lastName});
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert/>}

                <div className="form-center">
                    <FormRow
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
                    />
                    <FormRow
                        type="text"
                        name="LastName"
                        value={lastName}
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }}
                    />                    
                    <FormRow
                        type="text"
                        name="Email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />                    
                    <FormRow
                        type="text"
                        name="Location"
                        value={location}
                        onChange={(e)=>{
                            setLocation(e.target.value)
                        }}
                    />
                    <button className="btn btn-block" type="submit" disabled={isLoading}>
                        {isLoading? "Please Wait...":"Save Changes"}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}
export default Profile;