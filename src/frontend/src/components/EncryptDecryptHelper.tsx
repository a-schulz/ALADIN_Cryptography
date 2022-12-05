import React, {EffectCallback, useEffect, useState} from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import {useEffectOnce} from "../Utils/useEffectOnce";

export const EncryptDecryptHelper = (props) => {

    const encryptFormula = 'Geheimtext = Klartext^e \\mod  N';
    const decryptFormula = 'Klartext = Geheimtext^d \\mod  N';
    const encryptFormulaApplied = 'Geheimtext = '+ props.textToEncrypt + '^{'+ props.rsa.publicKey.exponent + '} \\mod  '+ props.rsa.publicKey.divisor + '';
    const decryptFormulaApplied = 'Klartext = '+ props.textToDecrypt + '^{'+ props.rsa.privateKey.exponent + '} \\mod  '+ props.rsa.privateKey.divisor + '';

    const addButtonToNav = () => {
        const element = document.createElement("div")
        element.innerHTML = "<button id=\"offcanvascontrol\"class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"offcanvas\"\n" +
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
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1"
                 id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Solution aids</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                    Formular
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body">
                                    <h5>Encryption:</h5>
                                    <BlockMath math={encryptFormula} />
                                    <h5>Decryption:</h5>
                                    <BlockMath math={decryptFormula} />
                                    <h6>Note</h6>
                                    <p>Use the public key for encryption and the private key for decryption.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseTwo">
                                    Formulas applied
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingTwo">
                                <div className="accordion-body">
                                    <h5>Encryption:</h5>
                                    <BlockMath math={encryptFormulaApplied} />
                                    <h5>Decryption:</h5>
                                    <BlockMath math={decryptFormulaApplied} />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseThree">
                                    Solution
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingThree">
                                <div className="accordion-body">
                                    <h5>Encryption:</h5>
                                    <BlockMath math={encryptFormulaApplied + "=" + props.rsa.encode(props.textToEncrypt, props.rsa.publicKey)} />
                                    <h5>Decryption:</h5>
                                    <BlockMath math={decryptFormulaApplied + "=" + props.rsa.decode(props.textToDecrypt)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};