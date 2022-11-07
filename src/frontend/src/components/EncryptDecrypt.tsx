import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/Rsa";
import {getRandomInt} from "../../../backend/Utils";

//Todo: die Prüfung auf valide Parameter muss noch in der RSA programmiert werden.
//Prüfung sollte schon eher in den jeweiligen Tasks geschehen und evtl dort dann auch gleich Hilfen dazu
/**
 * Hier muss nun noch die weitere Implementierung für die Eingabe der Lösungen erfolgen. Außerdem, werden hier die Lösungshilfen angezeigt.
 */


export const EncryptDecrypt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const rsa = location.state;
    // console.log(rsa);
    const rsa = new Rsa(location.state._rsaConfig);
    const [chiffrat, setChiffrat] = useState<number>(0);
    const [plainText, setPlainText] = useState<number>(0);
    const [inputs, setInputs] = useState({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(rsa.decode(12));
        console.log(rsa._publicKey);
        console.log(inputs);
        // console.log(rsaClass);
    }

    return (
        <div>
            <h1>Encryption - Decryption</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>You want to send your friend the following message: "{getRandomInt(20)}". Please encrypt it. (e= {rsa._publicKey["exponent"]}, n= {rsa._publicKey["divisor"]})</h3>
                {/*<label htmlFor="bitlength" className="form-label">Enter your bitlength</label>*/}
                <input type="text" placeholder="Enter your solution..." id="bitlength" className="form-control"
                       onChange={(e) => setChiffrat(Number.parseInt(e.target.value))}/>

                <h3>You got the following message: "{getRandomInt(20)}". Decrypt it. (d= {rsa.privateKey["exponent"]}, n= {rsa.privateKey["divisor"]})</h3>
                {/*<label htmlFor="bitlength" className="form-label">Enter your bitlength</label>*/}
                <input type="text" placeholder="Enter the original message..." id="bitlength" className="form-control"
                       onChange={(e) => setPlainText(Number.parseInt(e.target.value))}/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}