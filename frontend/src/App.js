import React, { useEffect , useState } from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getParties } from './actions/parties'

import Navbar from './components/Navbar';
import PartyCardGroup from './components/PartyCardGroup';
import Form from './components/Form'
import Login from './components/Login';


const App = () => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        dispatch(getParties())
    }, [dispatch, currentId]);

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path='/' element = {<PartyCardGroup currentId = {currentId} setCurrentId = {setCurrentId} />} />
                    <Route path='/create' element = {<Form currentId = {currentId} setCurrentId={setCurrentId} />} />
                    <Route path='/login' element = {<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;