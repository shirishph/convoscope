import React from 'react'
import {Chart} from 'react-google-charts'

class EmotionPredictionView extends React.Component {
    render() {
        return (
            <div className = "custom" >
                <div className="App">
                    <Chart
                        chartType="ScatterChart"
                        height = "800px"
                        loader={
                            <div> Working...</div>
                        }
                        data={
                            this.props.data
                        }
                        options={{
                            tooltip: { isHtml: true },
                            legend: "none",
                            title: "Plutchik labelling",
                            curveType: "function",
                            dataOpacity: 0.3,
                            pointSize: 15,
                            vAxis: {
                                textPosition: 'out',
                                ticks: [
                                    { v: 0, f: 'fear' },
                                    { v: 1, f: 'anger' },
                                    { v: 2, f: 'disgust' },
                                    { v: 3, f: 'sadness' },
                                    { v: 4, f: 'anticipation'},
                                    { v: 5, f: 'surprise' },
                                    { v: 6, f: 'trust' },
                                    { v: 7, f: 'joy' }
                                ],
                                viewWindow: {
                                    labels: false,
                                    min: 0,
                                    max: 8
                                }
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default EmotionPredictionView
