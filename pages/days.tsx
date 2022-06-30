import Modal from '../components/Modal'
import { useEffect, useState } from "react"
import Listcss from '../styles/List.module.css'
import { useRouter } from "next/router"
import { detail } from "../recoil/states"
import { modalToggle } from "../recoil/states"
import { useRecoilState } from "recoil"
import {Userdata} from './listpage'
import style from 'styled-jsx/css'

const btnStyle = style`
    button:hover{
        background : orange;
    }
`
interface Apis {
    daydata : [],
    daydata2 : [],
    msg : string,
    result : boolean
}

const Days = () : JSX.Element=> {
    const ApiUrl = process.env.NEXT_PUBLIC_BASE_URL
    const router = useRouter();
    const [getDay, setDay] = useState<[]>();
    const sevenDays : string[] = ['일','월','화','수','목','금','토']
    const [getDetail, setDetail] = useRecoilState(detail)
    const [getModal, setModal] = useRecoilState(modalToggle)
    const modalOn = (data : Userdata) => {
        setDetail(data)
        setModal(!getModal)
    }

    const selectDay = (day : string) => {
        const whatDay = day+'요일'
        const currentId = document.cookie.substring(9);
        fetch(`${ApiUrl}/api/daydataserch?day1=${whatDay}&day2=${whatDay}`,{
            method : 'GET',
            mode : 'cors',
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${currentId}`
            }
        })
        .then((response) => 
            response.json()
        )
        .then((data : Apis) => {
            if(data.daydata.length === 0 && data.daydata2.length === 0){
                alert('해당 요일에 수강생이 없습니다')
                return
            }
            if(data.result === false){
                alert('관리자 로그인 후 이용해주세요')
                router.push('/')
            }
            const resultData : [] = [...data.daydata, ...data.daydata2]
            setDay(resultData)
        })
        .catch((error) => {
            console.log(error)
            alert('관리자 로그인 후 이용해주세요')
        })
    }
    
    return (
        <div className={Listcss.mainbox} style={{padding:'20px',background:'linear-gradient(black,white)', height:'93vh'}}>
            <div>
            {
                sevenDays.map((day) => {
                    return(
                        <>
                            <button onClick={()=>{selectDay(day)}} className={Listcss.buttonDesign3}>{day}</button>
                                <style jsx>{btnStyle}</style>
                        </>
                    )
                })
            }
            </div>
                {
                    getDay?.map((data : Userdata) => {
                        return (
                            <>
                                <div onClick={() => { modalOn(data) }} className={Listcss.ul}>
                                    <div className={Listcss.liname}>
                                        <p>{data?.username}</p>
                                    </div>
                                    <div className={Listcss.liage}>
                                        <p>{data?.age}세</p>
                                    </div>
                                    <div className={Listcss.limobile}>
                                        <p>{data?.phonenumber}</p>
                                    </div>

                                </div>
                            </>
                        )
                    })
                }

            {
                getModal
                    ? <div className={Listcss.modalbackground}>
                        <Modal />
                    </div>
                    : null
            }
        </div>
    )
}
// export const getStaticProps = async() => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`)
//     const photos = await res.json();

//     return {
//         props: {
//             photos
//         }
//     }
// }
export default Days