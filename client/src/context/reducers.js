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
import { initialState } from "./appContext";

const reducer = (state ,action)=>{
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please Enter all the values!",
        }
    }
    if(action.type === CLEAR_ALERT){
        return{
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        }
    }
    if (action.type === SET_UP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === SET_UP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: "success",
            alertText: "THANK YOU FOR YOUR COPRATION!\nRedirecting...",
        }
    }
    if (action.type === SET_UP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger", 
            alertText: action.payload.msg ,
        }
    }
    if(action.type === LOGOUT_USER){
        return {
            ...initialState,
            userLoading: false,
            user: null,
            userLocation: "",
            jobLocation: "",
        }
    }
    if(action.type === UPDATE_USER_BEGIN){
        return {
            ...state,
            isLoading: true,
        }
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: "success",
            alertText: "User Profile Updated",
        }
    }
    if(action.type === UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }
    if(action.type === TOGGLE_SIDEBAR){
        return{
            ...state,
            showSidebar: !state.showSidebar,
        }
    }
    if(action.type === HANDLE_CHANGE){
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        }
    }
    if(action.type === CLEAR_VALUES){
        const defaultValues = {
            isEditing: false,
            editJobId: "",
            position: "",
            company:"",
            jobLocation: initialState.userLocation || "",
            jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
            jobType: "full-time",
            statusOptions: ["interview", "pending", "declined"],
            status: "pending",
        }
        return {
            ...state,
            ...defaultValues,
        }
    }
    if(action.type === CREATE_JOB_BEGIN){
        return {
            ...state,
            isLoading: true,
        }
    }
    if(action.type === CREATE_JOB_SUCCESS){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Job Created!",
        }
    }
    if(action.type === CREATE_JOB_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }
    if(action.type === GET_JOBS_BEGIN){
        return{
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }
    if(action.type === GET_JOBS_SUCCESS){
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages,
        }
    }
    if(action.type === SET_EDIT_JOB){
        const job = state.jobs.find((job)=> job._id === action.payload.id);
        const {_id, position, company, jobType, status, jobLocation} = job;
        return{
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            jobType,
            jobLocation,
            status,
            company,
        }
    }
    if(action.type === DELETE_JOB_BEGIN){
        return{
            ...state,
            isLoading: true,
        }
    }
    if(action.type === DELETE_JOB_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }
    if(action.type === EDIT_JOB_BEGIN){
        return{
            ...state, isLoading: true,
        }
    }
    if(action.type === LEAVE_EDIT_JOB){
        return{
            ...state,
            isLoading: false,
            isEditing: false,
        }
    }
    if(action.type === EDIT_JOB_SUCCESS){
        return {
            ...state, 
            isLoading: false,
            isEditing: false,
            editJobId: "",
            showAlert: true,
            alertType: "success",
            alertText: "Data edited successfully!",
        }
    }
    if(action.type === EDIT_JOB_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }
    if(action.type === SHOW_STATS_BEGIN){
        return {
            ...state, 
            isLoading: true,
        };
    }
    if(action.type === SHOW_STATS_SUCCESS){
        return {
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            monthlyApplication: action.payload.monthlyApplication,
        }
    }
    if(action.type === CLEAR_FILTER){
        return {
            ...state,
            search: "",
            searchJobTypes: "All",
            searchStatus: "All",
            sort: "latest",
        }
    }
    if(action.type === PAGE_CHANGE){
        return {
            ...state,
            page: action.payload,
        }
    }
    if(action.type === GET_CURR_USER_BEGIN){
        return {
            ...state, userLoading: true, showAlert: false,
        }
    }
    if(action.type === GET_CURR_USER_SUCCESS){
        return{
            ...state,
            userLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
        }
    }
    throw new Error(`no such action : ${action.type}`)
}

export default reducer;