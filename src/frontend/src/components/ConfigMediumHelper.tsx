import React, {EffectCallback, useEffect, useState} from 'react';
import 'katex/dist/katex.min.css';
// @ts-ignore
import {InlineMath, BlockMath} from 'react-katex';
import {useEffectOnce} from "../utils/useEffectOnce";
import {Rsa} from "../../../backend/rsaCryptography/Rsa";
import {getRandomInt} from "../../../backend/rsaCryptography/GetRandomInt";
import {calculateDividerSet} from "../../../backend/rsaCryptography/HasCommonDivider";

export const ConfigMediumHelper = (props: { p: number, q: number }) => {

    const p = props.p;
    const q = props.q;
    const phi = (p - 1) * (q - 1);
    const dividerSetPhi = calculateDividerSet(phi);
    const possibleE = Rsa.generatePossibleE(p, q);
    const someE = possibleE[getRandomInt(possibleE.length - 1)];
    const dividerSetSomeE = calculateDividerSet(someE);
    const randomInt = dividerSetPhi[getRandomInt(dividerSetPhi.length - 1)] * (getRandomInt(3)+2);
    const dividerSetRandomInt = calculateDividerSet(randomInt);
    const mergedUniqueArray = [...new Set([...dividerSetSomeE, ...dividerSetRandomInt])]

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
                                    How to calculate e?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body">
                                    <h5>Formula:</h5>
                                    <BlockMath math={'GCD(e, \\phi) = 1'}/>
                                    <InlineMath math={"\\phi = (p-1)\\times(q-1)"}/>
                                    <p>E is coprime to <InlineMath
                                        math={"\\phi"}/> and smaller than <InlineMath math={"\\phi"}/>. We can
                                        use the <a href="https://en.wikipedia.org/wiki/Euclidean_algorithm">Euclidean
                                            algorithm</a> to find the greatest common divisor of <InlineMath
                                            math={"\\phi"}/> and e. If the greatest common divisor is 1, we have
                                        found a
                                        valid e.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingFormulaApplied">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseFormulaApplied" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseFormulaApplied">
                                    Formulas applied
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseFormulaApplied" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingFormulaApplied">
                                <div className="accordion-body">
                                    <h5>Formula:</h5>
                                    <BlockMath math={'GCD(e, ' + phi + ') = 1'}/>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingGcdUsingDividerSet">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseGcdUsingDividerSet" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseGcdUsingDividerSet">
                                    GCD using divider set
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseGcdUsingDividerSet" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingGcdUsingDividerSet">
                                <div className="accordion-body">
                                    <h5>Divider set of <InlineMath math={"\\phi = " + phi}/>:</h5>
                                    T = {"{"}
                                    {
                                        dividerSetPhi.map((item: number, index: number) => {
                                        if (index != dividerSetPhi.length - 1 && mergedUniqueArray.includes(item)) {
                                            return <span><span className="highligt-string">{item}</span>, </span>
                                        }
                                        if (mergedUniqueArray.includes(item)) {
                                                return <span className="highligt-string">{item}</span>
                                            }
                                        if (index != dividerSetPhi.length - 1) {
                                            return item + ", ";
                                        }
                                        return item;
                                    })}
                                    {"}"}
                                    <h6>Example values:</h6>
                                    <p>Divider set of {randomInt}<br></br>
                                        T = {"{"}
                                        {dividerSetRandomInt.map((item: number, index: number) => {
                                            if (index != dividerSetRandomInt.length - 1 && dividerSetPhi.includes(item)) {
                                                return <span><span className="highligt-string">{item}</span>, </span>
                                            }
                                            if (dividerSetPhi.includes(item)) {
                                                return <span className="highligt-string">{item}</span>
                                            }
                                            if (index != dividerSetRandomInt.length - 1) {
                                                return item + ", ";
                                            }
                                            return item;
                                        })}
                                        {"}"}
                                    </p>
                                    <p>Divider set of {someE}:<br></br>
                                        T = {"{"}
                                        {dividerSetSomeE.map((item: number, index: number) => {
                                            if (index != dividerSetSomeE.length - 1 && dividerSetPhi.includes(item)) {
                                                return <span><span className="highligt-string">{item}</span>, </span>
                                            }
                                            if (dividerSetPhi.includes(item)) {
                                                return <span className="highligt-string">{item}</span>
                                            }
                                            if (dividerSetRandomInt.includes(item)) {
                                                return <span className="highligt-string">{item}</span>
                                            }
                                            if (index != dividerSetSomeE.length - 1) {
                                                return item + ", ";
                                            }
                                            return item;
                                        })}
                                        {"}"}
                                    </p>
                                    As soon as there are several equal elements between the divider sets they have a GCD other than 1.
                                    These value cannot be used as e.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingPossibleE">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapsePossibleE" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapsePossibleE">
                                    Possible values for e are:
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapsePossibleE" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingPossibleE">
                                <div className="accordion-body">
                                    {
                                        "[" + Rsa.generatePossibleE(p, q).join(", ") + "]"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};