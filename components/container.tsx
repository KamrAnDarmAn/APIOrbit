import React from 'react'

interface ContainerProps {
    children: React.ReactNode
    name?: string
}

const Container = ({ children }: ContainerProps) => {
    return (
        React.Children.map(children, child => (
            React.isValidElement(child) ? React.cloneElement(child, { name: 'kamran' } as Partial<unknown>) : child

        ))
    )
}

export default Container