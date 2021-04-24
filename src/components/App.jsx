import React, { Component } from 'react'
import Compass from './Compass'
import Resume from './Resume'

import './App.css'
import ForecastDay from './ForecastDay'

export default class App extends Component {

    constructor(props){
        super(props)

        // we declare initial state
        this.state = {
            lastUpdate: null,
            isLoading: true,
            data: null
        }
    }

    fetchData(){

        // we reset loading state and update date
        this.setState({
            lastUpdate: null,
            isLoading: true
        })

        // fetch('/rochelle-17.json')
        fetch('https://www.prevision-meteo.ch/services/json/rochelle-17')
            .then((response) => {
                // return promise
                return response.json()
            })
            .then(data => {
                // we save datas in state and we update the loading state, 
                this.setState({
                    isLoading: false,
                    lastUpdate: Date.now(),
                    data
                })
            })

    }

    componentDidMount(){
        // we call the method fetchData()
        this.fetchData()

        // we call the method fetchData() all 10 seconds
        this.updateTimer = setInterval(() => {
            this.fetchData()
        }, 300000)
    }

    componentWillUnmount(){
        // we clear interval
        clearInterval(this.updateTimer)
    }

    render() {
        return (
            <>
                <header className="card" style={{marginBottom: "1.5rem"}}>

                    <h1>La Rochelle Météo (17) France</h1>

                    {this.state.lastUpdate ?
                        <p>
                            Dernière mise à jour : {' '}
                            {/* we create a string in french format */}
                            {new Date(this.state.lastUpdate).toLocaleTimeString('fr')}
                        </p>
                        : <p>Mise à jour en cours...</p>
                    }

                    {/* <button
                        // disabled button loading
                        disabled={this.state.isLoading}
                        // we class our method then click on button
                        onClick={() => this.fetchData()}
                    >
                        Mettre à jour
                    </button> */}
                </header>

                <main>
                    {this.state.data ? <>
                        <section className="row" style={{marginBottom: "1.5rem"}}>
                            <Resume
                                cityName={this.state.data.city_info.name}
                                country={this.state.data.city_info.country}
                                weekDay={this.state.data.fcst_day_0.day_long}
                                date={this.state.data.current_condition.date}
                                humidity={this.state.data.current_condition.humidity}
                                temperature={this.state.data.current_condition.tmp}
                                condition={this.state.data.current_condition.condition}
                                imgSrc={this.state.data.current_condition.icon_big}
                            />

                            <section className="card">
                                <h2>Vent</h2>
                                <div className="card__content">
                                    {/* wind compass */}
                                    <Compass direction={this.state.data.current_condition.wnd_dir} />
                                    <ul className="card__list">
                                        <li>Direction : {this.state.data.current_condition.wnd_dir}</li>
                                        <li>Vitesse : {this.state.data.current_condition.wnd_spd} km/h</li>
                                        <li>Rafales : {this.state.data.current_condition.wnd_gust}  km/h</li>
                                    </ul>
                                </div>
                            </section>
                        </section>

                        <section className="row forecast">
                            {/* forecast day */}
                            {Array(4).fill(null).map((e, idx) => {
                                const forecast = this.state.data['fcst_day_'+(idx+1)]
                                return <ForecastDay
                                    imgSrc={forecast.icon}
                                    condition={forecast.condition}
                                    weekDay={forecast.day_long}
                                    day={forecast.date.split('.').slice(0, 2).join('/')}
                                    maxTemperature={forecast.tmax}
                                    minTemperature={forecast.tmin}
                                />
                            })}
                        </section>
                    </>
                        : <section className="card">
                            <div className="card__content">Chargement...</div>
                        </section>
                    }
                    <section className="developedBy">
                        <p>Développer par <a href="https://matthieutruche.fr/" target="blank">Matthieu Truche</a></p>
                    </section>
                </main>
            </>
        )
    }
}
