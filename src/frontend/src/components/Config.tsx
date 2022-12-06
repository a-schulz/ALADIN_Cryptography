import {useEffect, useState} from "react";
import {RsaConfigHandler} from "../../../backend/RsaConfigHandler";
import {useNavigate} from 'react-router-dom';
import {Difficulty} from "../../../backend/Difficulty";
import {UserConfig} from "../../../backend/UserConfig";
import {customValidityFromChecks} from "../Utils/customValidityFromChecks";
import {ShowErrors} from "../Utils/ShowErrors";
import {validations} from "../Utils/validations";
import {addCustomValidity, addValidation} from "../Utils/addValidity";
import {useEffectOnce} from "../Utils/useEffectOnce";

//TODO: Beim eingeben der Werte für hard und medium sollten jeweils die Fehler abgefangen und Lösungshilfen angeboten werden
//TODO .setCustomValidity -> sollte immer den richtigen aktuellen Wert enthalten

export interface ValidationsWithValue {
    validations: validations,
    value?:any
}

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
    const validation: Record<string, validations> = {
        difficulty: {required: true},
        // bitLength: {required: true}
        bitLength: {required: true, minlength: {requiredLength: 5}}
    };


    // TODO: Das wird die neue Strukur sein, dadurch lassen sich die Validierungen komplett automatisieren
    const validationsComplete: Record<string, ValidationsWithValue> = {
        // difficulty: {validations: {required: true}, value: 2},
        difficulty: {validations: {required: true}},
        // bitLength: {validations: {required: true, minlength: {requiredLength: 5}}, value: 5}
        bitLength: {validations: {required: true, minlength: {requiredLength: 5}}}
    }

    const validationMessages = {
        difficulty: customValidityFromChecks(difficulty, validation.difficulty),
        bitLength: customValidityFromChecks(bitLength, validation.bitLength)
    };

    /** Current state of the form.*/
    const isValidForm: boolean = Object.values(validationMessages).every(x => x === null || x === '');

    const renderOption = (text: string) => {
        return <option key={text}>{text}</option>
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidForm) {
            document.getElementById(Object.keys(validationMessages).filter((key: string) => (validationMessages[key] != ""))[0]).focus();
            return;
        }
        const rsaConfig = new RsaConfigHandler(userConfig).getRSAConfig();
        navigate(difficultyNavigation[userConfig.difficulty], {state: rsaConfig});
    }

    useEffectOnce(() => {
        addValidation(validation);
    })

    useEffect(() => {
        addCustomValidity(validationsComplete);
        }
    )

    return (
        <div className="container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Enter your configuration!</h3>
                <label htmlFor="difficulty" className="form-label">Enter your preffered difficulty</label>
                <select id="difficulty" className="form-select"
                        onChange={(e) => {
                            setDifficulty(Difficulty[e.target.value]);
                        }}
                        // onInvalid={(e) => e.target.setCustomValidity(validationMessages[e.target.id])}
                >
                    <option value="">Select Difficulty</option>
                    {options.map(renderOption)}
                </select>
                <label htmlFor="bitLength" className="form-label">Enter your bitlength</label>
                <input type="number" placeholder="3-7" id="bitLength" className="form-control"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           setBitLength(Number.parseInt(e.target.value));
                       }}
                       // onInvalid={(e) => e.target.setCustomValidity(validationMessages[e.target.id])}
                />
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    );
}