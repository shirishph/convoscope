import React from 'react'
import {SegmentedControl} from 'segmented-control'

class HeaderView extends React.Component {
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
                        setValue={newValue => this.props.updateDisplayMode(newValue)}
                        style={{ width: 850, color: 'green' }}
                    />
                </div>

            </div>
        )
    }
}

export default HeaderView
