import React, {useState} from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Datasets from "../components/datasets";
import {Tabs} from "@mui/material";
import EditView from "../components/editView";
import Model from "../components/model";
import SearchForm from "../components/SearchForm";
import MyModal from "../components/UI/MyModal/MyModal";
import Button from "@mui/material/Button";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});
function MainPage() {
    //const [value, setValue] = useState('ТЕКСТ В ИНПУТЕ')
    const [modal, setModal] = useState(false)
    const createRequest = () => {
        setModal(false)
    }
    return(
        <div className="App">

            <div className="side_panel">
            <Button onClick={() => setModal(true)} variant="contained" color="success" >
                Отправить запрос
            </Button>
            <MyModal visible={modal} setVisible={setModal}>
                <SearchForm create={createRequest}/>
            </MyModal>
                <Datasets/>
                <Tabs/>
                <EditView/>
            </div>
                <div className="main_action">
                <Model/>
                </div>
        </div>
    )
}

export default MainPage;