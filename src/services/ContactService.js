import axios from "axios";

export class ContactService
{
    static serverUrl = `http://localhost:5129`;
    static errorMessage = null;
    static getAllContacts(){
        try{
            let dataUrl = `${this.serverUrl}/WeatherForecast`;
            //  http://localhost:5129/WeatherForecast
            return axios.get(dataUrl);
        }
        catch(error)
        {
   this.errorMessage = error;
        }
        
    }

    static getContact(id)
    {
        let dataUrl = `${this.serverUrl}/api/Contact/${id}`;
        return axios.get(dataUrl);
    }
    static updateContact(contact,id){
        
        let dataURL = `${this.serverUrl}/api/Contact/${id}`;
        return axios.put(dataURL,contact);
    }
     static getAllGroup()
     {
        let dataURL = `${this.serverUrl}/api/Groups`;
        return axios.get(dataURL);
     }

     static getGroup(id){
        
        let dataURL = `${this.serverUrl}/api/Groups/${id}`;
        return axios.get(dataURL);
    }
    static createContact(contact){
        
        contact.mobile = String(contact.mobile);
        let dataURL = `${this.serverUrl}/api/Contact`;
        console.log("sdsdsd",dataURL)
        
        return axios.post(dataURL,contact);
    }
    static deleteContact(id){
        let dataURL = `${this.serverUrl}/api/Contact/${id}`;
        return axios.delete(dataURL);
    }
}