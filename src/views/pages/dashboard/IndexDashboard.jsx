import React, {useEffect, useState} from "react";
import {get} from "lodash";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {FetchGet} from "../../../utils/FetchGet";
import {API_URL} from "../../../utils/FetchApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const IndexDashboard = () => {
    const [dataDashboard, setDataDashboard] = useState();
    useEffect(() => {
        FetchGet(setDataDashboard, API_URL.home)
    }, [])

    const dataDash = get(dataDashboard, 0, ''),
        accepted = get(dataDash, 'attributes.accepted', ''),
        failed = get(dataDash, 'attributes.failed', ''),
        withoutChecking = get(dataDash, 'attributes.withoutChecking', ''),
        total = get(dataDash, 'attributes.total', ''),
        options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Estudiantes aprovados / reprovados",
                    color: "#fff"
                },
            },
        };

    const labels = ['Unidad 1', 'Unidad 2', 'Unidad 3', 'Unidad 4'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Aprovados',
                data: [5, 3, 2, 4],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255,99,132,0.34)',
                borderWidth: 5,
                fill: true
            },
            {
                label: 'Reprovados',
                data: [7, 5, 3, 2],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53,162,235,0.35)',
                borderWidth: 5,
                fill: true
            },
        ],
    };

    return (
        <div>
            <p className="font-open-sans display-6 text-light">Dashboard</p>
            <div className="container">
                <div className="row">

                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card rounded-4 bg-transparent bg-blue p-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="container">
                                            <p className="text-sm mb-0 text-capitalize fw-bold">Aprobados</p>
                                            <h5 className="text-light mb-0">
                                                <span className="fw-bold me-2">{accepted}</span>
                                                <span className="text-success text-sm font-weight-bolder">alumnos</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <i className="fa-solid fa-user-check fa-2x bg-success text-dark p-2 rounded"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card rounded-4 bg-transparent bg-blue p-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="container">
                                            <p className="text-sm mb-0 text-capitalize fw-bold">Reprobados</p>
                                            <h5 className="text-light mb-0">
                                            <span className="fw-bold me-2">{failed}</span>
                                                <span className="text-danger text-sm">alumnos</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <i className="fa-solid fa-user-xmark fa-2x bg-danger text-dark p-2 rounded"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card rounded-4 bg-transparent bg-blue p-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="container">
                                            <p className="text-sm mb-0 text-capitalize fw-bold">Sin nota</p>
                                            <h5 className="text-light mb-0">
                                            <span className="fw-bold me-2">{withoutChecking}</span>
                                                <span className="text-warning text-sm ">alumnos</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <i className="fa-solid fa-user-xmark fa-2x bg-warning text-dark p-2 rounded"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card rounded-4 bg-transparent bg-blue p-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="container">
                                            <p className="text-sm mb-0 text-capitalize fw-bold">Total</p>
                                            <h5 className="text-light mb-0">
                                            <span
                                                className="fw-bold me-2">{total}</span>
                                                <span
                                                    className="text-info text-sm">alumnos</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <i className="fa-solid fa-user-xmark fa-2x bg-info text-dark p-2 rounded"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto mt-3">
                <Line
                    options={options}
                    data={data}
                />
            </div>
        </div>
    )
}
export default IndexDashboard
