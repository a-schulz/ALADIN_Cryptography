import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/Rsa";
import {getRandomInt} from "../../../backend/GetRandomInt";
import {EncryptDecryptHelper} from "./EncryptDecryptHelper";
import {useEffectOnce} from "../Utils/useEffectOnce";

export const EncryptDecrypt = () => {
    // import('random-word-by-length')
    const randomWord = (length: number) => {
        return "dummy";
    }
    const location = useLocation();
    const navigate = useNavigate();
    const rsa = new Rsa(location.state._rsaConfig);
    const [numberToEncrypt, setNumberToEncrypt] = useState(getRandomInt(20));
    const [numberToDecrypt, setNumberToDecrypt] = useState(getRandomInt(20));
    const [textToEncrypt, setTextToEncrypt] = useState(randomWord(6));
    const [textToDecrypt, setTextToDecrypt] = useState(randomWord(6));
    const [inputs, setInputs] = useState({
        chiffrat: 0,
        plainText: 0
    });

    useEffectOnce(() => {

        const fetchJson = async (url: string, init = {}) => {
            const res = await fetch(url, init);
            if (!res.ok) {
                throw new Error(`${res.status}: ${await res.text()}`);
            }
            return res.json();
        }

        const setWords = async () => {
            const data = await fetchJson("https://random-word-api.herokuapp.com/word?number=2&length=6");
            setTextToEncrypt(data[0].toLowerCase());
            setTextToDecrypt(data[1].toLowerCase());
        }
        setWords()
    });


    // true if text should be used
    const [encryptText, setEncryptText] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        const value = event.target.type === "number" ? Number.parseInt(event.target.value) : event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(textToEncrypt)
        if (rsa.encode(numberToEncrypt, rsa.publicKey) == inputs.chiffrat && rsa.decode(numberToDecrypt) == inputs.plainText) {
            alert("Correct")
        } else {
            alert("Wrong");

        }
    }

    return (
        <div className="container">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                       onClick={(e) => {
                           setEncryptText(e.target.checked);
                       }}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">I want to encrypt text.</label>
            </div>
            <h1>Encryption - Decryption</h1>
            <div className="card">
                <div className="card-body">
                    <h5>Here are your Keys!</h5>
                    <p>Public key: e= {rsa._publicKey["exponent"]}, n= {rsa._publicKey["divisor"]}</p>
                    <p>Private key: d= {rsa.privateKey["exponent"]}, n= {rsa.privateKey["divisor"]}</p>
                </div>
            </div>
            <div id="encryptText" style={{display: (encryptText) ? "block" : "none"}}>
                <h4>Encrypting/Decrypting text</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>You want to send your friend the following message: "{textToEncrypt}". Please encrypt it.</h3>
                    <input type="number" placeholder="Enter your solution..." id="chiffrat" className="form-control"
                           onChange={handleChange} required/>

                    <h3>You got the following message: "{textToDecrypt}". Decrypt it.</h3>
                    <input type="number" placeholder="Enter the original message..." id="plainText"
                           className="form-control"
                           onChange={handleChange} required/>
                    <button type="submit" className="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Submit
                    </button>
                </form>
            </div>
            <div id="encryptNumberic" style={{display: (!encryptText) ? "block" : "none"}}>
                <h4>Encrypting/Decrypting numbers</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>You want to send your friend the following message: "{numberToEncrypt}". Please encrypt it.</h3>
                    <input type="number" placeholder="Enter your solution..." id="chiffrat" className="form-control"
                           onChange={handleChange} required/>

                    <h3>You got the following message: "{numberToDecrypt}". Decrypt it.</h3>
                    <input type="number" placeholder="Enter the original message..." id="plainText"
                           className="form-control"
                           onChange={handleChange} required/>
                    <button type="submit" className="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Submit
                    </button>
                </form>
            </div>
            <EncryptDecryptHelper textToEncrypt={numberToEncrypt} textToDecrypt={numberToDecrypt}
                                  rsa={rsa}></EncryptDecryptHelper>
        </div>
    )
}