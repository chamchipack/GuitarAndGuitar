import {atom} from 'recoil';

type userData = {
    age: string,
    checktime: string,
    createdAt: string,
    day1: string,
    day2: string,
    gender: string,
    id: Number,
    phonenumber: string,
    updatedAt: string,
    username: string,
    position:string,
    signupday : string,
}

const detail = atom<userData>({
    key : 'detail',
    default : {
        age: 'string',
        checktime: 'string',
        createdAt: 'string',
        day1: 'string',
        day2: 'string',
        gender: 'string',
        id: 0,
        phonenumber: 'string',
        updatedAt: 'string',
        username: 'string',
        position : 'string',
        signupday : 'string'
    },
});

const modalToggle = atom<boolean>({
    key : 'toggle',
    default : false
})

export {detail, modalToggle}