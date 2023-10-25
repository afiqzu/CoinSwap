import React from 'react';

const TokenSelect = ({name}) => {
    return (
            <div className='token-select'>
                <img src={`/tokens/${name}.svg`} style={{width: '30px', verticalAlign: 'middle'}}/>
                <p style={{margin:'0 10px 0 0 '}}>
                    {name}
                </p>
            </div>
    );
}

export default TokenSelect;
