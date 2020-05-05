/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const PageTitle = props => {
    const { style, label } = props

    return (
        <div className="pageTitle p-3 text-center text-uppercase text-white">
            <Typography
                component="h1"
                variant="h5"
                className="p-3 bg-primary"
                style={{ ...style }}
            >
                {label}
            </Typography>
        </div>
    )
}

PageTitle.defaultProps = {
    style: {},
    label: '',
}

PageTitle.propTypes = {
    style: PropTypes.object,
    label: PropTypes.element,
}
export default PageTitle
