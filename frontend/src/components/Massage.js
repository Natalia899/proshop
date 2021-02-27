import React from 'react'
import { Alert } from 'react-bootstrap'


const Massage = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}
Massage.defaultProps = {
    variant: 'info'
}
export default Massage
