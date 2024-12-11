import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const Record = ({
    date, setDate, distance, setDistance, weather, setWeather, pace, setPace, record, postRecord, deleteRecord
}) => {

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "/");
            setDate(formattedDate); 
        } else {
            setDate("");
        }
    };

    return (
        <ul>
            <div className="card1">
            <h3>러닝 기록 등록</h3>
                <div>
                    <div>
                    러닝 일자 : {" "}
                <DatePicker
                    placeholderText="Date"
                    selected={date ? new Date(date.replace(/\//g, "-")) : null}
                    onChange={handleDateChange} 
                    dateFormat="yyyy/MM/dd"
                    isClearable 
                />
                    </div>
                {/* <button onClick={() => console.log(date,distance,weather,pace)}>test</button> */}
                <div>
                러닝 거리<input type="text" placeholder="Distance , KM" value={distance} onChange={(e)=>{setDistance(e.target.value)}}/>
                </div>
                <div>
                날씨<input type="text" placeholder="Weather" value={weather} onChange={(e)=>{setWeather(e.target.value)}}/>
                </div>
                <div>
                페이스<input type="text" placeholder="Pace" value={pace} onChange={(e)=>{setPace(e.target.value)}}/>
                </div>
                </div>
                <div>
                    <button onClick={postRecord}>기록 등록</button>
                </div>
            </div>


            <div className="card2"> 
                <ul>
                    <h3>러닝 기록</h3>
                    {record && record.length > 0 ? (
                        record.map((recordItem, index) => (
                            <li key={index}>
                                <div>러닝 일자 : {recordItem.date}</div>
                                <div>러닝 거리 : {recordItem.distance} KM</div>
                                <div>날씨 : {recordItem.weather}</div>
                                <div>페이스 : {recordItem.pace}</div>
                                <button onClick={()=>{deleteRecord(index)}}>기록 삭제</button>
                            </li>
                        ))
                    ) : (
                        <li><p>사용자의 기록이 존재하지 않습니다.</p></li>
                    )}
                </ul>
            </div>
        </ul>
    );
};
