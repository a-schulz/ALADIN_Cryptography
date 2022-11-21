import {useState} from "react";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";
import {AutomaticParameterSetter, IUserConfig} from "../../../backend/RsaParameterSetter";
import {useNavigate} from 'react-router-dom';
import {Difficulty} from "../../../backend/Difficulty";

//TODO: Beim eingeben der Werte für hard und medium sollten jeweils die Fehler abgefangen und Lösungshilfen angeboten werden

export const Config = () => {


    const [difficulty, setDifficulty] = useState<Difficulty>();
    const [bitLength, setBitLength] = useState<number>(0);
    const navigate = useNavigate();

    const userConfig = {
        "difficulty": difficulty,
        "bitLength": bitLength
    } as IUserConfig;

    const difficultyNavigation = {
        [Difficulty.EASY]: "/task/get-keys",
        [Difficulty.MEDIUM]: "/medium",
        [Difficulty.HARD]: "/hard"
    }

    const renderOption = (text: string) => {
        return <option key={text}>{text}</option>
    }

    const options = Object.keys(Difficulty).filter((value: string) => (isNaN(Number.parseInt(value))))


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const rsaConfig = new RsaConfigHandler(userConfig).getRSAConfig();
        navigate(difficultyNavigation[userConfig.difficulty], {state: rsaConfig});
    }

    return (
        <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Enter your configuration!</h3>
            <label htmlFor="difficulty" className="form-label">Enter your preffered difficulty</label>
            <select className="form-select" onChange={(e) => setDifficulty(Difficulty[e.target.value])} required>
                <option value="">Select Difficulty</option>
                {options.map(renderOption)}
            </select>
            <label htmlFor="bitlength" className="form-label">Enter your bitlength</label>
            <input type="text" placeholder="3-7" id="bitlength" className="form-control"
                   onChange={(e) => {setBitLength(Number.parseInt(e.target.value));e.target.setCustomValidity('')}} onInvalid={(e) => e.target.setCustomValidity("Please enter a Bitlength.")} required/>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
        </div>
    );
}