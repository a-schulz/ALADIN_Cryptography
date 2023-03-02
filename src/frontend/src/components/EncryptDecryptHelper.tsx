import React from 'react';
import 'katex/dist/katex.min.css';
// @ts-ignore
import {InlineMath, BlockMath} from 'react-katex';
import {useEffectOnce} from "../utils/useEffectOnce";
import {Rsa} from "../../../backend/rsaCryptography/Rsa";
import {char2DecimalAscii, string2CharAscii} from "../../../backend/utils/converterFunctions";
import {ascii} from "./Ascii";
import {Link} from "react-router-dom";

export const EncryptDecryptHelper = (props: {
    encryptText: boolean,
    numberToDecrypt: number,
    numberToEncrypt: number,
    rsaNumeric: Rsa,
    rsaString: Rsa,
    textToDecrypt: string,
    textToEncrypt: string,
}) => {

    const encryptFormula = 'Geheimtext = Klartext^e \\mod  N';
    const decryptFormula = 'Klartext = Geheimtext^d \\mod  N';
    const encryptFormulaText = 'Geheimtext = 101^{' + props.rsaString.publicKey.exponent + '}\\mod  ' + props.rsaString.publicKey.divisor + "=" + props.rsaString.encodeNumeric(101, props.rsaString.publicKey);
    const decryptFormulaText = 'Klartext = 101^{' + props.rsaString.privateKey.exponent + '}\\mod ' + props.rsaString.privateKey.divisor + "=" + props.rsaString.decodeNumeric(101);
    const encryptFormulaApplied = 'Geheimtext = ' + props.numberToEncrypt + '^{' + props.rsaNumeric.publicKey.exponent + '} \\mod  ' + props.rsaNumeric.publicKey.divisor + '';
    const decryptFormulaApplied = 'Klartext = ' + props.numberToDecrypt + '^{' + props.rsaNumeric.privateKey.exponent + '} \\mod  ' + props.rsaNumeric.privateKey.divisor + '';

    const addButtonToNav = () => {
        const element = document.createElement("div")
        element.innerHTML = "<button id=\"offcanvascontrol\" class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"offcanvas\"\n" +
            "                    data-bs-target=\"#offcanvasScrolling\" aria-controls=\"offcanvasScrolling\">View solution aids\n" +
            "            </button>";
        document.getElementsByClassName("navbar")[0].appendChild(element);
    }

    useEffectOnce(() => {
            if (!document.getElementById("offcanvascontrol")) {
                addButtonToNav();
            }
        }
    );

    return (
        <div className="container">
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" //tabIndex="-1"
                 id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Solution aids</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div style={{display: props.encryptText ? "block" : "none"}}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingProcessText">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseProcessText" aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseProcessText">
                                        Text encryption
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseProcessText" className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingProcessText">
                                    <div className="accordion-body">
                                        <h5>Process</h5>
                                        <ol>
                                            <li>Convert the text to numbers</li>
                                            <li>Encrypt the numbers</li>
                                            <li>Convert the numbers to text</li>
                                        </ol>
                                        <h5>In detail</h5>
                                        First we need to convert the text to numbers. This is done by using the
                                        <Link to="/ascii" target="_blank" rel="noopener noreferrer"> ASCII table</Link>
                                        <br/>
                                        <br/>
                                        <small>
                                            Keep in mind that the ASCII table only contains 128 characters. So if you
                                            want to encrypt
                                            a text with more characters you need to use a different encoding.
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTextExample">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseTextExample" aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseTextExample">
                                        Example
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTextExample" className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingTextExample">
                                    <div className="accordion-body">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col">Character</th>
                                                <th scope="col">Decimal ASCII</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                string2CharAscii("Test").map((value) => {
                                                    return (
                                                        <tr>
                                                            <td>{value}</td>
                                                            <td>{char2DecimalAscii(value)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                    Formula
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body">
                                    <h5>Encryption:</h5>
                                    <BlockMath math={encryptFormula}/>
                                    <h5>Decryption:</h5>
                                    <BlockMath math={decryptFormula}/>
                                    <h6>Note</h6>
                                    <p>Use the public key for encryption and the private key for decryption.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: props.encryptText ? "block" : "none"}}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFormularsAppliedText">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseFormularsAppliedText"
                                            aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseFormularsAppliedText">
                                        Formulas applied
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseFormularsAppliedText"
                                     className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingFormularsAppliedText">
                                    <div className="accordion-body">
                                        <p>Example character: e</p>
                                        <p>e -{">"}ASCII: 101</p>
                                        <h5>Encryption:</h5>
                                        <BlockMath math={encryptFormulaText}/>
                                        <h5>Decryption:</h5>
                                        <BlockMath math={decryptFormulaText}/>
                                        <h6>Note</h6>
                                        <p>Use the public key for encryption and the private key for decryption.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingSolutionText">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseSolutionText" aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseSolutionText">
                                        Solution
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseSolutionText" className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingSolutionText">
                                    <div className="accordion-body">
                                        <h5>Encryption of {props.textToEncrypt}:</h5>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col">Char</th>
                                                <th scope="col">ASCII</th>
                                                <th scope="col">Encryption</th>
                                                <th scope="col">EncryptedChar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {string2CharAscii(props.textToEncrypt).map((value) => {
                                                return <tr>
                                                    <td>{value}</td>
                                                    <td>{char2DecimalAscii(value)}</td>
                                                    <td>{props.rsaString.encodeNumeric(char2DecimalAscii(value), props.rsaString.publicKey)}</td>
                                                    <td>{ascii[props.rsaString.encodeNumeric(char2DecimalAscii(value), props.rsaString.publicKey)].char}</td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </table>
                                        Result of encryption:
                                        "{props.rsaString.encodeString(props.textToEncrypt, props.rsaString.publicKey)}"
                                        <br/>
                                        <br/>
                                        <h5>Decryption of {props.textToDecrypt}:</h5>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col">Char</th>
                                                <th scope="col">ASCII</th>
                                                <th scope="col">Encryption</th>
                                                <th scope="col">EncryptedChar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {string2CharAscii(props.textToDecrypt).map((value) => {
                                                return <tr>
                                                    <td>{value}
                                                    </td>
                                                    <td>{char2DecimalAscii(value)}</td>
                                                    <td>{props.rsaString.decodeNumeric(char2DecimalAscii(value))}</td>
                                                    <td>{ascii[props.rsaString.decodeNumeric(char2DecimalAscii(value))].char}</td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </table>
                                        Result of encryption: "{props.rsaString.decodeString(props.textToDecrypt)}"

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: !props.encryptText ? "block" : "none"}}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseTwo">
                                        Formulas applied
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingTwo">
                                    <div className="accordion-body">
                                        <h5>Encryption:</h5>
                                        <BlockMath math={encryptFormulaApplied}/>
                                        <h5>Decryption:</h5>
                                        <BlockMath math={decryptFormulaApplied}/>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseThree">
                                        Solution
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingThree">
                                    <div className="accordion-body">
                                        <h5>Encryption:</h5>
                                        <BlockMath
                                            math={encryptFormulaApplied + "=" + props.rsaNumeric.encodeNumeric(props.numberToEncrypt, props.rsaNumeric.publicKey)}/>
                                        <h5>Decryption:</h5>
                                        <BlockMath
                                            math={decryptFormulaApplied + "=" + props.rsaNumeric.decodeNumeric(props.numberToDecrypt)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};