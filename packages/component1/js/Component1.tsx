// Library imports
import React from "react";

// Types
export type Props = {
    children?: React.ReactNode;
    header?: React.ReactNode;
};

export const Component1 = (props: Props) => {
    return (
        <section>
            <header className={!props.header && "no-header"}>
                {props.header != null && props.header}
                <h1>Component1</h1>
            </header>
            <div className="component-content">{props.children}</div>
        </section>
    );
};