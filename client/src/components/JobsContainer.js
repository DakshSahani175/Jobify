import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import {PageBtnContainer, Job, Loading, Alert} from "./";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = ()=>{
    const {
        showAlert, 
        getJobs, 
        jobs, 
        totalJobs, 
        isLoading, 
        page, 
        search, 
        searchStatus, 
        searchJobTypes, 
        sort, 
        numOfPages, 
    } = useAppContext();

    useEffect(()=>{
        getJobs();
        // eslint-disable-next-line
    }, [search, searchStatus, searchJobTypes, sort, page]);

    if(isLoading){
        return <Loading center />
    }
    if(jobs.length === 0){
        return(
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
    return(
        <Wrapper>
            {showAlert && <Alert />}
            <h5>{totalJobs} job{totalJobs > 1? "s":""} Found</h5>
            <div className="jobs">
                {jobs.map((job)=>{
                    return <Job key={job._id}{...job} /> 
                })}
            </div> 
            {/* pagination buttons */}
            {numOfPages > 1 && <PageBtnContainer /> }
        </Wrapper>
    )
}

export default JobsContainer;