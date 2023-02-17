import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App'
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

// new 페이지와 edit 페이지가 동일하기 때문에 둘 다 사용할 수 있도록 컴포넌트를 독립 시킨다.

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: '완전 좋음'
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: '좋음'
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: '그럭저럭'
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: '나쁨'
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: '끔찍함'
  },
]

// new Date를 사람이 알아볼 수 있는 날짜로 변경
const getStringDate = (date) => {
  // toISOString만 하면 2023-02-17T11:15:59.162Z이 나온다. slice를 통해 2023-02-17까지만 출력될 수 있도록 조정했다.
  return date.toISOString().slice(0, 10);
}

const DiaryEditor = () => {

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const {onCreate} = useContext(DiaryDispatchContext);

  // 감정을 클릭했을때 감정 값을 가져오는 함수
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  }

  const navigate = useNavigate();
  // 작성완료 클릭 기능 함수
  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return
    } 
    onCreate(date, content, emotion);
    // 작성중인 페이지를 뒤로가기를 해서 못 오도록 막기 위해 옵션으로 { replace: true }를 넣었다.
    navigate('/', { replace: true })
  }

  return (
    <div className='DiaryEditor'>
      {/* navigate(-1)은 1페이지 뒤로가기가 가능 */}
      <MyHeader headText={"새 일기쓰기"} leftChild={<MyButton onClick={() => navigate(-1)} text={"< 뒤로가기"} />}/>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input className='input_date' value={date} onChange={(e) => setDate(e.target.value)} type="date" />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {/* isSelected={elm.emotion_id === emotion}는 현재 선택된 감정만 true를 받고 나머지는 false를 받는다. */}
            {emotionList.map((elm) => <EmotionItem key={elm.emotion_id} {...elm} onClick={handleClickEmote} isSelected={elm.emotion_id === emotion} />)}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea placeholder='오늘은 어땠나요' ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton text={'취소하기'} onClick={() => navigate(-1)} />
            <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor;