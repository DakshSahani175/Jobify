import {FormRow, FormRowSelect} from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import {useState, useMemo} from "react";

const SearchContainer = ()=>{
    const [localSearch, setLocalSearch] = useState("");
    const {
        isLoading,
        searchStatus,
        statusOptions,
        searchJobTypes,
        jobTypeOptions, 
        sort,
        sortOptions,
        handleChange,
        clearFilter,
    } = useAppContext();

    const handleSearch = (e)=>{
        if(isLoading) return;
        handleChange({name: e.target.name, value: e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        clearFilter();
    }
    const debounce = ()=>{
        let timeOutId;
        return (e)=>{
            console.log(e);
            setLocalSearch(e.target.value);
            clearTimeout(timeOutId);
            timeOutId = setTimeout(()=>{
                handleChange({name: e.target.name, value: e.target.value});
            }, 900);
        };
    };

    const optimizedDebounce = useMemo(()=>debounce()
        // eslint-disable-next-line
    , []);

    return(
        <Wrapper>
            <form className="form">
                <h4>search Form</h4>
                {/* search position */}
                <div className="form-center">
                    <FormRow 
                        type="text" 
                        name="search" 
                        value={localSearch} 
                        onChange={optimizedDebounce}
                    ></FormRow>
                    <FormRowSelect
                        label="Job Status"
                        name="searchStatus"
                        value={searchStatus}
                        onChange={handleSearch}
                        list={["All", ...statusOptions]}
                    ></FormRowSelect>
                    <FormRowSelect
                        label="Job Type"
                        name="searchJobTypes"
                        value={searchJobTypes }
                        onChange={handleSearch}
                        list={["All", ...jobTypeOptions]}
                    ></FormRowSelect>
                    <FormRowSelect
                        label="Sort"
                        name="sort"
                        value={sort}
                        onChange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>

                    <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>
                        clear Filters
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer;