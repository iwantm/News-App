import axios from 'axios';
const API = 'http://localhost:8000';

export default class Feeds {


    getFeeds(){
        const url = `${API}/api/feeds/`;
        return axios.get(url).then(response => response.data);
        
    }
    
    addFeed(feed){
        const url = `${API}/api/feeds/`;
        return axios.post(url,feed);
    }
}