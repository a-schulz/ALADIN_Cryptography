import {IUserConfig} from "../../../backend/RsaParameterSetter";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";
import {Difficulty} from "../../../backend/Difficulty";

export const ConfigHard = () => {
    const location = useLocation();

    const userConfig = location.state;
    const [p, setP] = useState<number>(0);
    const [q, setQ] = useState<number>(0);
    const [e, setE] = useState<number>(0);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
    return (
        <div>You chose the following Bitlength: {userConfig.bitLength}.
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="p" className="form-label">Choose a suitable value for p!</label>
                <input type="text" placeholder="" id="p" className="form-control"
                       onChange={(e) => setP(Number.parseInt(e.target.value))}/>
                <label htmlFor="q" className="form-label">Choose a suitable value for q!</label>
                <input type="text" placeholder="" id="q" className="form-control"
                       onChange={(e) => setQ(Number.parseInt(e.target.value))}/>
                <label htmlFor="e" className="form-label">Choose a suitable value for e!</label>
                <input type="text" placeholder="" id="e" className="form-control"
                       onChange={(e) => setE(Number.parseInt(e.target.value))}/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}