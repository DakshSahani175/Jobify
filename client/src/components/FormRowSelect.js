
const FormRowSelect = ({label, name, value, list, onChange})=>{

    return(
        <div>
            <label htmlFor={name}  className="form-label">
                {label || name}
            </label>
            <select 
                name={name}
                value={value}
                className="form-select"
                onChange={onChange}
            >
                {
                    list.map( (itemValue, index)=>{
                        return (
                            <option key={index} value={itemValue}>
                                {itemValue}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    )
}

export default FormRowSelect;