import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());
  // 해당 년도와 월를 가져온다. getMonth는 0월부터 시작하므로 + 1을 해줘야 한다.
  const headText =  `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}`;

  useEffect(() => {
    if(diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
  
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0, 23, 59, 59
      ).getTime();
  
      setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  }

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  }

  return (
    <div>
      <MyHeader 
        headText={headText} 
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data}/>
    </div>
  );
}

export default Home;