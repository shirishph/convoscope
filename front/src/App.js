import React from 'react'
import './App.css'
import TabularView from './TabularView'
import SentimentIntensityView from './SentimentIntensityView'
import EmotionPredictionView from './EmotionPredictionView'
import HeaderView from './HeaderView'
import prep from './ProcessData'

class App extends React.Component {

    state = {
        tabularData: [],
        sentimentIntensityData: [],
        emotionPredictionData: [],
        displayMode: 0     // 0=tabular, 1=vader, 2=plutchik
    }

    constructor(props) {
        super(props)
        this.updateDisplayMode = this.updateDisplayMode.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:9090/fetch_convo")
            .then(res => res.json())
            .then(convos => {
                return prep(convos)
            })
            .then(data => {
                this.setState({
                    tabularData: data["tabularData"],
                    sentimentIntensityData: data["sentimentIntensityData"],
                    emotionPredictionData: data["emotionPredictionData"]
                })
            })
    }

    updateDisplayMode(newValue) {
        this.setState({
            displayMode: newValue
        })
    }

    render() {
        return (
            <div>
                <HeaderView updateDisplayMode = {this.updateDisplayMode}/>
                {this.state.displayMode == 0 ? <TabularView data = {this.state.tabularData}/> : null}
                {this.state.displayMode == 1 ? <SentimentIntensityView data = {this.state.sentimentIntensityData}/> : null}
                {this.state.displayMode == 2 ? <EmotionPredictionView data = {this.state.emotionPredictionData}/> : null}
            </div>
        )
    }
}

export default App;
