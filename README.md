# 목차
[페이지 라우팅 0 - React SPA & CSR](#페이지-라우팅-0---react-spa--csr)<br/>
[페이지 라우팅 1 - React Router 기본](#페이지-라우팅-1---react-router-기본)<br/>
[페이지 라우팅 2 - React Router 응용](#페이지-라우팅-2---react-router-응용)<br/>
[프로젝트 기초 공사 1](#프로젝트-기초-공사-1)<br/>
[프로젝트 기초 공사 2](#프로젝트-기초-공사-2)<br/>
[페이지 구현 - 홈 (/)](#페이지-구현---홈)<br/>
[페이지 구현 - 일기 쓰기 (/new)](#페이지-구현---일기-쓰기-new)<br/>
[페이지 구현 - 일기 수정 (/edit)](#페이지-구현---일기-수정-edit)<br/>
[페이지 구현 - 일기 상세 (/diary)](#페이지-구현---일기-상세-diary)<br/>
[(서브 챕터) 흔히 발생하는 버그 수정 하기](#서브-챕터-흔히-발생하는-버그-수정-하기)<br/>
[LocalStorage를 일기 데이터베이스로 사용하기](#localstorage를-일기-데이터베이스로-사용하기)<br/>
[프로젝트 최적화](#프로젝트-최적화)<br/>
[배포 준비 & 프로젝트 빌드하기](#배포-준비--프로젝트-빌드하기)<br/>
<br/>

# 페이지 라우팅 0 - React SPA & CSR

### ROUTING이란?
어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정

- ROUTER: 데이터의 경로를 실시간으로 지정해주는 역할을 하는 무언가
- ROUTE + ING: 경로를 정해주는 행위 자체와 그런 과정들을 다 포함하여 일컫는 말

### PAGE ROUTING이란?
브라우저가 서버에게 경로를 요청하고 서버는 경로를 찾아 응답한다.

- Multipage Application - MPA(전통적인 방식)
  - 서버가 여러개의 페이지를 가지고 클라이언트가 요청할때마다 요청하는 페이지를 응답하는 방식
  - 화면이 깜빡거림
- Single Page Application - SPA(react)
  - 클라이언트가 경로를 요청해도 서버는 하나의 페이지만을 응답한다.
  - REACT APP이 알아서 페이지를 업데이트 해준다. React는 서버에게 데이터만을 요청하여 전달 받는다.
  - 우선 REACT APP이 웹페이지를 먼저 바꿔버리고 데이터가 없다면 로딩은 잠깐 띄어놓고 데이터가 들어오면 그때 데이터를 보여주는 방식
  - 화면이 깜빡거리지 않음(빠른 페이지 이동)
  - 클라이언트가 직접 렌더링 하는 방식을 Client Side Rendering - CSR이라고 한다.

# 페이지 라우팅 1 - React Router 기본
강의 내용의 npm 설치 코드를 발견하지 못했다.
[React Router](#https://reactrouter.com/en/main)
```
npm install react-router-dom@6
```

```js
import './App.css';
// 아래와 같이 { BrowserRouter, Route, Routes }를 연결해줘야 한다.
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteTest from './components/RouteTest';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function App() {
  // BrowserRouter로 감싸고 Routes로 감싸고 안에 Route를 통해 경로를 만들 수 있다.
  // RouteTest를 불러와 실제 화면에서 클릭할 수 있도록 해주었다.
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/diary" element={<Diary/>} />
        </Routes>
        <RouteTest/>
        {/* 아래와 같은 방식을 사용하면 SPA가 아닌 MPA방식으로 화면이 깜빡거리게 된다. */}
        {/* <a href={"/new"}>NEW로 이동</a> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
```

```js
// SPA를 구현하기 위해서 {Link}를 불러온다.
import {Link} from 'react-router-dom';

const RouteTest = () => {
  // 아래와 같이 Link 사용
  return (
    <>
      <Link to={'/'}>HOME</Link>
      <br/>
      <Link to={'/new'}>NEW</Link>
      <br/>
      <Link to={'/edit'}>EDIT</Link>
      <br/>
      <Link to={'/diary'}>DIARY</Link>
      <br/>
    </>
  )
}

export default RouteTest;
```

# 페이지 라우팅 2 - React Router 응용

### React Router Dom의 유용한 기능

#### REACT ROUTER V6
REACT에서 CSR기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리
1. Path Variable - useParams
2. Query String - useSearchParams
3. Page Moving - useNavigate

### Path Variable
```js
function App() {
  // useParams를 사용하려면 별도의 path설정을 해줘야 한다.
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/diary/:id" element={<Diary/>} />
          {/* 보통은 id가 걸릴 경우와 안걸릴 경우로 나누어 path설정을 해준다. */}
          <Route path="/diary" element={<Diary/>} />
        </Routes>
        <RouteTest/>
      </div>
    </BrowserRouter>
  );
}
```
```js
import { useParams } from "react-router-dom";

const Diary = () => {
  // diary/10이라면 10을 반환한다.
  const {id} = useParams();
  console.log(id)

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 Diary 입니다.</p>
    </div>
  )
}

export default Diary;
```

### Query String
웹 페이지에 데이터를 전달하는 가장 간단한 방법

/edit?id=10&mode=dark => Query String

Query String으로 전달하면 별도의 처리를 안해줘도 자동으로 맵핑이 된다.

useParams와 다르게 useSearchParams는 두개의 인자를 배열로 반환하게 된다.

```js
// 전달한 query srting http://localhost:3000/edit?id=10&mode=dark
import { useSearchParams } from "react-router-dom";

const Edit = () => {
  // searchParams는 get을 통해 전달받은 Query String들을 꺼내 사용할 수 있는 용도.
  // setSearchParams는 searchParams를 변경시키는 기능을 한다. Query String을 바꿀 수 있다는 뜻이다.
  const [searchParams, setSearchParams] = useSearchParams();

  // get메서드를 통해 id를 가져오면 10이 출력된다.
  const id = searchParams.get('id');
  console.log(id);

  // mode는 dark가 출력된다.
  const mode = searchParams.get('mode');
  console.log(mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 Edit 입니다.</p>
      {/* Query String이 ?who=yong로 변경된다. */}
      <button onClick={() => setSearchParams({who:'yong'})}>QS 변경</button>
    </div>
  )
}

export default Edit;
```

### Page Moving
```js
import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // useNavigate는 경로를 옮겨줄 수 있는 함수
  // 사용예시: 로그인이 안된 사용자가 로그인 페이지로 가려고 할때 로그인 값을 검사해서 로그인을 안했다면 로그인페이지로 강제로 보내기
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 Edit 입니다.</p>
      <button onClick={() => setSearchParams({who:'yong'})}>QS 변경</button>
      {/* Link를 사용하지 않고 useNavigate()를 통해 SPA를 구현할 수 있다. */}
      <button onClick={() => {navigate("/home")}}>HOME로 이동</button>
      {/* -1을 넣으면 뒤로가기를 구현할 수 있다. */}
      <button onClick={() => {navigate(-1)}}>뒤로가기</button>
    </div>
  )
}

export default Edit;
```

# 프로젝트 기초 공사 1
react에서 이미지를 불러오는 방법

```js
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function App() {
  // process.env.PUBLIC_URL이 작동하지 않을 경우
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        {/* public 폴더를 가리킨다. */}
        <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`}></img>
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`}></img>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/diary/:id" element={<Diary/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

보통 공통 컴포넌트 생성할때는 components폴더 안에다가 만든다.

```js
// MyButton.js
const MyButton = ({text, type, onClick}) => {
  // 매개변수로 받아온 type가 positive, negative 중 하나면 type를 그대로 반환하고 아니라면 default를 반환한다.
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default'; 

  // 배열에 넣고 join으로 클래스를 뿌린다. 괜찮은 방법이다. 써먹어봐야 한다.
  return (
    <button className={["MyButton", `MyButton_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  )
}

MyButton.defaultProps = {
  type: "default"
}

export default MyButton;
```

```js
// MyHeader.js
const MyHeader = ({headText, leftChild, rightChild}) => {
  // headText, leftChild, rightChild를 props로 전달받아 반환한다.
  return (
    <header>
      <div className="head_btn_left">
        {leftChild}
      </div>
      <div className="head_text">
        {headText}
      </div>
      <div className="head_btn_right">
        {rightChild}
      </div>
    </header>
  )
}

export default MyHeader;
```

```js
// App.js
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// COMPONENTS
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader 
          headText={"App"} 
          leftChild={<MyButton text={'왼쪽 버튼'} onClick={() => alert('왼쪽 버튼')} />} 
          rightChild={<MyButton text={'오른쪽 버튼'} onClick={() => alert('오른쪽 버튼')} />} 
        />
        <h2>App.js</h2>
        <MyButton text={'버튼'} onClick={() => alert("버튼 클릭")} type={'positive'} />
        <MyButton text={'버튼'} onClick={() => alert("버튼 클릭")} type={'negative'} />
        <MyButton text={'버튼'} onClick={() => alert("버튼 클릭")} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/diary/:id" element={<Diary/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

# 프로젝트 기초 공사 2

```js
import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state]
      break;
    }
    case 'REMOVE': {
      newState = state.filter(it => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map(it => it.id === action.data.id ? {...action.data} : it);
      break;
    }
    // break를 하지 않으면 자동으로 default까지 수행됨(return이 없을 경우!)
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", 
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
    dataId.current += 1;
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/new" element={<New/>} />
              <Route path="/edit" element={<Edit/>} />
              <Route path="/diary/:id" element={<Diary/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
```

# 페이지 구현 - 홈 (/)

```js
// Home화면의 전체 틀 구현
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

  // 처음 렌더링 되었을때 curDate로 가져온 현재 날짜를 기준으로 그 달의 첫날부터 마지막 날까지 구한다.  
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
        0
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

  // Header의 다음달 및 이전달로 이동하는 기능
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
```

```js
// Home 화면의 다이어리 필터기능 및 리스트페이지를 구현하는 컴포넌트
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from './MyButton';

const sortOptionList = [
  {value:"lastest", name:"최신순"},
  {value:"oldest", name:"오래된 순"}
]

const filterOptionList = [
  {value:"all", name:"전부 다"},
  {value:"good", name:"좋은 감정만"},
  {value:"bad", name:"안좋은 감정만"},
]

// select와 option들을 구현하는 함수
const ControlMenu = ({value, onChange, optionList}) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
  )
}


const DiaryList = ({diaryList}) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('lastest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {

    const filterCallBack = (item) => {
      if(filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a, b) => {
      if(sortType === 'lastest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  }

  return (
    <div className="DiaryList">
      <div className="manu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton type={'positive'} text={'새 일기쓰기'} onClick={() => navigate('/new')} />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (<DiaryItem key={it.id} {...it} />))}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: []
}

export default DiaryList;
```

```js
// Home 화면의 List 아이템들을 구현하는 컴포넌트
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, emotion, content, date}) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  // toLocaleDateString는 사람이 인식할 수 있는 날짜로 변환해준다.
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  }

  const goEdit = () => {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div onClick={goEdit} className="btn_wrapper">
        <MyButton text={"수정하기"}/>
      </div>
    </div>
  )
}

export default DiaryItem;
```

# 페이지 구현 - 일기 쓰기 (/new)

- 공통으로 묶이는 컴포넌트는 독립 시키는 것이 좋다.
- navigate(-1)은 1페이지 뒤로가기가 가능하다.
- DiaryEditor.js, EmotionItem.js 참조

# 페이지 구현 - 일기 수정 (/edit)

```js
// App.js
// path variable 방식
<Route path="/edit/:id" element={<Edit/>} />
```

```js
// Edit.js
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

  // originData가 true일 경우 true와 originData를 prop으로 전달한다.
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit;
```

```js
// DiaryEditor.js
import { useContext, useEffect, useRef, useState } from 'react';
import MyHeader from './MyHeader';
import MyButton from './MyButton';

const DiaryEditor = ({isEdit, originData}) => {
  // isEdit이 true일 경우 수정 false일 경우 생성
  if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
    if(!isEdit) {
      onCreate(date, content, emotion);
    } else {
      onEdit(originData.id ,date, content, emotion)
    }
  }

  // 수정 페이지에 수정할 데이터 전달
  useEffect(() => {
    if(isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      {/* isEdit가 true일 경우 일기 수정하기 false일 경우 새 일기쓰기 */}
      <MyHeader headText={isEdit ? "일기 수정하기" : "새 일기쓰기"} leftChild={<MyButton onClick={() => navigate(-1)} text={"< 뒤로가기"} />}/>
    </div>
  )
}

export default DiaryEditor;
```

# 페이지 구현 - 일기 상세 (/diary)

공통으로 사용되는 데이터는 util폴더를 만들어 따로 저장했다.

```js
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const Diary = () => {
  
  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if(targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if(!data) {
    return <div className="DiaryPage">로딩중입니다...</div>
  } else {

    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));
    console.log(curEmotionData)

    return (
      <div className="DiaryPage">
        <MyHeader 
          headText={`${getStringDate(new Date(data.date))} 기록`} 
          leftChild={<MyButton text={'<뒤로가기'} onClick={() => navigate(-1)}  />} 
          rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">{curEmotionData.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    ) 
  }
}

export default Diary;
```

# (서브 챕터) 흔히 발생하는 버그 수정 하기

1. Warning: Encountered two children with the same key
  - 더미 데이터를 사용할때 useRef를 제대로 설정하지 않으면 생기는 에러 ex) 더미 id: 1 ~ 5까지 존재. 하지만 useRef로 초기값 0으로 설정 후 1씩 증가. 중복 키 발생

```js
// App.js
// 더미 데이터의 id가 5번까지 존재함
const dataId = useRef(0); // before

const dataId = useRef(6); // after
```

2. 오타 잘 체크할 것! (TS배우는걸 추천)
3. 달의 마지막날 시간 체크할 것! // 아직 0의 의미를 모르겠음

```js
// Home.js
// before는 0시0분0초를 가리킨다.
const lastDay = new Date(
  curDate.getFullYear(),
  curDate.getMonth() + 1,
  0
).getTime(); // before

// after는 23시59분59초를 가리킨다.
const lastDay = new Date(
  curDate.getFullYear(),
  curDate.getMonth() + 1,
  0, 23, 59, 59
).getTime(); // after
```

# LocalStorage를 일기 데이터베이스로 사용하기

- sessitonStorage
  - 웹브라우저가 종료 되면 데이터가 사라진다.
- localStorage를
  - 웹브라우저를 닫고 열어도 데이터가 남아있다. 컴퓨터를 껐다 켜고 남아있음 브라우저 캐시 또는 로컬 저장 데이터를 지우면 사라진다.

```js
// LocalStorage에 데이터 저장하는 방법
useEffect(() => {
  // key: value 형태로 저장
  // 한번 LocalStorage에 저장된 값은 고의적으로 LocalStorage를 비우지 않는 이상 지워지지 않는다.
  // localStorage.setItem('key', 10);를 저장하고 코드를 지워도 'key', 10 데이터는 남아 있는다.
  // 개발자 도구 Application에서 우클릭 Delete로 데이터를 지울 수 있다.
  localStorage.setItem('item1', 10);
  localStorage.setItem('item2', "20");
  localStorage.setItem('item3', JSON.stringify({value:30}));
}, []);
```

```js
// LocalStorage의 데이터를 가져오는 방법
useEffect(() => {
  // ! LocalStorage에 들어가는 값들은 전부 문자열로 바뀌어서 들어간다.
  const item1 = localStorage.getItem('item1');
  const item2 = localStorage.getItem('item2');
  // 온전한 객체 데이터를 가져오려면 JSON.parse()을 사용해야 한다.
  const item3 = JSON.parse(localStorage.getItem('item3'));

  // 객체로 묶어주면 콘솔에서 보기 편함
  console.log({item1, item2, item3});
}, []);
```

```js
// App.js
// 브라우저를 새로고침해도 일기가 삭제되지 않고 LocalStorage로부터 데이터를 받아와 나오는 로직

useEffect(() => {
  // LocalStorage로부터 데이터 받아오기
  const localData = localStorage.getItem('diary');
  // localData가 true일 경우 아이템의 id값을 내림차순으로 정렬
  if(localData) {
    const diaryList = JSON.parse(localData).sort(
      (a, b) => parseInt(b.id) - parseInt(a.id)
    );
    // dataId는 존재하는 가장 큰 id값의 +1을 하여 일기를 새로 작성해도 id가 겹치지 않는다.
    dataId.current = parseInt(diaryList[0].id) + 1;

    dispatch({type: "INIT", data: diaryList});
  }
}, []);
```

# 프로젝트 최적화
프로젝트를 최적화 할때
- 직접 코드 한줄씩 확인하는 정적방법
- 도구를 사용하여 확인하는 동적방법

react의 도구를 사용하는 동적방법은 React developer tool을 활용하면 된다.

월을 변경할때 오래된순, 전부다 핕터와 새일기쓰기 버튼이 리렌더링 된다. 

```js
// DiaryList.js

// onChange매개변수 주목
// useState는 기본적으로 useCallback되어 나온다고 생각하면 된다.
// 만약 useState가 아닌 함수를 만들어 전달하게 되면 React.memo는 정상적으로 동작하지 않고 리렌더링 된다. 내가 만든 핸들러 함수는 id를 보장받지 못함
const ControlMenu = React.memo(({value, onChange, optionList}) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
  )
});
```

필터를 적용할때 일기 아이템들이 리렌더링 된다.

```js
// DiaryItem.js

export default React.memo(DiaryItem);
```

일기를 수정할때 텍스트를 변경하는데 그 외의 컴포넌트들이 리렌더링 된다.

```js
// EmotionItem.js
// !! useState나 useCallback로 묶지 않은 함수는 기본적으로 리렌더링 된다.

export default React.memo(EmotionItem);
```

```js
// DiaryEditor.js
// 감정을 클릭했을때 감정 값을 가져오는 함수
const handleClickEmote = useCallback((emotion) => {
  setEmotion(emotion);
}, []);
```

### 중요! 함수호출문에 마우스를 오버하고 Ctrl + click를 하면 함수의 선언부로 이동한다.

# 배포 준비 & 프로젝트 빌드하기

```js
// Diary.js

// 각 페이지 title의 텍스트를 바꿀 수 있다.
useEffect(() => {
  const titleElement = document.getElementsByTagName('title')[0];
  titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
}, []);
```

배포를 하기 위해 코드의 용량을 압축하는 것을 빌드라고 한다.

package.json의 "scripts"에서 build를 확인할 수 있다.

```
npm run build
```

build에 성공하면 build 폴더가 생성된다.

npm install -g serve를 설치하고

serve -s build명령어를 입력하면 로컬에서 배포할 수 있다.

```
npm install -g serve
serve -s build
```
```
serve -s build 권한 설정 에러가 발생할 수도 있다. Windows PowerShell에 접속하여 
get-ExecutionPolicy로 권한 확인

(권한 상태값)
Restricted : default설정값으로, 스크립트 파일을 실행할 수 없습니다.
AllSigned : 신뢰할 수 있는(서명된) 스크립트 파일만 실행할 수 있습니다.
RemoteSigned : 로컬에서 본인이 생성한 스크립트와, 신뢰할 수 있는(서명된) 스크립트 파일 실행할 수 있습니다.
Unrestricted : 모든 스크립트 실행가능
ByPass : 경고/차단 없이 모든 것을 실행가능하도록함
Undefined : 권한을 설정하지 않겠음

Set-ExecutionPolicy RemoteSigned -> y 를 통해 권한을 변경하면 된다.
```

빌드를 다시 하려면 npm run build를 다시 입력하면 된다.

```js
// App.js
useEffect(() => {
  const localData = localStorage.getItem('diary');
  if(localData) {
    const diaryList = JSON.parse(localData).sort(
      (a, b) => parseInt(b.id) - parseInt(a.id)
    );
    // diaryList.length가 빈배열 즉 0이 아닐때만 수행할 수 있도록 로직을 변경했다. 안그러면 에러 발생
    if(diaryList.length >= 1) {
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({type: "INIT", data: diaryList});
    }
  }
}, []);
```