import {useEffect} from "react";

export const NavBar = () =>{
    useEffect(() => {
        document.title = 'ALADIN - RSA Verschlüsselung';
    });

    return(
        <div className="container">
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">Home</a>
        </nav>
        </div>
    )
}