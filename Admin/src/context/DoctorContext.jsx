import { createContext } from "react";


export const DoctorContext = createContext()
const DoctorContextProvider = (props)=>{
    const value = {

    }
    return(
        <DoctorContext.Provider>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider