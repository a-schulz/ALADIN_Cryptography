import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export const EncryptDecryptHelper = () => {
    const [collapseState, setCollapseState] = useState(false);

    const showHide = (e : React.FormEvent) =>{
        e.preventDefault();
        setCollapseState(!collapseState);
    }

    return (
        <div className="container">
            <Button
                onClick={() => setCollapseState(!collapseState)}
                aria-controls="example-collapse-text"
                aria-expanded={collapseState}
            >
                click
            </Button>
            <Collapse in={collapseState}>
                <div id="example-collapse-text">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                    labore wes anderson cred nesciunt sapiente ea proident.
                </div>
            </Collapse>
        </div>
    );
};