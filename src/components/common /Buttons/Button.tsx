
import './Button.css'
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}


export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
  return (
    <button
      onClick={onClick}
      className={`custom-button ${variant}`}
    >
      {children}
    </button>
  );

}