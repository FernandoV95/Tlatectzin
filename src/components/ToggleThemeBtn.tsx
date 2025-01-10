import { Button } from "antd"
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
 
type Props = {
    darkTheme:boolean,
    toggleTheme: React.MouseEventHandler<HTMLElement>;
}


function ToggleThemeBtn({ darkTheme, toggleTheme }:Props) {
    return (
        <div className="toggle-theme-btn">
            <Button onClick={ toggleTheme}>
                {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
            </Button>
        </div>
    )
}

export default ToggleThemeBtn