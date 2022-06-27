import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Border from '../styles/Page.module.css'

const Register = () : JSX.Element => {
    const router = useRouter()
    const [getToken, setToken] = useState<string>('');
    const sevenDays : string[] = ['일','월','화','수','목','금','토']
    const positions : string[] = ['Acoustic', 'Electric', 'Bass','Other']
    const timeTable : string[] = []
    const dateArray : string[] = []
    for(let i = 1; i <= 31; i++){
        dateArray.push(i.toString())
        if(i >= 12 && i <= 22){
            timeTable.push(i.toString())
        }
    }
    useEffect(()=>{
        const currentId = localStorage.getItem('token')
        if(currentId === null){
            alert('로그인 후 이용해주세요')
            router.push('/')
            return
        }
        setToken(currentId)
    },[])
    const day1 = useRef<HTMLSelectElement>(null);
    const day2 = useRef<HTMLSelectElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const age = useRef<HTMLInputElement>(null);
    const gender = useRef<HTMLInputElement>(null);
    const mobile = useRef<HTMLInputElement>(null);
    const time = useRef<HTMLSelectElement>(null);
    const position = useRef<HTMLSelectElement>(null);
    const regDate = useRef<HTMLSelectElement>(null)

    const checkVoid = () => {
        if (null !== name.current && null !== gender.current && null !== mobile.current && null !== day1.current && null !== day2.current) {
            let userCheck = name.current.value
            let genderCheck = gender.current.value
            let mobileCheck = mobile.current.value
            const day1Check = day1.current.value
            const day2Check = day2.current.value

            if (userCheck.length === 0 || genderCheck.length >= 2 ||
                mobileCheck.length > 11) {
                alert('양식을 확인해 주세요')
                return
            }
            if (day1Check === day2Check) {
                alert('현재 등록수강생은 주1회로 등록됩니다.')
                return
            }
        }
    }

    const userRegister = () => {
        if(null !== day2.current){
            let checked : string|null = day2.current.value
            checkVoid()
            if(checkVoid() === null){
            checked = null
            }
            
        if(day1.current === null || name.current === null || time.current === null){
            alert('useRef가 지정되지 않았습니다')
            return
        }
        if(age.current === null || gender.current === null || mobile.current === null){
            alert('useRef가 지정되지 않았습니다')
            return
        }
        if(regDate.current === null || position.current === null){
            alert('useRef가 지정되지 않았습니다')
            return
        }
        const currentId = localStorage.getItem('token')
        fetch(`https://hwanginho.shop/api/userData?userId=chamchi`,{
            method : 'POST',
            mode : 'cors',
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${currentId}`
            },
            body: JSON.stringify({
                day1 : day1.current.value,
                day2 : checked,
                username : name.current.value,
                checktime : time.current.value,
                age : age.current.value,
                gender : gender.current.value,
                phonenumber : mobile.current.value,
                signupday : regDate.current.value,
                position : position.current.value
              })
        })
        .then((response) => 
            response.json()
        )
        .then((data) => {
            alert('등록이 완료되었습니다')
            // router.push('/listpage')
            })
        .catch((error) => {
            console.log(error)
        })
    }

    }
    return(
        <>
        <div style={{padding:'20px',background:'linear-gradient(black,white)', height:'93vh'}} className={Border.mains}>
            <h1 style={{color:'white'}}>수강생 등록하기</h1>
        {
            getToken === null
            ? <div className={Border.mains}>
                <h1>관리자 로그인이 필요합니다</h1>
                </div>
            : <div className={Border.mains}>
                        <div className={Border.void}>
                            <input className={Border.inputDesign} placeholder='이름' ref={name} />
                        </div>
                        <div className={Border.void}>
                            <input className={Border.inputDesignSm} placeholder='나이 ex(29)'  ref={age} />
                            <input className={Border.inputDesignSm} placeholder='성별 ex(여)'  ref={gender} />
                        </div>
                        <div className={Border.void}>
                            <input className={Border.inputDesign} placeholder='연락처 ex(01055350556)'  ref={mobile} />
                        </div>
                        <div className={Border.void}>
                        <select className={Border.selectBox} ref={day1}>
                        {
                            sevenDays.map((day, idx) => {
                                return (
                                         <option key={idx} className={Border.options}>{day}요일</option>
                                )
                            })
                        }
                        </select>
                        <select className={Border.selectBox} ref={day2}>
                        {
                            sevenDays.map((day, idx) => {
                                return (
                                        <option key={idx} className={Border.options}>{day}요일</option>
                                )
                            })
                        }
                        </select>
                        <select className={Border.selectBox} ref={time}>
                        {
                            timeTable.map((timet, idx) => {
                                return (
                                        <option key={idx} className={Border.options}>{timet}:00</option>
                                )
                            })
                        }
                        </select>
                        <div className={Border.void}>
                            <select className={Border.selectBox} ref={position}>
                                {
                                    positions.map((data, idx)=>{
                                        return(
                                        <option key={idx}>{data}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className={Border.selectBox} ref={regDate}>
                                {
                                    dateArray.map((data, idx)=>{
                                        return(
                                        <option key={idx}>{data}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        </div>
                        <div className={Border.void}>
                        <button className={Border.buttonDesign} onClick={userRegister}>저장하기</button>
                        </div>
                        
                    </div>
            
        }
        </div>
        
        </>
    )
}
export default Register