import React from "react";
import './Main.css';
import { Record } from "./components/Record";
// import { Plan } from "./components/Plan";
import "react-datepicker/dist/react-datepicker.css";

const MainPresenter = ({
    signOut, isSign, date, setDate, distance, setDistance, weather,setWeather, pace, setPace,
    setId, setPw, id, pw, userInfo, signIn, setUseId, setUsePw, setName, signUp, name, useId, usePw,
    record, postRecord, deleteRecord
}) => {

    return (
        <div>
            <h1>러닝 기록 관리 웹사이트</h1>
            
            {isSign ? (

                // 회원 사용화면
                <div>
                    {/* <button onClick={()=>{console.log(record)}}>Test</button> */}
                    <div> <p>사용자 정보 : {userInfo.name}</p>
                    <button onClick={signOut}>로그아웃</button></div>
                    <div><Record
                    deleteRecord = {deleteRecord}
                    date = {date}
                    setDate = {setDate}
                    distance={distance}
                    setDistance={setDistance}
                    weather={weather}
                    setWeather={setWeather}
                    pace={pace}
                    setPace={setPace}
                    record={record}
                    postRecord={postRecord}
                    /></div>
                </div>
            ): (

                // 로그인, 회원가입 화면
                <div>
                    <div className="signUpBox">
                        <h2>LogInBox</h2>
                        <div><h4>ID</h4><input type="text" placeholder="ID" value={id} onChange={(e)=>{setId(e.target.value)}}/></div>
                        <div><h4>PassWord</h4><input type="text"placeholder="PassWord" value={pw} onChange={(e)=>{setPw(e.target.value)}}/></div>
                        <div><button onClick={signIn}>로그인</button></div>
                    </div>
                    <div className="signUpBox">
                    <h2>SignUpBox</h2>
                        <div><h4>사용할 ID</h4> <input type="text" placeholder="Insert ID" value={useId} onChange={(e)=>{setUseId(e.target.value)}}/></div>
                        <div><h4>사용할 PW</h4> <input type="text" placeholder="Insert PW" value={usePw} onChange={(e)=>{setUsePw(e.target.value)}}/></div>
                        <div><h4>이름</h4> <input type="text" placeholder="Insert Name" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                        <button onClick={signUp}>회원가입</button>
                    </div>
                    
                </div>
            )}

        </div>
    )
}

export default MainPresenter;