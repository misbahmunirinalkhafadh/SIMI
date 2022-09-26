import React from 'react'

import { Button } from '@windmill/react-ui'
import { Tabs } from './Tabs'
import { useHistory } from 'react-router-dom'
import { ArrowLeftIcon } from '../../assets/icons'

function DetailAsset() {
    const history = useHistory();
    return (
        <>
            <div className='mt-5'>
                <Button layout="outline" iconLeft={ArrowLeftIcon} onClick={history.goBack}>Go Back</Button>
            </div>
            <Tabs />
        </>
    )
}

export default DetailAsset