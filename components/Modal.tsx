import Listcss from '../styles/List.module.css'
import Modalcss from '../styles/Modal.module.css'
import { useRecoilState } from "recoil"
import { detail } from "../recoil/states"
import { modalToggle } from "../recoil/states"
import { useRouter } from 'next/router'

type ApiDelete = {
    result : boolean,
    msg : string,
    userdatadelete : number
}

function Modal(){
    const router = useRouter();
    const sevenDays : string[] = ['일','월','화','수','목','금','토']
    const [getItem, setItem] = useRecoilState(detail)
    const [getModal, setModal] = useRecoilState(modalToggle)

    const deleteUser = (username : string) => {
        if(username === null){
            alert('다시 연결해주세요')
            return 
        }
        const check = window.confirm('정말로 삭제하시겠습니까?')
        if(check === false){
            return 
        }
        const currentId = localStorage.getItem('token')
        fetch(`https://hwanginho.shop/api/dataDelete?username=${username}`,{
            method : 'DELETE',
            mode : 'cors',
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${currentId}`
            }
        })
        .then((response) => 
            response.json()
        )
        .then((data : ApiDelete) => {
            if(data.result === true){
                alert('데이터가 삭제되었습니다')
                router.reload();
                return
            }
    })
        .catch((error) => {
            console.log(error)
        })
    }
    
    return(
        <>
            <div className={Listcss.background}>
                <div className={Modalcss.grid}>
                    <p className={Modalcss.word}>{getItem.username}</p>
                    <p className={Modalcss.word2}>{getItem.age}세</p>
                    <button onClick={()=>{deleteUser(getItem.username)}} className={Modalcss.btnDelete}>삭제</button>
                </div>
                <div className={Modalcss.grid}>
                    {
                        sevenDays.map((data, idx) => {
                            if(data === getItem.day1.substring(0,1) || data === getItem.day2.substring(0,1)){
                                return(
                                    <div className={Modalcss.dayboxchanged}>
                                        <p>{data}</p>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={Modalcss.daybox}>
                                        <p>{data}</p>
                                    </div>
                                ) 
                            }
                        })
                    }
                </div>
                <div className={Modalcss.grid}>
                    <p className={Modalcss.word}>{getItem.checktime}</p>
                </div>
                <div className={Modalcss.grid}>
                    <p className={Modalcss.word}>{getItem.position}</p>
                </div>
                <div className={Modalcss.grid}>
                    <p className={Modalcss.word2}>연락처 : {getItem.phonenumber}</p>
                </div>
                
                <div className={Modalcss.grid}>
                    <button onClick={()=>{setModal(!getModal)}} className={Modalcss.btn}>닫기</button>
                    {/* <button onClick={()=>{}} className={Modalcss.btn2}>메모달기</button> */}
                </div>
                
            </div>
        </>
    )
}
export default Modal