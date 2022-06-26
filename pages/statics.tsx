import HeadInfo from "../components/HeadInfo"
import Pagecss from '../styles/Page.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import {Userdata} from './listpage'
ChartJS.register(ArcElement, Tooltip, Legend);

interface Apis{
    alldata : Userdata[],
    msg : string,
    result : boolean
}

const Statics = () => {
    const [getList, setList] = useState<Number[]>([]);
    const [getArray, setArray] = useState<string[]>([])

    const timeChart = () => {
        const currentId = localStorage.getItem('token')
        fetch(`http://localhost:8080/api/alldataserch?userId=chamchi`,{
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
            if(data === null){
                return 
            }
            let timeArray = [0, 0, 0, 0]
            for(let i = 0; i < data.alldata.length; i++){
                const needed = data.alldata[i].checktime?.substring(0,2)
                const devidedData = parseInt(needed)
                if(devidedData < 15){
                    timeArray[0] += 1;
                } else if(devidedData < 18){
                    timeArray[1] += 1;
                } else if(devidedData < 20){
                    timeArray[2] += 1;
                } else if(devidedData < 23){
                    timeArray[3] += 1;
                }
            }
            setList(timeArray)
            setArray(['12~15시', '15~18시', '18~20시', '20~23시'])
        })
        .catch((error) => {
            alert('일시적인 오류입니다')
            console.log(error)
        })
    }

    const positionChart = ():void => {
        const currentId = localStorage.getItem('token')
        fetch(`http://localhost:8080/api/alldataserch?userId=chamchi`,{
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
            let timeArray = [0, 0, 0, 0]
            for(let i = 0; i < data.alldata.length; i++){
                const devidedData = data.alldata[i].position
                if(devidedData === 'Acoustic'){
                    timeArray[0] += 1;
                } else if(devidedData === 'Bass'){
                    timeArray[1] += 1;
                } else if(devidedData === 'Electric'){
                    timeArray[2] += 1;
                } else if(devidedData === 'Other'){
                    timeArray[3] += 1;
                }
            }
            setList(timeArray)
            setArray(['어쿠스틱', '베이스', '일렉기타', 'others'])
        })
        .catch((error) => {
            alert('일시적인 오류입니다')
            console.log(error)
        })
    }

    const data = {
        labels: getArray,
        datasets: [
          {
            label: '# of Votes',
            data: [getList[0], getList[1], getList[2], getList[3]],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return (
        <div style={{padding:'20px',background:'linear-gradient(black,white)'}}>
            <HeadInfo title='my photos' />
            <div className={Pagecss.mains}>
                <button className={Pagecss.staticChart} onClick={()=>{timeChart()}}>시간대 차트</button>
                <button className={Pagecss.staticChart} onClick={()=>{positionChart()}}>포지션 차트</button>
            </div>
            <div className={Pagecss.chartback}>
                <Pie data={data} />
            </div>
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

export default Statics