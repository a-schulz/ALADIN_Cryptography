import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/rsaCryptograpy/Rsa";
import {GetKeysHelper} from "./GetKeysHelper";

export const GetKeys = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userConfig = location.state;
    const rsa = new Rsa({...userConfig});
    rsa.generateDAndSetSteps(rsa.publicKey.exponent, (rsa.p - 1) * (rsa.q - 1));

    interface IUserKeys {
        publicE: number,
        publicN: number,
        privateD: number,
        privateN: number
    }
    const [inputs, setInputs] = useState<IUserKeys>({} as IUserKeys);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = Number.parseInt(event.target.value);
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(rsa);
        if(!inputCorrect(inputs, rsa)){
            alert("Your keys are not correct!\n" +
                "Please check your input.\n" +
                "Consider looking into the solution aids.");
            return;
        }
        navigate("/task/encrypt-decrypt", {state: rsa})
    }
    const inputCorrect = (input: IUserKeys, rsa :Rsa) =>{
        if(input.publicE != rsa.publicKey["exponent"]) return false;
        if(input.privateD != rsa.privateKey["exponent"]) return false;
        if(input.publicN != input.privateN && input.publicN != rsa.publicKey["divisor"]) return false;
        return true;
    }

    return (
        <div className="container">
            <h1>Please calculate the public and private key.</h1>
            p= {rsa.p}, q= {rsa.q}, e= {rsa.publicKey.exponent}
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Enter your public key!</h3>
                <div className="row">
                    <div className="col">
                        <input name="publicE" type="text" className="form-control" placeholder="E" onChange={handleChange} required/>
                    </div>
                    <div className="col">
                        <input name="publicN" type="text" className="form-control" placeholder="N" onChange={handleChange} required/>
                    </div>
                </div>
                <h3>Enter your private key!</h3>
                <div className="row">
                    <div className="col">
                        <input name="privateD" type="text" className="form-control" placeholder="D" onChange={handleChange} required/>
                    </div>
                    <div className="col">
                        <input name="privateN" type="text" className="form-control" placeholder="N" onChange={handleChange} required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            <GetKeysHelper rsa={rsa}></GetKeysHelper>
        </div>
    )
}