import axios from "axios";
import { useStore } from '@/stores/index'
import { baseUrl } from '@/main'
axios.defaults.baseURL = baseUrl;

let store = useStore();

export function getAuthorInfo() {
    axios({
        method: 'get',
        url: "/user/getAuthorInfo"    
    }).then((resp) => {
        console.log(resp);
    }).catch((err) => {
        console.log(err);
    })
}