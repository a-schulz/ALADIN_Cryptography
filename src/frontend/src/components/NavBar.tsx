import {useEffect} from "react";

export const NavBar = () =>{
    useEffect(() => {
        document.title = 'ALADIN - RSA Verschlüsselung';
    });

    return(
        <div id="navbar" className="container">
        <nav className="navbar sticky-top navbar-light bg-light" style={{border: "1px solid #b1b1b1", borderRadius: "5px", padding: "5px"}}>
            <a className="navbar-brand" href="/~s82105">ALADIN</a>
        </nav>
        </div>
    )
}