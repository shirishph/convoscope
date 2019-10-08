import React from 'react'
import './App.css'
import {Chart} from 'react-google-charts'
import { SegmentedControl } from 'segmented-control'

class MyComponent extends React.Component {

    state = {
        tabularData: [],
        vaderData: [],
        plutchikData: [],
        displayMode: 0     // 0=tabular, 1=vader, 2=plutchik
    }

    callAPI() {
        fetch("http://localhost:9090/fetch_convo")
            .then(res => res.json())
            .then(convos => {
                var userLabels = []
                var userStatementScore = []
                var botStatementScore = []
                var userStatementLabel = []
                var botStatementLabel = []
                var userBgColour = []
                var botBgColour = []
                var value
                var dec
                var colour
                var acc
                var counter

                var tabularData = [
                    [
                        {type: 'string', label: 'User - Statement'},
                        {type: 'string', label: 'User - Emotion'},
                        {type: 'number', label: 'User - VADER score'},
                        {type: 'string', label: 'Bot - Statement'},
                        {type: 'string', label: 'Bot - Emotion'},
                        {type: 'number', label: 'Bot - VADER Score'}
                    ]
                ]

                var plutchikData = [
                    [
                        "Sl",
                        "User",
                        {type: 'string', role: 'tooltip', p: {html: true}},
                        "Bot",
                        {type: 'string', role: 'tooltip',p: { html: true }}
                    ]
                ]

                var vaderData = [
                    [
                        "x",
                        "y",
                        { type: 'string', role: 'tooltip', p: { html: true } },
                        {role: "style"},
                        "y",
                        { type: 'string', role: 'tooltip', p: { html: true } },
                        {role: "style"}
                    ]
                ]

                var t_userLabel = ""
                var t_userStatementScore = 0
                var t_userStatementLabel = ""
                var t_userBgColour = ""

                var t_botStatementScore = 0
                var t_botStatementLabel = ""
                var t_botBgColour = ""

                counter = 1
                convos.forEach(element => {
                    t_userLabel = counter
                    userLabels.push(counter)
                    counter += 1

                    t_userStatementLabel = element.user
                    userStatementLabel.push(element.user)

                    t_botStatementLabel = element.bot
                    botStatementLabel.push(element.bot)

                    console.log(">", JSON.stringify(element))

                    t_userStatementScore = element.userStatementScore
                    userStatementScore.push(t_userStatementScore)

                    colour = "#000000"
                    if (element.userStatementScore < 0.0) {
                        value = (element.userStatementScore * 0xFF) / -1.0
                        if (value > 0.0) {
                            dec = 0xFF - parseInt(value, 10)
                            acc = dec.toString(16).padStart(2, '0')
                            // console.log(element.userStatementScore, dec, acc)
                            colour = "#FF" + acc + acc
                            // console.log("colour", colour)
                        }
                    } else {
                        value = (element.userStatementScore * 0xFF)
                        if (value > 0.0) {
                            dec = 0xFF - parseInt(value, 10)
                            acc = dec.toString(16).padStart(2, '0')
                            // console.log(element.userStatementScore, dec, acc)
                            colour = "#" + acc + acc + "FF"
                            // console.log("colour", colour)
                        }
                    }

                    t_userBgColour = colour
                    userBgColour.push(colour)

                    t_botStatementScore = element.botStatementScore
                    botStatementScore.push(t_botStatementScore)

                    colour = "#000000"
                    if (element.botStatementScore < 0.0) {
                        value = (element.botStatementScore * 0xFF) / -1.0
                        if (value > 0.0) {
                            dec = 0xFF - parseInt(value, 10)
                            acc = dec.toString(16).padStart(2, '0')
                            // console.log(element.botStatementScore, dec, acc)
                            colour = "#FF" + acc + acc
                            // console.log("colour", colour)
                        }
                    } else {
                        value = (element.botStatementScore * 0xFF)
                        if (value > 0.0) {
                            dec = 0xFF - parseInt(value, 10)
                            acc = dec.toString(16).padStart(2, '0')
                            // console.log(element.botStatementScore, dec, acc)
                            colour = "#" + acc + acc + "FF"
                            // console.log("colour", colour)
                        }
                    }

                    t_botBgColour = colour
                    botBgColour.push(colour)

                    tabularData.push([
                        t_userStatementLabel,
                        element.userEmoKind,
                        t_userStatementScore,
                        t_botStatementLabel,
                        element.botEmoKind,
                        t_botStatementScore
                    ])

                    //  t_userStatementLabel + " [" + t_userStatementScore + "]",
                    // t_userStatementScore
                    vaderData.push([
                        t_userLabel,
                        (t_userStatementScore === 0 ? {
                            v: 0.05,
                            f: '0'
                        } : t_userStatementScore),
                        "<div style = \"font-family:Verdana, Geneva, Tahoma, sans-serif; padding: 15px 15px 15px 15px; text-align:left\"><small style=\"color: dimgray\">Sentiment Value</small><br><span style=\"font-weight:bold;font-size: 30px;color: #181818;\">" + t_userStatementScore + "</span><br><br><small style=\"color: dimgray\">Statement</small><br><blockquote><h4>" + t_userStatementLabel + "</h4></blockquote></div>",
                        t_userBgColour,
                        (t_botStatementScore === 0 ? {
                            v: 0.05,
                            f: '0'
                        } : t_botStatementScore),
                        "<div style = \"font-family:Verdana, Geneva, Tahoma, sans-serif; padding: 15px 15px 15px 15px; text-align:left\"><small style=\"color: dimgray\">Sentiment Value</small><br><span style=\"font-weight:bold;font-size: 30px;color: #181818;\">" + t_botStatementScore + "</span><br><br><small style=\"color: dimgray\">Statement</small><br><blockquote><h4>" + t_botStatementLabel + "</h4></blockquote></div>",
                        t_botBgColour
                    ])

                    var combined = "<div style = \"font-family:Verdana, Geneva, Tahoma, sans-serif; padding: 15px 15px 15px 15px; text-align:left\"> <small style=\"color: dimgray\">Who</small> <br><span style=\"font-weight:bold;font-size: 15px;\">User</span><br><br><small style=\"color: dimgray\">Emotion</small><br><span style=\"font-weight:bold;font-size: 30px;color: #181818;\">" + element.userEmoKind + "</span><br><br><small style=\"color: dimgray\">Statement</small><br><blockquote><h4 style = \"color: #181818\">" + t_userStatementLabel + "</h4></blockquote><hr><div style = \"font-family:Verdana, Geneva, Tahoma, sans-serif; padding: 15px 15px 15px 15px; text-align:right\"> <small style=\"color: dimgray\">Who</small> <br><span style=\"font-weight:bold;font-size: 15px;\">Bot</span><br><br><small style=\"color: dimgray\">Emotion</small><br><span style=\"font-weight:bold;font-size: 30px;color: #181818\">" + element.botEmoKind + "</span><br><br><small style=\"color: dimgray\">Statement</small><br><blockquote><h4 style = \"color: #181818\">" + t_botStatementLabel + "</h4></blockquote>"

                    plutchikData.push([
                        t_userLabel,
                        element.userEmoValue,
                        combined,
                        element.botEmoValue,
                        combined
                    ])
                })

                return {
                    "tabularData": tabularData,
                    "vaderData": vaderData,
                    "plutchikData": plutchikData
                }
            })
            .then(data => {
                this.setState({
                    tabularData: data["tabularData"],
                    vaderData: data["vaderData"],
                    plutchikData: data["plutchikData"]
                })
            })
            
    }

    componentDidMount() {
        this.callAPI()
    }

    doSomething(newValue) {
        this.setState({
            displayMode: newValue
        })
    }

    render() {
        return (
            <div>
                <table width = "100%" >
                    <tbody>
                    <tr >
                        <td bgcolor = "#303030" >
                            <center >
                                <font size = "10"
                                    face = "impact"
                                    color = "lightgreen" > CONVOSCOPE
                                </font>
                            </center >
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div align = "center" >
                    <SegmentedControl
                        name="oneDisabled"
                        options={[
                            { label: "Tabular", value: "0", default: true },
                            { label: "Sentiment Intensity (VADER)", value: "1" },
                            { label: "Emotion Prediction (Plutchik)", value: "2"}
                        ]}
                        setValue={newValue => this.doSomething(newValue)}
                        style={{ width: 850, color: 'green' }}
                    />
                </div>
                {
                    this.state.displayMode == 0
                    ?
                        <div className = "custom">
                            <Chart
                                chartType = "Table"
                                height = "800px"
                                loader = {<div>Working...</div>}
                                data = {
                                    this.state.tabularData
                                }
                                options={{
                                    showRowNumber: true,
                                }}
                            />
                        </div>
                    :
                        null
                }
                {
                    this.state.displayMode == 1 ?
                        <div className = "custom" >
                            <Chart
                                chartType = "ColumnChart"
                                height = "800px"
                                loader = {<div> Working...</div>}
                                data = {
                                    this.state.vaderData
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
                    :
                        null
                }
                {
                    this.state.displayMode == 2 ?
                        <div className = "custom" >
                            <div className="App">
                                <Chart
                                    chartType="ScatterChart"
                                    height = "800px"
                                    loader={
                                        <div> Working...</div>
                                    }
                                    data={
                                        this.state.plutchikData
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
                    :
                        null
                }
            </div>
        )
    }
}

export default MyComponent;


// Paste this back
