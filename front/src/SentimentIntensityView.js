import React from 'react'
import {Chart} from 'react-google-charts'

class SentimentIntensityView extends React.Component {
    render() {
        return (
            <div className = "custom" >
                <Chart
                    chartType = "ColumnChart"
                    height = "800px"
                    loader = {<div> Working...</div>}
                    data = {
                        this.props.data
                    }
                    options = {
                        {
                        tooltip: { isHtml: true },
                        title: 'VADER scores',
                        legend: "none",
                        vAxis: {
                            viewWindow: {
                                min: -1,
                                max: 1
                            }
                        }
                    }
                }
                />
            </div>
        )
    }
}

export default SentimentIntensityView
