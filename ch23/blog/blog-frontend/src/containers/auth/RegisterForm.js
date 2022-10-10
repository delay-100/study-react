import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, register } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { check } from '../../modules/user'
import {useNavigate} from 'react-router-dom'

const RegisterForm = () => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const { form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user:user.user,
    }))
    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target
        dispatch(
            changeField({
                form:'register',
                key: name,
                value
            })
        )
    }

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        // 1. onSubmit 이벤트 발생 시
        e.preventDefault();
        const { username, password, passwordConfirm } = form
        // 하나라도 비어있다면
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요')
            return
        }
        // 비밀번호가 일치하지 않는다면
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다')
            dispatch(changeField({from:'register', key:'password',value:''}))
            dispatch(changeField({from:'register', key:'passwordConfirm',value:''}))
             return
        }
        // 2. register 함수에 현재 username과 password를 파라미터로 넣어서 액션을 디스패치 함
        dispatch(register({username, password}))
    }

    // 컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch])

    // 회원가입 성공/실패 처리
    // 결과를 얻었을 때 특정 작업을 하기 위해 useEffect를 사용
    // useEffect에 넣어준 함수는 auth 값 혹은 authError 값 중에서 무엇이 유효한 지에 따라 다른 작업을 함
    useEffect(() => {
        if (authError) {
            // 계정명이 이미 존재할 때
            if(authError.response.status === 409){
                setError('이미 존재하는 계정입니다')
                // console.log(authError)
                return
            }
            // 기타 이유
            setError('회원가입 실패')
            return
        }
        if(auth){
            console.log('회원가입 성공')
            console.log(auth)
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    const navigate = useNavigate()

    // user 값이 잘 설정되었는지 확인
    useEffect(()=> {
        if(user) {
            navigate('/') // 회원이 있으면(회원가입이 되면) 홈 화면으로 이동
            // console.log('check API 성공')
            // console.log(user)
        }
    }, [navigate, user])

    return (
        <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        />
    )
}

export default RegisterForm