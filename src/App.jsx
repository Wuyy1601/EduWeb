import MyHeader from '@components/Header/Header'

import MainLayout from './components/Layout/Layout'
import MyFooter from '@components/Footer/Footer'
import HomePage from '@components/HomePage/HomePage'
import LoadingPage from '@components/LoadingPage/LoadingPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routers from '@/routers/routers'
import { Suspense } from 'react'

function App() {

    return <>
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    {
                        routers.map((item, index) => {
                            return (
                                <Route path={item.path}
                                    element={<item.component />}
                                    key={index} />);
                        })
                    }
                </Routes>
            </Suspense>
        </BrowserRouter>

    </>
}

export default App
