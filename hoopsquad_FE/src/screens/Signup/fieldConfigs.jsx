const fieldConfigs = {
  email: {
    placeholder: '이메일을 적어주세요',
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    alert: '* 올바른 이메일 형식이 아닙니다',
  },
  password: {
    placeholder: '비밀번호를 적어주세요',
    regex: /^[a-zA-Z0-9!@#$%^&*()_-]{6,20}$/,
    alert: '* 영문자, 숫자, 특수문자 포함 6~20자',
  },
  confirm: {
    placeholder: '비밀번호 확인',
    alert: '* 비밀번호가 일치하지 않습니다.',
  },
};

export default fieldConfigs;
