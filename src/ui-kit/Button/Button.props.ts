export interface ButtonProps {
    className: string;
    children?: React.ReactNode;
    type: "submit" | "button" | "reset";
    onClick: () => void
}