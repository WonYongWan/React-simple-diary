import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App'
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({isEdit, originData}) => {

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const {onCreate, onEdit} = useContext(DiaryDispatchContext);

  // 감정을 클릭했을때 감정 값을 가져오는 함수
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  }

  const navigate = useNavigate();
  // 작성완료 클릭 기능 함수
  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    } 

    if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      if(!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id ,date, content, emotion)
      }
    }
    // 작성중인 페이지를 뒤로가기를 해서 못 오도록 막기 위해 옵션으로 { replace: true }를 넣었다.
    navigate('/', { replace: true });
  }

  useEffect(() => {
    if(isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      {/* navigate(-1)은 1페이지 뒤로가기가 가능 */}
      <MyHeader headText={isEdit ? "일기 수정하기" : "새 일기쓰기"} leftChild={<MyButton onClick={() => navigate(-1)} text={"< 뒤로가기"} />}/>
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