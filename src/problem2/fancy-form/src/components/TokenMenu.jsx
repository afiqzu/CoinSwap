import React, { useState } from "react";
import TokenSelect from "./TokenSelect";
import tokens from "../rates.json";
import { Close } from "@mui/icons-material";
import "../styles/TokenMenu.css";

const TokenMenu = ({
  selectedInputToken,
  selectedOutputToken,
  onTokenSelected,
  onClose,
}) => {
  tokens.sort((a, b) => a.currency.localeCompare(b.currency));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter((token) =>
    token.currency.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="dark-overlay">
      <div className="token-menu-container">
        <div className="token-menu-title">
          <p style={{ fontSize: "20px", marginLeft: "3px" }}>Select a token</p>
          <Close sx={{ cursor: "pointer" }} onClick={onClose} />
        </div>

        <div className="token-search-bar">
          <input
            type="text"
            placeholder="Search token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="token-container">
          {filteredTokens.map((token) => (
            <TokenSelect
              key={token.currency}
              name={token.currency}
              isInputSelected={token.currency === selectedInputToken}
              isOutputSelected={token.currency === selectedOutputToken}
              onClick={(name) => {
                onTokenSelected(name);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenMenu;
