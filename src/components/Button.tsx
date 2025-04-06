import "./Button.css"


// props 타입 정의
interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({text, onClick}) => {
    return <div className="button">
          <button onClick= {onClick}> {text} </button>
    </div>
  
}

export default Button;