import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Difficulty} from "../../../backend/rsaCryptography/Difficulty";
import {UserConfig} from "../../../backend/rsaCryptography/UserConfig";
import {hasCommonDivider} from "../../../backend/rsaCryptography/HasCommonDivider";
import {isPrime} from "../../../backend/rsaCryptography/IsPrime";
import {useEffectOnce} from "../utils/useEffectOnce";
import {addCustomValidity, addValidationAttributesToElements} from "../utils/inputValidation/addValidation";
import {validationConstraints} from "../utils/inputValidation/validationConstraints";
import {ConfigHardHelper} from "./ConfigHardHelper";

export const ConfigHard = () => {
    const location = useLocation();

    const userConfig = location.state;
    const [p, setP] = useState<number>(0);
    const [q, setQ] = useState<number>(0);
    const [e, setE] = useState<number>(0);
    const inputs = {
        ...userConfig,
        p,
        q,
        e
    } as UserConfig;
    const navigate = useNavigate();

    /**
     * Containing the validity-checks and the ids of the elements as keys.
     */
    const validationConstraints: Record<string, validationConstraints> = {
        e: {required: true},
        p: {required: true},
        q: {required: true},
    };

    useEffectOnce(() => {
        addValidationAttributesToElements(validationConstraints);
        addCustomValidity(validationConstraints);
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!inputCorrect(inputs)){
            alert("Your input is not correct!\n" +
                "Check you input or consider looking into the solution aids.");
            return;
        }
        navigate("/task/get-keys", {
            state: {
                "bitLength": userConfig.bitLength,
                "e": e,
                "p": p,
                "q": q,
                "difficulty": Difficulty.HARD
            }
        });
    }

    const inputCorrect = (input: UserConfig) =>{
        if(
            input.p &&
            input.q &&
            input.e &&
            isPrime(input.p) &&
            isPrime(input.q) &&
            input.p != input.q &&
            input.bitLength <= input.p.toString(2).length &&
            input.bitLength <= input.q.toString(2).length &&
            !hasCommonDivider(input.e, (input.p - 1) * (input.q -1)) &&
            input.e > 1
        ) return true;
        return false;
    }


    return (
        <div className="container">
            You chose the following Bitlength: {userConfig.bitLength}.
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="p" className="form-label">Choose a suitable value for p!</label>
                <input type="text" placeholder="" id="p" className="form-control"
                       onChange={(e) => setP(Number.parseInt(e.target.value))}/>
                <label htmlFor="q" className="form-label">Choose a suitable value for q!</label>
                <input type="text" placeholder="" id="q" className="form-control"
                       onChange={(e) => setQ(Number.parseInt(e.target.value))} />
                <label htmlFor="e" className="form-label">Choose a suitable value for e!</label>
                <input type="text" placeholder="" id="e" className="form-control"
                       onChange={(e) => setE(Number.parseInt(e.target.value))} />
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            <ConfigHardHelper bitLength={userConfig.bitLength}/>
        </div>
    )
}