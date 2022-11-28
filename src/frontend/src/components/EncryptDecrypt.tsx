import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/Rsa";
import {getRandomInt} from "../../../backend/GetRandomInt";
import {EncryptDecryptHelper} from "./EncryptDecryptHelper";

//Todo: die Prüfung auf valide Parameter muss noch in der RSA programmiert werden.
//Prüfung sollte schon eher in den jeweiligen Tasks geschehen und evtl dort dann auch gleich Hilfen dazu
/**
 * Hier muss nun noch die weitere Implementierung für die Eingabe der Lösungen erfolgen. Außerdem, werden hier die Lösungshilfen angezeigt.
 */


export const EncryptDecrypt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rsa = new Rsa(location.state._rsaConfig);
    const [textToEncrypt, setTextToEncrypt] = useState(getRandomInt(20));
    const [textToDecrypt, setTextToDecrypt] = useState(getRandomInt(20));
    const [inputs, setInputs] = useState({
        chiffrat: 0,
        plainText: 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        const value = event.target.type === "number"? Number.parseInt(event.target.value): event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (rsa.encode(textToEncrypt, rsa.publicKey) == inputs.chiffrat && rsa.decode(textToDecrypt) == inputs.plainText) {
            alert("Correct")
        } else {
            alert("Wrong");

        }
    }

    return (
        <div className="container">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">I want to encrypt text.</label>
            </div>
            <h1>Encryption - Decryption</h1>
            <div className="container">
                <h3>Here are your Keys!</h3>
                <h5>Public key: e= {rsa._publicKey["exponent"]}, n= {rsa._publicKey["divisor"]}</h5>
                <h5>Private key: d= {rsa.privateKey["exponent"]}, n= {rsa.privateKey["divisor"]}</h5>

            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>You want to send your friend the following message: "{textToEncrypt}". Please encrypt it.</h3>
                <input type="number" placeholder="Enter your solution..." id="chiffrat" className="form-control"
                       onChange={handleChange} required/>

                <h3>You got the following message: "{textToDecrypt}". Decrypt it.</h3>
                <input type="number" placeholder="Enter the original message..." id="plainText" className="form-control"
                       onChange={handleChange} required/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            <EncryptDecryptHelper textToEncrypt={textToEncrypt} textToDecrypt={textToDecrypt} rsa={rsa}></EncryptDecryptHelper>
        </div>
    )
}