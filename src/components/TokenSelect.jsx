import React from "react";
import "../styles/TokenSelect.css";

const TokenSelect = ({ name, onClick, isInputSelected, isOutputSelected }) => {
    const getBackground = () => {
        if (isInputSelected) return "#444444"; // color for input token
        if (isOutputSelected) return "#444444"; // color for output token
        return "#171717"; // default background color
    };
    return (
        <div
            className="token-select"
            style={{ backgroundColor: getBackground() }}
            onClick={() => onClick(name)}
        >
            <img
                src={`/tokens/${name}.svg`}
                alt={name}
                style={{ width: "30px", verticalAlign: "middle" }}
            />
            <p style={{ margin: "0 10px 0 0 " }}>{name}</p>
        </div>
    );
};

export default TokenSelect;
