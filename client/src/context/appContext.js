import React , { useReducer , useContext, useEffect } from "react";
import reducer from "./reducers";
import axios from "axios";

import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    SET_UP_USER_BEGIN,
    SET_UP_USER_SUCCESS,
    SET_UP_USER_ERROR,
    LOGOUT_USER,
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    LEAVE_EDIT_JOB,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTER,
    PAGE_CHANGE,
    DELETE_JOB_ERROR,
    GET_CURR_USER_BEGIN,
    GET_CURR_USER_SUCCESS,
} from "./actions";

const initialState = {
    isLoading: false,
    userLoading: true,
    showAlert: false,
    alertText: "",
    alertType:"",
    user:  null,
    userLocation: "",
    showSidebar : false,
    isEditing: false,
    editJobId: "",
    position: "",
    company:"",
    jobLocation: "",
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["interview", "pending", "declined"],
    status: "pending",
    jobs:[],
    totalJobs:0,
    numOfPages:1,
    page:1,
    stats: {},
    monthlyApplication:[],
    search: "",
    searchStatus: "All",
    searchJobTypes: "All",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"],
} 

const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const [state , dispatch] = useReducer(reducer , initialState);

    // axios
    const authFetch = axios.create({baseURL: "api/v1"});

    authFetch.interceptors.response.use((response)=>{
        return response;
    }, (err)=>{
        // console.log(err.response);
        if(err.response.status === 401){
            logoutUser();
        }
        return Promise.reject(err);
    })


    const displayAlert =()=>{
        dispatch({type: DISPLAY_ALERT});
    };
    const removeAlert = ()=>{
        dispatch({type: CLEAR_ALERT});
    };

    const setUpUser = async ({currUser, isMember})=>{
        dispatch({
            type: SET_UP_USER_BEGIN,
        });
        try{
            const url = `/api/v1/auth/${isMember? "login":"register"}`;
            const response = await axios.post(url , currUser);
            // console.log(response);

            const {user, location} = response.data;
            dispatch({
                type: SET_UP_USER_SUCCESS,
                payload:{
                    user, location
                }
            });

        }
        catch(err){
            // console.log(err.message);
            dispatch({
                type: SET_UP_USER_ERROR,
                payload: {msg: err.response.data.msg}
            })
        }
        removeAlert();
    };
    const logoutUser = async ()=>{
        await authFetch.get("/auth/logout");

        dispatch({
            type: LOGOUT_USER
        })
        // removeUserFromLocalStorage();
    }
    
    const updateUser = async (currUser)=>{
        dispatch({
            type: UPDATE_USER_BEGIN,
        })
        try{
            const response = await authFetch.patch("/auth/updateUser", currUser);
        
            const {user, location} = response.data;
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {user, location}
            });
            
        }
        catch(err){
            if(err.response.status !== 401){
                dispatch({
                    type:UPDATE_USER_ERROR,
                    payload:{msg: err.response.data.msg}
                });
            }
        }
        setTimeout(()=>{
            removeAlert();
        }, 2000);
    }
    const toggleSidebar = ()=>{
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    };
    const handleChange = async ({name, value})=>{
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value,
            },
        })
        changePage(1);
    }

    const clearValues = ()=>{
        dispatch({
            type: CLEAR_VALUES,
        })
    }

    const createJob = async ()=>{
        dispatch({
            type: CREATE_JOB_BEGIN,
        })
        try {
            const {position, company, jobType, status, jobLocation} = state;
            await authFetch.post("/jobs", {
                position, company, jobType, status, jobLocation,
            });
            dispatch({ type: CREATE_JOB_SUCCESS, })
            dispatch({ type: CLEAR_VALUES, })
        }
        catch(err){
            if(err.response.status !== 401){
                dispatch({
                    type: CREATE_JOB_ERROR,
                    payload:{msg: err.response.data.msg},
                })
            }
        }
        setTimeout(()=>{
            removeAlert();
        }, 3000);
    }

    const getJobs = async ()=>{
        const {search, searchStatus, searchJobTypes, sort, page} = state;
        let url = `/jobs?status=${searchStatus}&jobType=${searchJobTypes}&sort=${sort}&page=${page}`;
        if(search && search !== ""){
            url = url + `&search=${search}`;
        }

        dispatch({type: GET_JOBS_BEGIN});
        try{
            const {data} = await authFetch(url);
            const {jobs, totalJobs, numOfPages} = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload:{
                    jobs, totalJobs, numOfPages,
                }
            })
        }
        catch(err){
            // console.log(err.response);
            logoutUser();
        }
        setTimeout(()=>{
            removeAlert();
        },3000);
    }

    const setEditJob = (id)=>{
        dispatch({
            type: SET_EDIT_JOB,
            payload: {id,}
        })
    }
    const editJob = async (id)=>{
        dispatch({type: EDIT_JOB_BEGIN});
        try{
            const {position, company, jobType, jobLocation, status} = state;
            await authFetch.patch(`/jobs/${state.editJobId}`, {
                position, jobType, jobLocation, status, company,
            });

            dispatch({ type: EDIT_JOB_SUCCESS,});
            dispatch({type: CLEAR_VALUES});
        }
        catch(err){
            if(err.response.status === 401) return;
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: {msg: err.response.data.msg},
            })
        }
        setTimeout(()=>{
            removeAlert()
        },3000);
    }
    const leaveEditJob = ()=>{
        dispatch({type: LEAVE_EDIT_JOB});
        dispatch({type: CLEAR_VALUES});
    }
    const deleteJob = async (jobId)=>{
        dispatch({type: DELETE_JOB_BEGIN});
        try{
            await authFetch.delete(`/jobs/${jobId}`);
            getJobs();
        }
        catch(err){
            if(err.response.status === 401) return;
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: {msg: err.response.data.msg},
            })
        }
        setTimeout(()=>removeAlert(), 3000);
    }

    const showStats = async ()=>{
        dispatch({type: SHOW_STATS_BEGIN});
        try{
            const { data } = await authFetch("/jobs/stats");
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.stats,
                    monthlyApplication: data.monthlyApplication,
                }
            })
        }
        catch(err){
            logoutUser();
            // console.log(err.response);
        }
    }

    const clearFilter = ()=>{
        dispatch({
            type: CLEAR_FILTER,
        })
    }

    const changePage = (page)=>{
        dispatch({
            type: PAGE_CHANGE,
            payload: page,
        })
    }

    const getCurrUser = async ()=>{
        dispatch({
            type: GET_CURR_USER_BEGIN,
        })
        try{
            const {data} = await authFetch("/api/v1/auth/get-current-user");
                                      
            const {user, location} = data;
            dispatch({
                type: GET_CURR_USER_SUCCESS,
                payload: {user, location},
            })
        }
        catch(err){
            // console.log(err);
            if(err.response.status === 401) return;
            logoutUser();
        }
    }
    useEffect(()=>{
        getCurrUser();
        // eslint-disable-next-line
    }, [])
    return (
        <AppContext.Provider value={{
            ...state , 
            displayAlert,
            removeAlert,
            setUpUser,
            logoutUser, 
            updateUser,
            toggleSidebar,
            handleChange,
            clearValues,
            createJob,
            getJobs,
            setEditJob,
            deleteJob,
            editJob,
            leaveEditJob,
            showStats,
            clearFilter, 
            changePage,
        }}>
            { children }
        </AppContext.Provider>
    );
}

const useAppContext = ()=>{
    return useContext(AppContext);
};

export {AppProvider , initialState, useAppContext};
