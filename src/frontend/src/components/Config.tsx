import {useState} from "react";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";
import {useNavigate} from 'react-router-dom';
import {Difficulty} from "../../../backend/Difficulty";
import {UserConfig} from "../../../backend/UserConfig";
import {customValidityFromChecks} from "../Utils.ts/customValidityFromChecks";

//TODO: Beim eingeben der Werte für hard und medium sollten jeweils die Fehler abgefangen und Lösungshilfen angeboten werden

export const Config = () => {

    const [difficulty, setDifficulty] = useState<Difficulty>();
    const [bitLength, setBitLength] = useState<number>();
    const navigate = useNavigate();

    const userConfig = {
        "difficulty": difficulty,
        "bitLength": bitLength
    } as UserConfig;

    const difficultyNavigation = {
        [Difficulty.EASY]: "/task/get-keys",
        [Difficulty.MEDIUM]: "/medium",
        [Difficulty.HARD]: "/hard"
    }

    const validation = {
        difficulty: {required: true},
        bitLength: {required: true, minlength: {requiredLength: 5}}
    };

    const validationMessages = {
        difficulty: customValidityFromChecks(difficulty, validation.difficulty),
        bitLength: customValidityFromChecks(bitLength, validation.bitLength)
    };

    const isValidForm : boolean = Object.values(validationMessages).every(x => x === null || x === '');

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
                <select id="difficulty" className="form-select"
                        onChange={(e) => setDifficulty(Difficulty[e.target.value])}
                        onInvalid={(e) => e.target.setCustomValidity(validationMessages[e.target.id])}
                        required>
                    <option value="">Select Difficulty</option>
                    {options.map(renderOption)}
                </select>
                <label htmlFor="bitLength" className="form-label">Enter your bitlength</label>
                <input type="text" placeholder="3-7" id="bitLength" className="form-control"
                       onChange={(e) => {
                           setBitLength(Number.parseInt(e.target.value));
                           e.target.setCustomValidity('');
                           console.log(isValidForm);
                       }}
                       onInvalid={(e) => e.target.setCustomValidity(validationMessages[e.target.id])}
                       required/>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    );
}