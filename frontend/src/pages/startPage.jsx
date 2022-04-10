import React, {useState} from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Datasets from "../components/datasets";
import {Tabs} from "@mui/material";
import EditView from "../components/editView";
import Model from "../components/model";
import SearchForm from "../components/SearchForm";
import MyModal from "../components/UI/MyModal/MyModal";
import Button from "@mui/material/Button";
import Data from "../components/data"
const theme = createTheme({
    palette: {
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

const URL_GET_ID = 'http://127.0.0.1:8000/get_id';

const getIds = () => {
    const dataTable = document.querySelector("#text")
    const result = fetch(URL_GET_ID, {
        method: 'GET',
    })
    result
        .then((response) => {
            console.log(response.json())
            return response.text();
        })
        .then((ids) => {
            dataTable.textContent = `Мы получили следующие id: ${ids}`
        })
        .catch((error) => {
            console.log('error', error);
        })

}
function StartPage() {
    getIds();
    
    return(
        <div className = "idsData">
            <div>
                <Button onClick={() => getIds()} variant="contained" color="success" >Отправить запрос для получения id</Button>
            </div>
            <div >
                <Data />
            </div>
        </div>
    )
}

export default StartPage;