import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Difficulty} from "../../../backend/Difficulty";
import {UserConfig} from "../../../backend/UserConfig";
import {hasCommonDivider} from "../../../backend/HasCommonDivider";

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
    }
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!inputCorrect(inputs)){
            alert("Your input is not correct!");
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
        if(input.bitLength > input.p.toString(2).length) return false;
        if(input.bitLength > input.q.toString(2).length) return false;
        if(input.p == input.q) return false;
        if(hasCommonDivider(input.e, (input.p - 1) * (input.q -1) )) return false;
        return true;
    }


    return (
        <div className="container">
            You chose the following Bitlength: {userConfig.bitLength}.
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="p" className="form-label">Choose a suitable value for p!</label>
                <input type="text" placeholder="" id="p" className="form-control"
                       onChange={(e) => setP(Number.parseInt(e.target.value))} required/>
                <label htmlFor="q" className="form-label">Choose a suitable value for q!</label>
                <input type="text" placeholder="" id="q" className="form-control"
                       onChange={(e) => setQ(Number.parseInt(e.target.value))} required />
                <label htmlFor="e" className="form-label">Choose a suitable value for e!</label>
                <input type="text" placeholder="" id="e" className="form-control"
                       onChange={(e) => setE(Number.parseInt(e.target.value))} required />
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}