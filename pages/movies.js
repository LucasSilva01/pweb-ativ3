import useSWR from 'swr'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Movies(){
    const [procurado, setProcurado] = useState("Exterminador");

    const {data, error} = useSWR(`http://www.omdbapi.com/?apikey=d72bbb8f&s=${procurado}`,fetcher)
    if (error) {return(
            <div>Falha na requisição...</div>
        )
        }
    if (!data) {
        return (
            <div>
                <center>
                    Loading...
                </center>
            </div>
        )
    }
    
    function mostrar(data){
        if(data){
            if(data.Search){
                return(
                    <div>
                {data.Search.map(
                    (m) => <div className = {styles.card}>

                    <br/>Título: {m.Title} <br/>Ano de lançamento:  {m.Year}<br/><img src={m.Poster}></img>
                </div>)}
                </div>
                )
            }
        }
    }
    return (
        <div>
            <form>
                <input
                    name="procurado"
                    type="text"
                    placeholder = "Pesquise..."
                    onChange={(e) => setProcurado(e.target.value)}
                />
                
            </form>
       

        
            <center>
                <div className = {styles.container}>
                    <h1>Filmes {procurado}</h1>
                        {mostrar(data)}
                </div>
  

             </center>
        </div>
    )
}

async function fetcher(url) {

    const res = await fetch(url)

    const json = await res.json()

    return json

}
