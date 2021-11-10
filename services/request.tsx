import getConfig from 'next/config'
import axios from 'axios';

import cookie from "cookie"


const {publicRuntimeConfig} = getConfig()


const baseUrl = `${publicRuntimeConfig.apiUrl}`

const setHeader = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return config;
  };

export async function createTodo (url: string, data: Record<string, unknown>, base: string = baseUrl ){

    try{
        const response = await axios.post(`${base}${url}`, data, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }


}
export async function getTodo (url: string, base: string = baseUrl ){

    try{
        const response = await axios.get(`${base}${url}`, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }
}


export async function updateSingleTodo (url: string, data: Record<string, unknown>, base: string = baseUrl ){

    try{
        const response = await axios.put(`${base}${url}`, data, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }


}

export async function deleteTodo (url: string, base: string = baseUrl ){

    try{
        const response = await axios.delete(`${base}${url}`, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }
}

export async function changeTodoStatus (url: string, data: Record<string, unknown>, base: string = baseUrl ){

    try{
        const response = await axios.put(`${base}${url}`, data, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }
}
export async function userLogin (url: string, data: Record<string, unknown>, base: string = baseUrl ){

    try{
        const response = await axios.post(`${base}${url}`, data, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }
}
export async function userSignUp (url: string, data: Record<string, unknown>, base: string = baseUrl ){

    try{
        const response = await axios.post(`${base}${url}`, data, setHeader())
        console.log(response)
        return response

    } catch(err){
        console.error(err)
    }
}


export function parseCookies(req: { headers: { cookie: any; }; } | undefined) {
    if (typeof window !== "undefined") {
      return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
    }
  }