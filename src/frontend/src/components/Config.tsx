import {useState} from "react";
import {RsaConfigHandler} from "../../../backend/rsaCryptography/RsaConfigHandler";
import {useNavigate} from 'react-router-dom';
import {Difficulty} from "../../../backend/rsaCryptography/Difficulty";
import {UserConfig} from "../../../backend/rsaCryptography/UserConfig";
import {validationConstraints} from "../utils/inputValidation/validationConstraints";
import {addCustomValidity, addValidationAttributesToElements} from "../utils/inputValidation/addValidation";
import {useEffectOnce} from "../utils/useEffectOnce";

export const Config = () => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState<Difficulty>();
    const [bitLength, setBitLength] = useState<number>();
    const options = Object.keys(Difficulty).filter((value: string) => (isNaN(Number.parseInt(value))))
    const userConfig = {
        "difficulty": difficulty,
        "bitLength": bitLength
    } as UserConfig;

    /**
     * Specifies the route regarding which difficulty is selected.
     */
    const difficultyNavigation = {
        [Difficulty.EASY]: "/task/get-keys",
        [Difficulty.MEDIUM]: "/medium",
        [Difficulty.HARD]: "/hard"
    }

    /**
     * Containing the validity-checks and the ids of the elements as keys.
     */
    const validationConstraints: Record<string, validationConstraints> = {
        difficulty: {required: true},
        bitLength: {required: true, min: {requiredValue: 2}, max: {requiredValue: 10}, step: {requiredStep: 2}}
    };

    const renderOption = (text: string) => {
        return <option key={text}>{text}</option>
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const rsaConfig = new RsaConfigHandler(userConfig).getRSAConfig();
        navigate(difficultyNavigation[userConfig.difficulty], {state: rsaConfig});
    }

    useEffectOnce(() => {
        addValidationAttributesToElements(validationConstraints);
        addCustomValidity(validationConstraints);
    })

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
                <label htmlFor="bitLength" className="form-label">Enter your bitlength</label>
                <input type="number" placeholder={validationConstraints.bitLength.min?.requiredValue + " - " + validationConstraints.bitLength.max?.requiredValue} id="bitLength" className="form-control"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           setBitLength(Number.parseInt(e.target.value));
                       }}
                />
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    );
}