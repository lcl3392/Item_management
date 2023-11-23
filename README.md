## Management
- MariaDB에서 자동차, 물품, 고객 데이터를 가져와 목록을 표시하고 관리하는 React 애플리케이션
- 데이터 추가, 수정, 삭제, 검색 하는 기능을 제공하며, MUI Data Grid를 사용하여 데이터를 효과적으로 표시합니다.

## Tech Stack
Spring Boot, Spring, Java, React, MariaDB, MUI, Postman 

***
## code 설명 

## 로그인 화면
![로그인](https://github.com/lcl3392/Item_management/assets/133613544/af93e2f0-551c-4dd8-8e9f-1ce55d1259f0)
- 사용자의 로그인, 로그아웃 상태에 따라 UI를 동적으로 제어하고, 사용자와의 상호작용에 따라 메인 화면을 표시합니다.

- useState를 사용한 상태 변수
  + user: 사용자의 입력값을 관리하는 객체(username과 password를 갖음).
  + isAuthenticated: 사용자의 로그인 상태를 나타내는 상태 변수.
  + open: Snackbar 표시 여부를 제어하는 상태 변수.
    
 ```
const [user, setUser] = useState({
    username: '', 
    password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
```
***
- handleChange 함수
  + 입력 폼의 값이 변경될 때 호출되는 이벤트 핸들러.
  + setUser 함수를 사용하여 user 상태를 업데이트.
    
 ```
const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
  }
```
***
- login 함수
  + 사용자의 입력값을 확인하고, 비어 있을 경우 Snackbar를 열어 사용자에게 경고를 표시.
  + 서버에 로그인 요청을 보내고, 서버 응답에서 받은 JWT 토큰을 세션 스토리지에 저장.
  + 토큰이 없으면 인증 실패로 간주하고 Snackbar를 연다.
    
 ```
const login = () => {
    if (!user.username || !user.password) {
        // 사용자 이름 또는 암호 중 하나라도 비어 있을 때 로그인 시도 방지
        setOpen(true);
        return;
      }
      
    fetch(SERVER_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => {
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
      else {
        setOpen(true);
      }
    })
    .catch(err => console.error(err))
  }
```
***
- useEffect를 사용한 초기 인증 상태 확인
  + 컴포넌트가 로드될 때 실행되는 useEffect 훅을 사용하여 초기 인증 상태를 확인.
  + 세션 스토리지에 JWT 토큰이 있으면 인증 상태를 true로 변경하여 로그인 상태를 유지.
    
 ```
useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setAuth(true);
    }
  }, []);
```

***
## 메인 화면_1 (기능 설명)
![관리_메인1](https://github.com/lcl3392/Item_management/assets/133613544/06b3f717-b18d-4da8-b447-166604349981)
1. **MenuBar** : 사용자가 메뉴를 선택할 때마다 해당하는 컴포넌트를 동적으로 렌더링하여 유연하고 확장 가능한 UI를 화면에 보여줍니다.
2. **엑셀 저장**: 사용자가 테이블 데이터를 CSV나 Excel과 같은 형식으로 내보내는 기능을 제공합니다.
3. **검색**: 사용자가 검색어를 입력할 때마다 해당 검색어를 기반으로 제품 데이터를 가져오는 검색 기능을 설정합니다.
4. **품목 추가**: 새로운 자동차를 서버에 추가하고, 성공 시 자동으로 업데이트된 자동차 목록을 다시 가져와 보여줍니다.
5. **품목 수정:** 자동차 정보를 업데이트하고, 성공 시 자동으로 업데이트된 자동차 목록을 다시 가져와 보여줍니다.
6. **품목 삭제**: 사용자의 확인에 따라 자동차 정보를 삭제하고, 삭제 성공 시 자동으로 업데이트된 자동차 목록을 보여줍니다.
7. **로그아웃**: 사용자의 확인에 따라 세션 스토리지에서 토큰을 제거하고, 그에 따라 인증 상태를 업데이트하여 사용자를 로그아웃 상태로 만듭니다.

***
## 메인 화면_2 (기능 설명)
![관리_메인2](https://github.com/lcl3392/Item_management/assets/133613544/7ff6c9e5-a325-4ecc-8aff-71c9d525e6c9)
1. 엑셀 저장: 사용자가 테이블 데이터를 CSV나 Excel과 같은 형식으로 내보내는 기능을 제공합니다.
2. 정보 표시: 아이콘 클릭시 information 목록에 저장된 고객 정보가 표시되어 보여집니다.
3. 품목 수정: 고객 정보를 업데이트하고, 성공 시 자동으로 업데이트된 고객 목록을 다시 가져와 보여줍니다.
4. 품목 삭제: 사용자의 확인에 따라 고객 정보를 삭제하고, 삭제 성공 시 자동으로 업데이트된 고객 목록을 보여줍니다.
5. 텍스트필드: 사용자의 이름, 성별, 연락처, 주소를 입력받아 보여줍니다.
6. 취소: 취소 버튼 클릭시 텍스트 필드가 리셋되어 보여줍니다.
7. 저장: 저장 버튼 클릭시 테이블 목록에 저장되어 보여줍니다.

***
## MenuBar 
![관리_메뉴바](https://github.com/lcl3392/Item_management/assets/133613544/088d204f-54d8-4b5b-ba2e-60bac6568007)
-이 컴포넌트는 트리 형식의 메뉴를 생성하고, 각 메뉴 아이템을 클릭했을 때 해당 내용을 렌더링합니다.
1. **useState**
    - **`const [selectedNode, setSelectedNode] = useState(null);`**: **`selectedNode`**라는 상태 변수를 생성하고, 초기 값은 **`null`**로 설정합니다. 이 변수는 현재 선택된 메뉴 아이템을 추적합니다.
2. **handleNodeClick 함수**
    - **`const handleNodeClick = (nodeId) => { setSelectedNode(nodeId); };`**: 메뉴 아이템을 클릭할 때 호출되는 함수입니다. 클릭된 아이템의 **`nodeId`**를 받아와서 **`setSelectedNode`** 함수를 통해 **`selectedNode`** 상태를 업데이트합니다.
3. **렌더링**
    - **`<div>`**: 전체 컴포넌트를 감싸는 div 요소입니다.
    - **`<TreeView>`**: MUI(TreeView)를 사용하여 트리 형식의 메뉴를 생성합니다. **`defaultCollapseIcon`**과 **`defaultExpandIcon`**은 트리의 아이콘 모양을 지정합니다.
    - **`<TreeItem>`**: 각 트리 아이템을 정의합니다. **`nodeId`**는 각 아이템의 고유한 식별자이며, **`label`**은 표시될 텍스트입니다. 클릭 이벤트가 발생하면 **`handleNodeClick`** 함수를 호출하여 선택된 노드를 업데이트합니다.
    - **`{selectedNode === "carlist" && <Carlist />}`**: **`selectedNode`**가 "carlist"일 때, **`Carlist`** 컴포넌트를 렌더링합니다. 이는 선택된 메뉴 아이템에 따라 해당하는 컴포넌트를 동적으로 렌더링하는 부분입니다.
    - **`{selectedNode === "productlist" && <Productlist />}`**와 **`{selectedNode === "test02" && <Test02 />}`**도 마찬가지로 선택된 아이템에 따라 다른 컴포넌트를 렌더링합니다.

***
## 검색
![관리_검색](https://github.com/lcl3392/Item_management/assets/133613544/80d35b8c-6169-46ed-8048-9b8cbca9d4fc)
1. **상태(State) 정의: `const [searchTerm, setSearchTerm] = useState('');`**: 빈 문자열을 초기값으로 가지는 **`searchTerm`** 상태를 선언합니다. 이 상태는 자동차 목록을 검색하는 데 사용됩니다.
2. **`useEffect`를 이용한 자동차 목록 조회:** 
- **`useEffect`** 훅을 사용하여 컴포넌트가 마운트될 때와 **`searchTerm`**이 변경될 때마다 **`fetchCars`** 함수가 호출되도록 설정했습니다.
- **`fetchCars`** 함수는 API에서 자동차 목록을 가져와서 상태인 **`cars`**를 업데이트합니다.
3. **`fetchCars` 함수: `fetchCars`** 함수는 **`searchTerm`**이 존재하면 검색어를 포함하여 API에 요청하고, 그렇지 않으면 모든 자동차를 가져오는 요청을 보냅니다.
4. **검색어 입력 필드:** 검색어가 변경될 때마다 **`onChange`** 핸들러를 통해 **`setSearchTerm`** 함수를 호출하여 **`searchTerm`** 상태를 업데이트합니다.

***   
## 품목 추가
![관리_추가1](https://github.com/lcl3392/Item_management/assets/133613544/a73158fd-dc4e-4e16-a778-c8d964b438f2)
![관리_추가2](https://github.com/lcl3392/Item_management/assets/133613544/b858aa30-b3c3-481e-9560-836d0ebd5ab4)
1. **토큰 가져오기:** 현재 세션에서 JWT 토큰을 가져와 **`token`** 상수에 저장합니다.
2. **POST 요청 보내기:** **`fetch`** 함수를 사용하여 서버에 POST 요청을 보냅니다.
    - **`method: 'POST'`**: POST 메서드를 사용합니다.
    - **`headers`**: 요청 헤더에는 JSON 형식의 데이터를 전송할 것이고, 그리고 JWT 토큰을 인증에 사용합니다.
    - **`body: JSON.stringify(car)`**: 자동차 정보를 JSON 문자열로 변환하여 요청의 본문에 포함합니다.
3. **응답 확인:** 서버로부터의 응답을 확인합니다.
    - **`response.ok`**: HTTP 응답 코드가 200번대(성공)인지 확인합니다.
    - 성공하면 **`fetchCars`** 함수를 호출하여 자동차 목록을 갱신합니다.
    - 실패하면 경고 메시지를 띄웁니다.
4. **에러 처리:** 네트워크 오류 등의 예외 상황이 발생하면 콘솔에 에러를 출력합니다.이렇게 구성된 **`addCar`** 함수는 새로운 자동차를 서버에 추가하고, 성공 시 자동으로 업데이트된 자동차 목록을 다시 가져옵니다.

***
## 품목 수정
![관리_수정1](https://github.com/lcl3392/Item_management/assets/133613544/41b49ec2-50b9-4354-b3f4-be7745613532)
![관리_수정2](https://github.com/lcl3392/Item_management/assets/133613544/1029ca65-849a-4da8-8ded-a1d747072904)
1. **토큰 가져오기:** 현재 세션에서 JWT 토큰을 가져와 **`token`** 상수에 저장합니다.
2. **PUT 요청 보내기:** **`fetch`** 함수를 사용하여 서버에 PUT 요청을 보냅니다.
    - **`method: 'PUT'`**: PUT 메서드를 사용하여 업데이트 요청을 보냅니다.
    - **`headers`**: 요청 헤더에는 JSON 형식의 데이터를 전송할 것이고, 그리고 JWT 토큰을 인증에 사용합니다.
    - **`body: JSON.stringify(car)`**: 자동차 정보를 JSON 문자열로 변환하여 요청의 본문에 포함합니다.
3. **응답 확인:** 서버로부터의 응답을 확인합니다.
    - **`response.ok`**: HTTP 응답 코드가 200번대(성공)인지 확인합니다.
    - 성공하면 **`fetchCars`** 함수를 호출하여 자동차 목록을 갱신합니다.
    - 실패하면 경고 메시지를 띄웁니다.
4. **에러 처리:** 네트워크 오류 등의 예외 상황이 발생하면 콘솔에 에러를 출력합니다.이렇게 구성된 **`updateCar`** 함수는 자동차 정보를 업데이트하고, 성공 시 자동으로 업데이트된 자동차 목록을 다시 가져옵니다.

***
## 품목 삭제
![관리_삭제1](https://github.com/lcl3392/Item_management/assets/133613544/e957f048-45aa-40ed-973e-e7afd52f88cb)
![관리_삭제2](https://github.com/lcl3392/Item_management/assets/133613544/8d478ec6-bbab-4220-8df8-eb2492eb8fcf)
1. **사용자 확인 대화상자 표시:** **`window.confirm`**을 사용하여 사용자에게 "삭제하시겠습니까?"라는 확인 대화상자를 띄웁니다.
2. **토큰 가져오기:** 현재 세션에서 JWT 토큰을 가져와 **`token`** 상수에 저장합니다.
3. **DELETE 요청 보내기:** **`fetch`** 함수를 사용하여 서버에 DELETE 요청을 보냅니다.
    - **`method: 'DELETE'`**: DELETE 메서드를 사용하여 삭제 요청을 보냅니다.
    - **`headers: { 'Authorization' : token }`**: 요청 헤더에는 JWT 토큰을 포함시켜 인증합니다.
4. **응답 확인:** 서버로부터의 응답을 확인합니다.
    - **`response.ok`**: HTTP 응답 코드가 200번대(성공)인지 확인합니다.
    - 성공하면 자동차 목록을 다시 가져오고, 사용자에게 성공 메시지를 보여줍니다.
    - 실패하면 경고 메시지를 띄웁니다.
5. **에러 처리:** 네트워크 오류 등의 예외 상황이 발생하면 콘솔에 에러를 출력합니다. 이렇게 구성된 **`onDelClick`** 함수는 사용자의 확인에 따라 자동차 정보를 삭제하고, 삭제 성공 시 자동으로 업데이트된 자동차 목록을 다시 가져옵니다.

***
## 로그아웃
![로그아웃](https://github.com/lcl3392/Item_management/assets/133613544/6503a58a-250e-460b-b9f0-e8f470f0c227)
- 로그아웃 함수는 사용자의 확인에 따라 세션 스토리지에서 토큰을 제거하고, 그에 따라 인증 상태를 업데이트하여 사용자를 로그아웃 상태로 만듭니다.
1. **로그아웃 확인 대화상자 표시:**
    - **`window.confirm("로그아웃하시겠습니까?")`**: 사용자에게 "로그아웃하시겠습니까?"라는 확인 대화상자를 표시합니다.
    - 사용자가 확인을 선택하면 다음 단계로 진행됩니다.
2. **토큰 제거 및 상태 업데이트:**
    - **`sessionStorage.removeItem("jwt")`**: 세션 스토리지에서 JWT 토큰을 제거합니다.
    - **`setAuth(false)`**: 컴포넌트에서 사용하는 **`setAuth`** 함수를 호출하여 **`isAuthenticated`** 상태 값을 false로 변경합니다.
    - 이로써 사용자는 로그아웃 상태로 전환됩니다.
  

