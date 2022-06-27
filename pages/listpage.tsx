import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { detail } from "../recoil/states"
import { modalToggle } from "../recoil/states"
import HeadInfo from "../components/HeadInfo"
import Listcss from '../styles/List.module.css'
import Modal from '../components/Modal'

export type Userdata = {
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
    position : string,
    signupday : string
}
export interface Apis{
    alldata : [],
    msg : string,
    result : boolean
}
export interface Apione extends Apis{
    msg : string,
    onedata : Userdata,
    result : boolean
}

const Listpage = () => {
    const router = useRouter()
    const nameFind = useRef<HTMLInputElement>(null);
    const [getList, setList] = useState<Userdata[]>();
    const [getDetail, setDetail] = useRecoilState(detail)
    const [getModal, setModal] = useRecoilState(modalToggle)

    const modalOn = (data : Userdata) : void => {
            setDetail(data)
            setModal(!getModal)
    }
    const searchName = () => {
        const currentId = localStorage.getItem('token')
        if(!currentId){
            alert('관리자 로그인 후 이용해주세요')
            router.push('/')
            return
        }
        let whosname : string = ''
        if(null === nameFind.current){
            return null
        }
        whosname = nameFind.current.value
        if(whosname.length < 1){
            alert('이름을 입력해주세요!')
            return
        }
        fetch(`http://localhost:8080/api/namedataserch?username=${whosname}`,{
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
        .then((data : Apione) => {
            const result = data.onedata
            if(data.onedata === null){
                alert('이름을 확인해주세요')
                return
            }
                setList([result])
        })
        .catch((error) => {
            console.log('어디있니')
        })
    }
    
    useEffect(()=>{
        const currentId = localStorage.getItem('token')
        fetch(`https://hwanginho.shop/api/alldataserch?userId=chamchi`,{
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
        .then((data : Apione) => {
            if(data.alldata === null){
                alert('데이터가 없습니다')
                return
            }
            setList(data?.alldata)
    })
        .catch((error) => {
            console.log(error)
        })
    },[])
    return (
        <div className={Listcss.mainbox} style={{boxSizing:'border-box',padding:'30px', background:'linear-gradient(black,white)', height:'93vh'}}>
            <input ref={nameFind} className={Listcss.inputDesign} placeholder='이름 입력'/>
            <button onClick={searchName} className={Listcss.buttonDesign}>찾기</button>
            <div className={Listcss.divBox}>
            {
                getList?.map((data : Userdata) => {
                    return(
                        <>
                         <div onClick={()=>{modalOn(data)}} className={Listcss.ul}>
                            <div className={Listcss.liname}>
                                <p>{data?.username}</p>
                            </div>
                            <div className={Listcss.liage}>
                                <p>{data?.position}</p>
                            </div>
                            <div className={Listcss.limobile}>
                                <p>{data?.phonenumber}</p>
                            </div>
                            <div className={Listcss.limobile}>
                                <p>등록일 : 매달 {data?.signupday}일</p>
                            </div>
                            
                        </div>
                        </>
                    )
                })
            }
            </div>
            {
                getModal
                ? <div className={Listcss.modalbackground}>
                    <Modal/>
                  </div>
                : null
            }
            
        </div>
    )
}

// export const getServerSideProps = async() => {
//   const res = await fetch(`http://localhost:8080/api/loginCheck?userId=chamchi`)
//   const posts = await res.json();
//   console.log(posts)
//   return {
//     props : {
//       posts,
//     }
//   }
// }

export default Listpage