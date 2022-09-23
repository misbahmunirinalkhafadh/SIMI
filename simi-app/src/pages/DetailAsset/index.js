import React from 'react'

import { Button } from '@windmill/react-ui'
import { Tabs } from './Tabs'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '../../assets/icons'

function DetailAsset() {
    const { id } = useParams();

    const history = useHistory();
    return (
        <>
            <div className='mt-5'>
                <Button layout="outline" iconLeft={ArrowLeftIcon} onClick={history.goBack}>Go Back</Button>
            </div>
            <h4>{id}</h4>
            <Tabs />
        </>
    )
}

export default DetailAsset