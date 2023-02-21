import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {

  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  // path variable의 정보를 확인할 수 있다.
  const { id } = useParams();
  // 바로 부모가 아닌 조상의 데이터도 받을 수 있다.
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      // 아이템이 없을 경우 홈으로 되롤리기 위한 로직
      if(targetDiary) {
        setOriginData(targetDiary);
      } else {
        //  replace: true는 뒤로가기를 방지한다.
        navigate('/', { replace: true });
      }
      console.log(targetDiary)
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit;