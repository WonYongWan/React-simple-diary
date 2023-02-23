import React from 'react';

const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSelected}) => {
  return (
    // isSelected ? `emotionItem_on_${emotion_id}` : `emotionItem_off`].join(" ")을 통해 탭 메뉴 처럼 만들 수 있다.
    <div onClick={() => onClick(emotion_id)} className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(" ")}>
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default React.memo(EmotionItem);