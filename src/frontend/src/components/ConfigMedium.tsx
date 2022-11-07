import {IUserConfig} from "../../../backend/RsaParameterSetter";
import {Difficulty} from "../../../config";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";

export const ConfigMedium = () => {
    const location = useLocation();

    const rsaConfig = location.state;
    const [e, setE] = useState<number>(0);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/task", {
            state: {
                "e": e,
                "p": rsaConfig.p,
                "q": rsaConfig.q,
                "difficulty": Difficulty.medium
            }
        });
    };

    return (
        <div>You are given p= {rsaConfig.p}, q= {rsaConfig.q}.
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="e" className="form-label">Choose a suitable value for e!</label>
                <input type="text" placeholder="" id="e" className="form-control"
                       onChange={(e) => setE(Number.parseInt(e.target.value))}/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}