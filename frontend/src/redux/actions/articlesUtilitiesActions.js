import axios from "axios"
const HOST = "http://localhost:4000"

const articlesUtilitiesActions = {
    getAllArticlesUtilities: () => {
        return async () => {
            try {
                let response = await axios.get(`${HOST}/api/utils`)
                return {success: true, response: response.data.response}
            } catch (e){
                return {success: false, error: e.message}
            }
        }
    }
}
export default articlesUtilitiesActions