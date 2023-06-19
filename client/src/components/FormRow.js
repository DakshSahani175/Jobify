
function FormRow({label , name, type, onChange, value, ...rest}){
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{ label || name }</label>
            <input 
                {...rest}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="form-input"
            />
        </div>
    );
}
export default FormRow;