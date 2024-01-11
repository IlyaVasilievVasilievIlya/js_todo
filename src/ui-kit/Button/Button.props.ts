interface ButtonProps {
    className: string;
    text: string;
    type: "submit" | "button" | "reset";
    onClick: () => void
}