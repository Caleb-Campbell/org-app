export const SimpleInput = ({ label, value, onChange, placeholder, type = "text" }:
{label: string
value: string
placeholder: string
onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
type?: string}
) => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type={type} placeholder={placeholder} className="input input-bordered w-full max-w-xs" />
        </div>
    )}