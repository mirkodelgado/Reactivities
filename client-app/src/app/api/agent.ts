import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IEmployee } from '../models/employee';

axios.defaults.baseURL = 'http://localhost:5000/api';

 axios.interceptors.response.use(undefined, error => {

     if (error.message === 'Network Error' && !error.response) {
         toast.error('Network error - make sure API is running!');
     }

     const {status, data, config} = error.response;

     if (status === 404) {
         history.push('/notfound');
     }

     if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
         history.push('/notfound');
     }

     if (status === 500) {
         toast.error('Server error - check the terminal for more info!');
     }

     throw error;
 })

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity)=> requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

const Employees = {
    list: (limit?: number, page?: number) => requests.get(`/employees?limit=${limit}&offset=${page ? page * limit! : 0}`),
    //list: (): Promise<IEmployee[]> => requests.get('/employees'),

    newEmployeeInfo: () => requests.get('/employees/newEmployeeInfo'),

    nextEmployeeNumber: (): Promise<string> => requests.get('/employees/nextEmployeeNumber'),

    details: (number: string) => requests.get(`/employees/${number}`),
    create: (employee: IEmployee) => requests.post('/employees', employee),
    update: (employee: IEmployee)=> requests.put(`/employees/${employee.number}`, employee),
    delete: (number: string) => requests.del(`/employees/${number}`)
}

const Safety = {
    list: () => requests.get('/safety')
}


export default {
    Activities, Employees, Safety
};