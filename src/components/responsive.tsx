import React from 'react'

const Responsive = () => {
    const sizes = {
        xs: "xs",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl"
    }
    return (
        <div>
            {
                Object.keys(sizes).map((size, index) => {
                    return size !== "xs" ? <div key={index} className={`w-12 h-12 text-sm px-4   py-2 flex-center fixed rounded-full bg-black border-white border bottom-10 left-10 text-white hidden ${size}:block`}>
                        <p>{size}</p>
                    </div> : <div key={index} className={`px-3 py-2 flex-center fixed rounded-full bg-black border-white border bottom-10 left-10 text-white sm:hidden`}>
                        <p>{size}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Responsive