import React from "react";
import {useNavigate, Outlet} from 'react-router-dom'
import {ValidateLoggedUser} from '../../../utils/validateLoggedUser'
import {IndexNavbar} from "../../../component/common/navbar/IndexNavbar";


const IndexHome = () => {
    let navigate = useNavigate();
    const name = localStorage.getItem('name');
    React.useEffect(() => {
        ValidateLoggedUser(navigate);
    }, [navigate])
    return (
        <>
            <IndexNavbar name={name}/>
            <main className="mt-5 pt-5 z-index-3">
                <div className="container-fluid col-12">
                    <div className='bg-blue page-main'>
                        <Outlet/>
                    </div>
                </div>
            </main>
        </>
    )
}
export default IndexHome
