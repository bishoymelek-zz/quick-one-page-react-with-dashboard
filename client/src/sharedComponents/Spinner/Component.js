import React from 'react';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

const spinner = (props) => {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    top:37%;
`;
    if (props.loading)
        return (
            <div className="spinnerContainer">
                <RingLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                />
            </div>
        )
    else return null
}

export default spinner;
