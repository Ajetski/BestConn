import { Injectable } from '@angular/core';
import axios from "axios";
import { AxiosInstance, Method } from 'axios';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }

    async request(url: string, method: Method, data: Object): Promise<{data, status}> {
        try{
            const response = await this.axiosClient.request({
                method,
                url,
                data
            });

            return {
                data: response.data,
                status: response.status
            }
        }
        catch (err) {
            return {
                data: {
                    error: "page not found kapp."
                },
                status: 500
            }
        }
    }

}
