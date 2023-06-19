import { FormRow, FormRowSelect, Alert } from "../../components/index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddJobs = ()=>{
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob,
        editJob,
        leaveEditJob,
    } = useAppContext();

    const navigate = useNavigate();
    
    useEffect(()=>{
        return ()=>{
            if(isEditing){
                leaveEditJob();
            }
        };
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(!position || !jobLocation || !company){
            displayAlert();
            return;
        }
        
        if(isEditing){
            editJob();
            setTimeout(()=>{
                navigate("/all-jobs");
            }, 2000);
            return;
        }
        createJob();
    }
    
    const handleJobInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        handleChange({name, value});
    }

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "Edit Job":"Add Job"}</h3>
                {showAlert && <Alert />}

                {/* position */}
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        onChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        onChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        label="Job Location"
                        name="jobLocation"
                        value={jobLocation}
                        onChange={handleJobInput}
                    />
                    {/* Job type */}
                    <FormRowSelect 
                        name="jobType" 
                        value={jobType} 
                        label="Job Type" 
                        onChange={handleJobInput}
                        list={jobTypeOptions} 
                    />
                    {/* job status */}
                    <FormRowSelect 
                        name="status" 
                        value={status} 
                        label="Status" 
                        onChange={handleJobInput}
                        list={statusOptions} 
                    />

                    <div className="btn-container">
                        <button 
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button className="btn btn-block clear-btn"
                            onClick={(e)=>{
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}
export default AddJobs;