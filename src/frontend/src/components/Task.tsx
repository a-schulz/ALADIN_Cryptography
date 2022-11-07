import {IUserConfig} from "../../../backend/RsaParameterSetter";
import {Difficulty} from "../../../config";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/Rsa";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";


//Todo: die Prüfung auf valide Parameter muss noch in der RSA programmiert werden.
/**
 * Hier muss nun noch die weitere Implementierung für die Eingabe der Lösungen erfolgen. Außerdem, werden hier die Lösungshilfen angezeigt.
 */


export const Task = () => {
    const location = useLocation();
    const userConfig = location.state;
    console.log(userConfig);
    //vlt sollt hier auch vorher schon dir Prüfung auf korrekte Parameter vorgenommen werden.
    const rsa = new Rsa({...userConfig});
   rsa.generateDAndSetSteps(rsa.publicKey.exponent, (rsa.p - 1) * (rsa.q -1) );
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(rsa);
    }
    return (
        <div>
            <h1>Please calculate the public and private key.</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/*<label htmlFor="e" className="form-label">Choose a suitable value for e!</label>*/}
                {/*<input type="text" placeholder="" id="e" className="form-control"*/}
                {/*       onChange={(e) => setE(Number.parseInt(e.target.value))}/>*/}
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}