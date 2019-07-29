// Library imports
import React from "react";
import {Component1} from "../../component1/js/Component1";

// Types
export type Props = {};

export const Component2 = (props: Props) => {
    return (
        <section>
            <header>
                <h1>Component2</h1>
            </header>
            <div className="component-content">
                <Component1/>
            </div>
        </section>
    );
};