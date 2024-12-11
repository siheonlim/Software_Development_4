
import { useState } from "react";
import MainPresenter from "./MainPresenter";

const MainContainer = () => {
    //로그인 state
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    //회원가입 state
    const [useId, setUseId] = useState('')
    const [usePw, setUsePw] = useState('')
    const [name, setName] = useState('')

    //로그인 여부와 로그인한 사용자 state
    const [isSign, setIsSign] = useState(false)
    const [userInfo, setUserInfo] = useState()

    //record 기록 state
    const [date, setDate] = useState("");
    const [distance, setDistance] = useState("")
    const [weather, setWeather] = useState("")
    const [pace, setPace] = useState("")
    const [record, setRecord] = useState([])

    // 기록 가져오기
    const getRecord = async () => {
        if (userInfo?.name) { 
            try {
                const response = await fetch("http://localhost:3333/record/", {
                })
                const data = await response.json();
                if (response.ok) {
                    console.log("user record: ", data)
                    setRecord(data)
                }
            } catch (e) {
                console.error("Error fetching records:", e);
            }
        }
    };

    // 기록 등록 함수
    const postRecord = async () => {
        if(!date) {
            alert("기록 일자를 입력해주세요!");
            return;
        }
        if(!distance) {
            alert("기록 거리를 입력해주세요! KM 단위로 입력하세요!");
            return;
        }
        if(!weather) {
            alert("기록할 날씨를 입력해주세요!");
            return;
        }
        if (!/^[a-zA-Z가-힣\s]+$/.test(weather)) {
            alert("날씨는 문자만 입력해야 합니다! 예: 맑음, 흐림, rainny");
            return;
        }
        if(!pace) {
            alert("기록할 페이스를 입력해주세요!");
            return;
        }
        if (!/^\d+\.\d+$/.test(pace)) {
            alert("페이스는 소수점이 있는 숫자여야 합니다! 예: 4.12, 0.01");
            return;
        }
        try {
            const response = await fetch("http://localhost:3333/record/postrecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date,
                    distance,
                    weather,
                    pace,
                })
            })

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                alert("기록 완료!!")
                setDate(""); 
                setDistance("");
                setWeather("");
                setPace("");
                getRecord()
            }
        } catch (e) {
            console.error("post error", e)
            alert(e)
        }
    }

    //기록 삭제 함수
    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost:3333/record/${id}`, {
                method: "DELETE",
            });
            console.log(id+1)
    
            if (response.ok) {
                // const data = await response.json();
                getRecord()
                alert("기록 삭제 완료!!");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "delete failed");
            }
        } catch (e) {
            console.error("deleteRecord error:", e);
            alert("server error");
        }
    };
    


    //로그인 함수
    const signIn = async () => {
        if (!id) {
            alert("아이디를 입력해주세요!");
            return;
        }
        if (!pw) {
            alert("비밀번호를 입력해주세요!");
            return;
        }
        try {
            const response = await fetch("http://localhost:3333/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    pw,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("환영 합니다!");
                setUserInfo(data.user);
                console.log(data.user)
                setIsSign(true)
                getRecord();
            } else {
                // 로그인 실패 처리
                alert(data.message);
            }
        } catch (e) {
            console.error("login error:", e);
            alert("server error");
        }
    };
    
    //로그아웃 함수
    const signOut = () => {
        setIsSign(false)
        setUserInfo(null)
        setId("")
        setPw("")
        // setRecord(null)
    }

    //회원가입 함수
    const signUp = async () =>{
        if(!useId){
            alert("사용하실 아이디를 입력해주세요!")
            return;
        }
        if(!usePw){
            alert("사용하실 비밀번호를 입력해주세요!")
            return;
        }
        if(!name){
            alert("이름을 입력해주세요!")
            return;
        }
        try{
            const response = await fetch("http://localhost:3333/user/signup",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    useId,
                    usePw,
                    name,
                }),
            });

            const data = await response.json();

            if (response.ok){
                alert("회원가입 완료");
                setUseId("")
                setUsePw("")
                setName("")
                console.log(data.user)
            } else {
                alert(data.message)
            }
        }
        catch(e){
            console.error("signin error:", e)
            alert("server error")
        }
    };




return(
    <MainPresenter
    deleteRecord={deleteRecord}
    postRecord={postRecord}
    isSign={isSign}
    date={date}
    setDate={setDate}
    distance={distance}
    setDistance={setDistance}
    weather={weather}
    setWeather={setWeather}
    pace={pace}
    setPace={setPace}
    setId={setId}
    id={id}
    pw={pw}
    setPw={setPw}
    signIn={signIn}
    userInfo={userInfo}
    signOut={signOut}
    setUseId={setUseId}
    useId={useId}
    setUsePw={setUsePw}
    usePw={usePw}
    setName={setName}
    name={name}
    signUp={signUp}
    record={record}
    />
)
}
export default MainContainer;