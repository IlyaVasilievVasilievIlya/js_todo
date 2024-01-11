
export const Button: React.FC<ButtonProps> = ({type, className, text}: ButtonProps) => {
    return (
        <button type={type} className={className}>{text}</button>
    )
}