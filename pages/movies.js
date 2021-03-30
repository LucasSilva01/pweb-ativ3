import useSWR from 'swr'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Movies(){

    const [procurado, setProcurado] = useState("Superman");
    const [page, setPage] = useState(1)

    const {data} = useSWR(`http://www.omdbapi.com/?apikey=d72bbb8f&s=${procurado}&page=${page}`,fetcher)

    function mostrar(data){
        if(data){
            if(data.Search){
                return(
                    <div>
                        
                {data.Search.map(
                    (m) => <div className = {styles.card}>
                        <center>
                    <br/>Título: {m.Title} <br/>Ano de lançamento:  {m.Year}<br/><img src={m.Poster}></img>
                    </center>
                </div>)}
                
                </div>
                )
            }
        }else{
            return(
                <div className = {styles.container}>
                    <h1>
                        Filme não encontrado, tente outro nome
                    </h1>
                </div>
            )
        }
    }

    function pageRight(){
 
            if(page < 100){
                return (
                    <a className = {styles.buttonSubmit}>
                        <button onClick={() => setPage(page+1)}>
                            Frente
                        </button>
                    </a>
                    
                    )
                }
        }
        function pageLeft(){
 
            if(page > 1){
                return (
                    <a className = {styles.buttonSubmit}>
                        <button onClick={() => setPage(page-1)}>
                            Volta
                            </button>
                    </a>
                    )
                }
        }
    return (
        <div className = {styles.atras}>
                <input
                    className = {styles.code}
                    name="procurado"
                    type="search"
                    placeholder = "Pesquise..."
                    onChange={(e) => setProcurado(e.target.value)}
                />
            <center>
                <h1>Filme: {procurado}</h1>
              
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
