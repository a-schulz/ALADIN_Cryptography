import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/rsaCryptography/Rsa";
import {GetKeysHelper} from "./GetKeysHelper";
import {useEffectOnce} from "../utils/useEffectOnce";
import {addCustomValidity, addValidationAttributesToElements} from "../utils/inputValidation/addValidation";
import {validationConstraints} from "../utils/inputValidation/validationConstraints";

interface UserKeys {
    publicE: number,
    publicN: number,
    privateD: number,
    privateN: number
}


export const GetKeys = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userConfig = location.state;
    const rsa = new Rsa({...userConfig});
    rsa.generateDAndSetSteps(rsa.publicKey.exponent, (rsa.p - 1) * (rsa.q - 1));

    const validationConstraints: Record<string, validationConstraints> = {
        publicE: {required: true},
        publicN: {required: true},
        privateD: {required: true},
        privateN: {required: true},
    };

    const [inputs, setInputs] = useState<UserKeys>({} as UserKeys);


    useEffectOnce(() => {
        addValidationAttributesToElements(validationConstraints);
        addCustomValidity(validationConstraints);
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = Number.parseInt(event.target.value);
        setInputs(values => ({...values, [id]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputCorrect(inputs, rsa)) {
            alert("Your keys are not correct!\n" +
                "Please check your input.\n" +
                "Consider looking into the solution aids.");
            return;
        }
        navigate("/task/encrypt-decrypt", {state: rsa})
    }
    const inputCorrect = (input: UserKeys, rsa: Rsa) => {
        if (input.publicE != rsa.publicKey["exponent"]) return false;
        if (input.privateD != rsa.privateKey["exponent"]) return false;
        if (input.publicN != input.privateN) return false;
        if(input.publicN != rsa.publicKey["divisor"]) return false;
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
                        <input id="publicE" type="text" className="form-control" placeholder="E" onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input id="publicN" type="text" className="form-control" placeholder="N" onChange={handleChange}
                        />
                    </div>
                </div>
                <h3>Enter your private key!</h3>
                <div className="row">
                    <div className="col">
                        <input id="privateD" type="text" className="form-control" placeholder="D"
                               onChange={handleChange}/>
                    </div>
                    <div className="col">
                        <input id="privateN" type="text" className="form-control" placeholder="N"
                               onChange={handleChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            <GetKeysHelper rsa={rsa}></GetKeysHelper>
        </div>
    )
}