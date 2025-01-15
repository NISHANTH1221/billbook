import { AxiosResponse } from "axios"

export const CheckResponseStatus = (response : AxiosResponse) => {
    if(response.status==200){
        return true
    }
    return false
}