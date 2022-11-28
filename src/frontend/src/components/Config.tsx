import {useState} from "react";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";
import {useNavigate} from 'react-router-dom';
import {Difficulty} from "../../../backend/Difficulty";
import {UserConfig} from "../../../backend/UserConfig";
import {customValidityFromChecks} from "../Utils/customValidityFromChecks";
import { ShowErrors } from "../Utils/ShowErrors";
import {validations} from "../Utils/validations";

//TODO: Beim eingeben der Werte für hard und medium sollten jeweils die Fehler abgefangen und Lösungshilfen angeboten werden
//TODO Styling Error messages
export const Config = () => {

    const [submitted, setSubmitted] = useState(false);
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

    const validation:Record<string, validations> = {
        difficulty: {required: true},
        bitLength: {required: true}
        // bitLength: {required: true, minlength: {requiredLength: 5}}
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
        setSubmitted(true);
        if(!isValidForm){
            document.getElementById(Object.keys(validationMessages).filter((key:string)=>(validationMessages[key] != ""))[0]).focus();
            return;
        }
        const rsaConfig = new RsaConfigHandler(userConfig).getRSAConfig();
        navigate(difficultyNavigation[userConfig.difficulty], {state: rsaConfig});
    }

    return (
        <div className="container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Enter your configuration!</h3>
                <label htmlFor="difficulty" className="form-label">Enter your preffered difficulty</label>
                <select id="difficulty" className="form-select"
                        onChange={(e) => {
                            setDifficulty(Difficulty[e.target.value]);
                        }}
                >
                    <option value="">Select Difficulty</option>
                    {options.map(renderOption)}
                </select>
                <ShowErrors value={difficulty} validations={validation.difficulty} display={submitted}></ShowErrors>
                <label htmlFor="bitLength" className="form-label">Enter your bitlength</label>
                <input type="number" placeholder="3-7" id="bitLength" className="form-control"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           setBitLength(Number.parseInt(e.target.value));
                       }}
                       />
                <ShowErrors value={bitLength} validations={validation.bitLength} display={submitted}></ShowErrors>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    );
}