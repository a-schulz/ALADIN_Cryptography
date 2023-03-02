import React from 'react';
import 'katex/dist/katex.min.css';
// @ts-ignore
import {BlockMath, InlineMath} from 'react-katex';
import {useEffectOnce} from "../utils/useEffectOnce";
import {RsaConfigHandler} from "../../../backend/rsaCryptography/RsaConfigHandler";
import {Difficulty} from "../../../backend/rsaCryptography/Difficulty";
import {calculateDividerSet} from "../../../backend/rsaCryptography/HasCommonDivider";
import {Rsa} from "../../../backend/rsaCryptography/Rsa";
import {getRandomInt} from "../../../backend/rsaCryptography/GetRandomInt";

export const ConfigHardHelper = (props: { bitLength: number }) => {

    const bitLength = props.bitLength;
    const rsaConfig = new RsaConfigHandler({bitLength: bitLength, difficulty:Difficulty.EASY }).getRSAConfig();
    const examplePrimeFive: number [][] = [
        [5, 2, 1],
        [5, 3, 2],
        [5, 5, 0]
    ]
    const examplePrimeSix: number [][] = [
        [6, 2, 0],
        [6, 3, 0],
        [6, 5, 1],
        [6, 6, 0]
    ]

    const phi = (rsaConfig.p - 1) * (rsaConfig.q - 1);
    const dividerSetPhi = calculateDividerSet(phi);
    const someE = rsaConfig.e;
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
                            <h2 className="accordion-header" id="panelsStayOpen-headingHowToPQ">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseHowToPQ" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseHowToPQ">
                                    How to calculate p and q?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseHowToPQ" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingHowToPQ">
                                <div className="accordion-body">
                                    The values for p and q muss be prime numbers but they shouldn't be the same!
                                </div>
                            </div>
                        </div>

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
                            <h2 className="accordion-header" id="panelsStayOpen-headingCalculatePrimes">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseCalculatePrimes" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseCalculatePrimes">
                                    How to calculate primes?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseCalculatePrimes" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingCalculatePrimes">
                                <div className="accordion-body">
                                    <p>A prime number can be divided, without a remainder, only by itself and by 1.</p>
                                    <p> Some facts:</p>
                                    <ul>
                                        <li>The only even prime number is 2. All other even numbers can be divided by
                                            2.
                                        </li>
                                        <li>If the sum of a number's digits is a multiple of 3, that number can be
                                            divided by 3.
                                        </li>
                                        <li>No prime number greater than 5 ends in a 5. Any number greater than 5 that
                                            ends in a 5 can be divided by 5.
                                        </li>
                                        <li>Zero and 1 are not considered prime numbers.</li>
                                        <li>Except for 0 and 1, a number is either a prime number or a composite number.
                                            A composite number is defined as any number, greater than 1, that is not
                                            prime.
                                        </li>
                                    </ul>
                                    {/*https://www.factmonster.com/math-science/mathematics/prime-numbers-facts-examples-table-of-all-up-to-1000*/}
                                    <h5>How to calculate primes?</h5>
                                    <p>To prove whether a number is a prime number, first try dividing it by 2, and see
                                        if you get a whole number. If you do, it can't be a prime number. If you don't
                                        get a whole number, next try dividing it by prime numbers less than your number.
                                        The last number you need to try would be <InlineMath
                                            math={"\\sqrt x"}/> with <InlineMath math={"x ="}/>yourNumber.</p>
                                    <p>Further information:
                                        <a
                                            href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes">Sieve of
                                            Eratosthenes</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingExamplePrimes">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseExamplePrimes" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseExamplePrimes">
                                    Example generating primes?
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseExamplePrimes" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingExamplePrimes">
                                <div className="accordion-body">
                                    <h5>Is 5 a prime?</h5>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr key={0}>
                                            <th scope="col">number to test</th>
                                            <th scope="col">prime</th>
                                            <th scope="col">remainder</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            examplePrimeFive.map((row) => {
                                                return <tr>
                                                    {row.map((cell) => <td>{cell}</td>)}
                                                </tr>;
                                            })
                                        }
                                        </tbody>
                                    </table>

                                    <h5>Is 6 a prime?</h5>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr key={0}>
                                            <th scope="col">number to test</th>
                                            <th scope="col">prime</th>
                                            <th scope="col">remainder</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            examplePrimeSix.map((row) => {
                                                return <tr>
                                                    {row.map((cell) => <td>{cell}</td>)}
                                                </tr>;
                                            })
                                        }
                                        </tbody>
                                    </table>

                                    <p>As we can see, six ist not a prime because we have multiple rows where the
                                        remainder is zero. Five on the other hand is a valid prime.</p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingPossibleSolution">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapsePossibleSolution" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapsePossibleSolution">
                                    Possible solution
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapsePossibleSolution" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingPossibleSolution">
                                <div className="accordion-body">
                                    <h5>Solution for p and q:</h5>
                                    <p>p: {rsaConfig.p}</p>
                                    <p>q: {rsaConfig.q}</p>

                                    <h5>Solution for e:</h5>
                                    <p>e: {rsaConfig.e}</p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingCalculatingE">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseCalculatingE" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseCalculatingE">
                                    Calculation e - using divider sets
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseCalculatingE" className="accordion-collapse collapse"
                                 aria-labelledby="panelsStayOpen-headingCalculatingE">
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

                    </div>
                </div>
            </div>
        </div>
    );
};