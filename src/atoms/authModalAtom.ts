import { atom } from "recoil";

type authModalState={
    isOpen:boolean,
    type:'login'|'signup'
}

const initialAuthModalState:authModalState={
    isOpen:false,
    type:'login'
}
export const  authModalState=atom<authModalState>({
    key:'authModalState',
    default:initialAuthModalState
})