import useSWR from 'swr'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Movies(){

    const [procurado, setProcurado] = useState("Exterminador");
    const [page, setPage] = useState(1)

    const {data} = useSWR(`http://www.omdbapi.com/?apikey=d72bbb8f&s=${procurado}&page=${page}`,fetcher)

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

    function pageRight(){
 
            if(page < 100){
                return (
                    <button onClick={() => setPage(page+1)}>Frente</button>
                    )
                }
        }
        function pageLeft(){
 
            if(page > 1){
                return (
                    <button onClick={() => setPage(page-1)}>Volta</button>
                    )
                }
        }
    return (
        <div>
                <input
                    name="procurado"
                    type="search"
                    placeholder = "Pesquise..."
                    onChange={(e) => setProcurado(e.target.value)}
                />
            <center>
                <h1>Digite o nome do filme: {procurado}</h1>
                {pageLeft()}
                {pageRight()}
                
                <div className = {styles.container}>
                    
                    
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
