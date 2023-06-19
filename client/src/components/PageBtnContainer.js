import { useAppContext } from "../context/appContext";
import {HiChevronDoubleLeft , HiChevronDoubleRight} from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () =>{
    const {numOfPages, page, changePage} = useAppContext();

    const pages = Array.from({length: numOfPages}, (_, index)=>{
        return index + 1;
    });
    const prevPage = ()=>{
        if(page <= 1) return;
        changePage(page-1);
    }
    const nextPage = ()=>{
        if(page >= numOfPages) return;
        changePage(page+1); 
    }
    return (
        <Wrapper>
            <button className="prev-btn" onClick={prevPage} disabled={page===1}>
                <HiChevronDoubleLeft />
                prev
            </button>   
            <div className="btn-container">
                {pages.map((pageNum)=>{
                    return (
                        <button 
                            type="button" 
                            className={pageNum===page ? "pageBtn active":"pageBtn"} 
                            key={pageNum}
                             onClick={()=>changePage(pageNum)}
                        >
                            {pageNum}
                        </button> 
                    )
                })}
            </div>
           <button className="next-btn" onClick={nextPage} disabled={page===numOfPages}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer;