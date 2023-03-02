import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Difficulty} from "../../../backend/rsaCryptography/Difficulty";
import {hasCommonDivider} from "../../../backend/rsaCryptography/HasCommonDivider";
import {validationConstraints} from "../utils/inputValidation/validationConstraints";
import {useEffectOnce} from "../utils/useEffectOnce";
import {addCustomValidity, addValidationAttributesToElements} from "../utils/inputValidation/addValidation";
import {ConfigMediumHelper} from "./ConfigMediumHelper";

export const ConfigMedium = () => {
    const location = useLocation();

    const rsaConfig = location.state;
    const [e, setE] = useState<number>(0);
    const navigate = useNavigate();

    /**
     * Containing the validity-checks and the ids of the elements as keys.
     */
    const validationConstraints: Record<string, validationConstraints> = {
        e: {required: true},
    };

    useEffectOnce(() => {
        addValidationAttributesToElements(validationConstraints);
        addCustomValidity(validationConstraints);
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputCorrect(e)) {
            alert("Your e is not correct!\n" +
                "Check your input or consider looking into the solution aids.");
            return;
        }
        navigate("/task/get-keys", {
            state: {
                "e": e,
                "p": rsaConfig.p,
                "q": rsaConfig.q,
                "difficulty": Difficulty.MEDIUM
            }
        });
    };


    const inputCorrect = (e: number) => {
        if (
            !hasCommonDivider(e, (rsaConfig.p - 1) * (rsaConfig.q - 1)) &&
            e > 1
        ) return true;
        return false;
    }

    return (
        <div className="container">
            You are given p= {rsaConfig.p}, q= {rsaConfig.q}.
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="e" className="form-label">Choose a suitable value for e!</label>
                <input type="text" placeholder="" id="e" className="form-control"
                       onChange={(e) => setE(Number.parseInt(e.target.value))}/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            <ConfigMediumHelper p={rsaConfig.p} q={rsaConfig.q}/>
        </div>

    )
}
