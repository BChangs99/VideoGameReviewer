import React, {useState } from 'react'
import Login from './Login'
import Register from './Register'
import './main_container.scss'

function Login_Container(){
    const [isLoginActive, setLoginActive] = useState(true);
    const current = isLoginActive? 'Register' : 'Login';
    const currentActive = isLoginActive? "login" : 'register';
    const [classList, setClassList] = useState('right');

    const changeState =() => { 
        if (isLoginActive) {
            setClassList('left');
  
          } else {
            setClassList('right');

          }
          setLoginActive(!isLoginActive);
    }

        return (
            <div>
                <div className="login">
                    <div className="container">
                        {isLoginActive && <Login containerRef={(ref) => current }/> }
                        {!isLoginActive && <Register containerRef={(ref) => current}/>}
                    </div>
                    <RightSide 
                        current={current} 
                        containerRef={(ref) => currentActive } 
                        click={changeState}
                        classList={classList}
                        />
                </div>
            </div>
        )
    

}

const RightSide = props => {
    return <div className={`right-side ${props.classList}`}ref={props.containerRef} onClick={props.click}>
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>

    </div>
} 


export default Login_Container
