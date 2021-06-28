export const UPDATE_USER = "UPDATE_USER"


export function updateUserInfos(userInfos){
    return {
        type : UPDATE_USER,
        payload: userInfos
    }
}