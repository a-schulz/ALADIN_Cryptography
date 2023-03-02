import React, {EffectCallback, useEffect, useState} from 'react';
import {ExtEuclidAlgo} from "../../../backend/rsaCryptography/ExtEuclidAlgo";
// @ts-ignore
import {InlineMath, BlockMath} from 'react-katex';
import {useEffectOnce} from "../utils/useEffectOnce";
import {Rsa} from "../../../backend/rsaCryptography/Rsa";
export const GetKeysHelper = (props: {rsa:Rsa}) => {

    const rsa = props.rsa;
    let formulaD = "";
    if(rsa.calculatingSteps[0].x && rsa.calculatingSteps[0].x < 0){
        formulaD =  "D = " + rsa.calculatingSteps[0].phi + rsa.calculatingSteps[0].x + "=" + (rsa.calculatingSteps[0].phi + rsa.calculatingSteps[0].x);
    }else{
        formulaD ="D = " + rsa.calculatingSteps[0].x;
        }

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
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" //tabIndex="-1"
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
                                    How to basic
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body">
                                    <h5>How to calculate N?</h5>
                                    Here is the Formular:
                                    <BlockMath math={"N = p \\times q"}></BlockMath>
                                    <h5>How to calculate D?</h5>
                                    -{'>'} Use the extended Euclidic-Algorithm!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingEuclidicAlgo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseEuclidicAlgo" aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseEuclidicAlgo">
                                        How to Euclidic-Algorithm
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseEuclidicAlgo" className="accordion-collapse collapse"
                                     aria-labelledby="panelsStayOpen-headingEuclidicAlgo">
                                    <div className="accordion-body">
                                        <h5>This is the table for the Euclidic-Algorithm</h5>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                            <tr key={0}>
                                                <th scope="col">i</th>
                                                {
                                                    Object.keys(rsa.calculatingSteps[0]).map((key: string, index: number) => {
                                                        if(index == 1) return <th scope="col"><InlineMath math={"\\phi"}/>(phi)</th>
                                                        if(index > 3) return;
                                                        return (
                                                            <th scope="col">{key}</th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                rsa.calculatingSteps.map((row: ExtEuclidAlgo, index: number) => {
                                                    return (
                                                        <tr key={index+1} style={{textAlign: "center"}}>
                                                            <td>{index+1}</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        <h6>What is?</h6>
                                        <p><InlineMath math={"\\phi = (p-1) \\times (q-1)"}></InlineMath></p>
                                        <p><InlineMath math={"q = \\lfloor e \\div \\phi \\rfloor"}></InlineMath>
                                            <small>(q ={'>'} whole result of the integer division, not the q we used to calculate N)</small></p>
                                        <p><InlineMath math={"r = e \\mod \\phi"}></InlineMath></p>
                                        <h5>Do the following steps:</h5>
                                        <ol className="list-group list-group-numbered">
                                            <li className="list-group-item">
                                                Fill in the initial state for e and <InlineMath math={"\\phi"}/> using the blank value and the formula from above.
                                            </li>
                                            <li className="list-group-item">
                                                Divide e by <InlineMath math={"\\phi"}/> and fill in the values for q and r.<br/>
                                                View the formula from above.
                                            </li>
                                            <li className="list-group-item">
                                                Now fill in e and <InlineMath math={"\\phi"}/> using the following formulas:
                                                <p><InlineMath math={"e_i = \\phi_{i-1}"}/></p>
                                                <p><InlineMath math={"\\phi_i = r_{i-1}"}/></p>
                                            </li>
                                            <li className="list-group-item">
                                            Repeate step 2. to 4. until <InlineMath math={"r = 0"}/>
                                            </li>
                                        </ol>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="accordion-item">*/}
                        {/*    <h2 className="accordion-header" id="panelsStayOpen-headingInteractiveEuclidicAlgo">*/}
                        {/*        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"*/}
                        {/*                data-bs-target="#panelsStayOpen-collapseInteractiveEuclidicAlgo" aria-expanded="false"*/}
                        {/*                aria-controls="panelsStayOpen-collapseInteractiveEuclidicAlgo">*/}
                        {/*            Interactive Euclidic-Algorithm TODO*/}
                        {/*        </button>*/}
                        {/*    </h2>*/}
                        {/*    <div id="panelsStayOpen-collapseInteractiveEuclidicAlgo" className="accordion-collapse collapse"*/}
                        {/*         aria-labelledby="panelsStayOpen-headingInteractiveEuclidicAlgo">*/}
                        {/*        <div className="accordion-body">*/}
                        {/*            <h5>This is the table for the Euclidic-Algorithm</h5>*/}


                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseTwo">
                                    Solution - Euclidic-Algorithm
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingTwo">
                                <div className="accordion-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr key={0}>
                                            <th scope="col">i</th>
                                            {
                                                Object.keys(rsa.calculatingSteps[0]).map((key: string, index: number) => {
                                                    if(index == 1) return <th scope="col"><InlineMath math={"\\phi"}/>(phi)</th>
                                                    if(index > 3) return;
                                                    return (
                                                        <th scope="col">{key}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rsa.calculatingSteps.map((row: ExtEuclidAlgo, index: number) => {
                                                return (
                                                    <tr key={index+1} style={{textAlign: "center"}}>
                                                        <td>{index+1}</td>
                                                        <td>{row.e}</td>
                                                        <td>{row.phi}</td>
                                                        <td>{row.q}</td>
                                                        <td>{row.r}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    <p>Now you have to do the extended Algorithm.</p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-ExtEuclidicAlgo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-" aria-expanded="false"
                                        aria-controls="panelsStayOpen-">
                                    How to - Extended Euclidic-Algorithm
                                </button>
                            </h2>
                            <div id="panelsStayOpen-" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingTwo">
                                <div className="accordion-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr key={0}>
                                            <th scope="col">i</th>
                                            {
                                                Object.keys(rsa.calculatingSteps[0]).map((key: string, index: number) => {
                                                    if(index == 1) return <th scope="col"><InlineMath math={"\\phi"}/>(phi)</th>
                                                    return (
                                                        <th scope="col">{key}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rsa.calculatingSteps.map((row: ExtEuclidAlgo, index: number) => {
                                                if(index == rsa.calculatingSteps.length - 1){
                                                    return(
                                                        <tr key={index+1} style={{textAlign: "center"}}>
                                                            <td>{index+1}</td>
                                                            <td>{row.e}</td>
                                                            <td>{row.phi}</td>
                                                            <td>{row.q}</td>
                                                            <td>{row.r}</td>
                                                            <td>0</td>
                                                            <td>1</td>
                                                        </tr>
                                                    )
                                                }
                                                return (
                                                    <tr key={index+1} style={{textAlign: "center"}}>
                                                        <td>{index+1}</td>
                                                        <td>{row.e}</td>
                                                        <td>{row.phi}</td>
                                                        <td>{row.q}</td>
                                                        <td>{row.r}</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>

                                    <p>Initial values of x=0 and y=1 in the last row. The values above can be calculated using the following formulas:</p>
                                    <BlockMath math={"x_i =  y_{(i+1)},\\ y_i =  x_{(i + 1)} - (q_i \\times y_{(i+1)})"}/>
                                    <p>Now you can work your way up and fill in the missing values using the formulas above.</p>
                                </div>
                            </div>
                        </div>
                        {/*<div className="accordion-item">*/}
                        {/*    <h2 className="accordion-header" id="panelsStayOpen-headingInteractiveExtendedEuclidicAlgo">*/}
                        {/*        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"*/}
                        {/*                data-bs-target="#panelsStayOpen-collapseInteractiveExtendedEuclidicAlgo" aria-expanded="false"*/}
                        {/*                aria-controls="panelsStayOpen-collapseInteractiveExtendedEuclidicAlgo">*/}
                        {/*            Interactive Extended Euclidic-Algorithm TODO*/}
                        {/*        </button>*/}
                        {/*    </h2>*/}
                        {/*    <div id="panelsStayOpen-collapseInteractiveExtendedEuclidicAlgo" className="accordion-collapse collapse"*/}
                        {/*         aria-labelledby="panelsStayOpen-headingInteractiveExtendedEuclidicAlgo">*/}
                        {/*        <div className="accordion-body">*/}
                        {/*            <h5>This is the table for the Euclidic-Algorithm</h5>*/}


                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseThree">
                                    Solution - Extended Euclidic-Algorithm
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingThree">
                                <div className="accordion-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr key={0}>
                                            <th scope="col">i</th>
                                            {
                                                Object.keys(rsa.calculatingSteps[0]).map((key: string, index: number) => {
                                                    if(index == 1) return <th scope="col"><InlineMath math={"\\phi"}/>(phi)</th>
                                                    return (
                                                        <th scope="col">{key}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rsa.calculatingSteps.map((row: ExtEuclidAlgo, index: number) => {
                                                return (
                                                    <tr key={index+1} style={{textAlign: "center"}}>
                                                        <td>{index+1}</td>
                                                        <td>{row.e}</td>
                                                        <td>{row.phi}</td>
                                                        <td>{row.q}</td>
                                                        <td>{row.r}</td>
                                                        <td>{row.x}</td>
                                                        <td>{row.y}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingWhatsD">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseWhatsD" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseWhatsD">
                                    What about D now?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseWhatsD" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingWhatsD">
                                <div className="accordion-body">
                                    <p>Look at the value of <InlineMath math={"x_1"}/> if this value is positive then this is your D! </p>
                                    <p><InlineMath math={"D = x_1"}/></p>
                                    <p>If it is negative than you have to do one more step. </p>
                                    <p><InlineMath math={"D = \\phi_1 + x_1"}/></p>
                                    <h5>The Formula:</h5>
                                    <BlockMath math={"D=\\left\\{\\begin{array}{ll} x_1, & x \\ge 0 \\\\\n" +
                                        "\\phi_1 + x_1, & x<0\\end{array}\\right."}/>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingSolution">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseSolution" aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseSolution">
                                    Complete solution
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseSolution" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingSolution">
                                <div className="accordion-body">
                                    <h5>Final solution:</h5>
                                    <BlockMath math={"E = " + rsa.publicKey.exponent}/>
                                    <BlockMath math={"N = "+ rsa.p + "\\times" + rsa.q+  "=" + rsa.publicKey["divisor"]}/>
                                    <BlockMath math={formulaD}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};