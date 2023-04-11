# 특징

- useInput 커스텀 훅 사용
- baseUrl: axios의 기본 설정으로 중복 최소화
- /todo 페이지 요청 후 바로 이탈 시 조회 데이터 요청 취소
- /todo 페이지에서 추가 버튼을 계속 클릭하거나, 엔터를 칠 때 생기는 무한 등록 요청 현상 방지
- 응답 데이터를 기다리는 동안 및 렌더링을 기다리는 동안 로딩 화면 출력
- useCallback, React.memo, useMemo를 사용한 성능 향상
- useReducer, Context를 통한 전역 상태 관리
