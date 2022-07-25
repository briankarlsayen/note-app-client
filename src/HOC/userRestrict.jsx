import instance from '../axios'
import {useNavigate} from 'react-router-dom'


const userRestrict = WrappedComponent => (props) => {
  const navigate = useNavigate()
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if(!token) navigate('/app/login')
      config.headers.Authorization = localStorage.getItem('token');
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (config) => {
      return config
    },
    (error) => {
      console.log('res1', error)
      if(error.response.status === 401) navigate('/app/login')
      return Promise.reject(error)
    }
  )

  return(
    <>
      <WrappedComponent {...props} />
    </>
  )
}

export default userRestrict