import axios from 'axios'
import { Environment } from '../constants/environment'

/**
 * axios config
 */
if (Environment.REACT_APP_API_DNS) {
  axios.defaults.baseURL = Environment.REACT_APP_API_DNS
}
