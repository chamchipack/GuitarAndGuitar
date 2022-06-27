import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import HeadInfo from '../components/HeadInfo'
import PageCss from '../styles/Page.module.css'

interface Apis{
  loginToken : string,
  result : boolean
}


export default function Home ():JSX.Element{
  const router = useRouter()
  const [getToken, setToken] = useState<string>('');

  useEffect(()=>{
    const currentId = localStorage.getItem('token')
    if(currentId !== null){
      setToken(currentId)
    }
  },[])

  const adminId = useRef<HTMLInputElement>(null);
  const adminPw = useRef<HTMLInputElement>(null);

  const login = async () => {
    if(adminId.current === null || adminPw.current === null){
      alert('adminId useRef가 지정되지 않았다')
      return 
    }
    let idValue : string = adminId.current.value;
    let pwValue : string = adminPw.current.value;
    if(idValue.length < 1 || pwValue.length < 1){
      alert('아이디, 비밀번호를 입력해주세요')
      return
    }
    const answer = fetch("https://hwanginho.shop/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: idValue,
        userPw: pwValue,
      })
    })
      .then((response) =>
        response.json() // then 안넘겨도 됩니다.
    )
      .then((data : Apis) => { // interface Apis === toUpperCase()
        console.log(data)
        if(data.result === false){
          alert('아이디와 비밀번호를 확인해주세요')
          return
        }
        if(data.loginToken === null || data.loginToken === undefined){ //early return 가독성, 미리 걷어내기
          alert('토큰을 받아올 수 없습니다')
          return 
        }
        localStorage.setItem('token', data.loginToken)
        router.reload()
      })
      .catch(err => {
        console.log(err)
      })

}
  return (
    <div className={PageCss.backImage}>
      {
        getToken
        ? <div className={PageCss.mainpage}>
          <h1 style={{color:'#eee'}}>안녕하세요 관리자님</h1>
          <button className={PageCss.buttonDesign} onClick={()=>{localStorage.removeItem('token'); router.reload()}}>로그아웃</button>
          </div>
        : <div className={PageCss.mainpage}>
            <div>
              <input type='text' className={PageCss.inputDesign} placeholder='아이디를 입력하세요' ref={adminId} />
            </div>
            <div className={PageCss.void}>
              <input type='password' className={PageCss.inputDesign} placeholder='비밀번호를 입력하세요' ref={adminPw} />
            </div>
            <div>
              <button className={PageCss.buttonDesign} onClick={login}>관리자 로그인</button>
            </div>
          </div>

      }
      
    </div>
  )
}
// SSR을 사용하는 1번방식
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


// export const getStaticProps = async() => {
//   const res = await fetch(`http://localhost:8080/api/loginCheck?userId=chamchi`)
//   const test = await res.json();
//   const ssd = document.cookie = 'username'

//   return {
//     props : {
//       ssd
//     },
//    revalidate : 5
//   }
// }
