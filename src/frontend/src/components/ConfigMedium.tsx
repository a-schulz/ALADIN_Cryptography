import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Difficulty} from "../../../backend/Difficulty";
import {hasCommonDivider} from "../../../backend/HasCommonDivider";

export const ConfigMedium = () => {
    const location = useLocation();

    const rsaConfig = location.state;
    const [e, setE] = useState<number>(0);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!inputCorrect(e)){
            alert("Your e is not correct!");
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


    const inputCorrect = (e: number) =>{
        if(!hasCommonDivider(e, (rsaConfig.p - 1) * (rsaConfig.q -1) )) return true;
        return false;
    }

    return (
        <div className="container">
            You are given p= {rsaConfig.p}, q= {rsaConfig.q}.
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="e" className="form-label">Choose a suitable value for e!</label>
                <input type="text" placeholder="" id="e" className="form-control"
                       onChange={(e) => setE(Number.parseInt(e.target.value))} required/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}