import React from "react";

function ColourCodes(emotion) {
  const emotionList = [
    "Joy",
    "Trust",
    "Fear",
    "Surprise",
    "Sadness",
    "Disgust",
    "Anger",
    "Anticipation"
  ];

  console.log("emotion1: " + emotion["emotion"]);

  const items = emotionList.map((item, index) => {
    if (emotion["emotion"] === item) {
      return (
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            width: "95px",
            background: "Lightgreen"
          }}
        >
          <p style={{ color: "black" }}>{item}</p>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            width: "95px",
            background: "Lavender"
          }}
        >
          <p style={{ color: "thistle" }}>{item}</p>
        </div>
      );
    }
  });
  return <div style={{ display: "inline-block" }}>{items}</div>;
}

function NumberList(props) {
  const listItems = props["data"].map((item, index) => {
    if (index > 0) {
      return (
        <div
          style={{ height: "auto", background: "blue", margin: "1%" }}
          key={index}
        >
          <div
            style={{
              float: "left",
              display: "inline-block",
              width: "50%",
              background: "GhostWhite"
            }}
          >
            <div style={{ textAlign: "right", paddingRight: "5px" }}>
              <h1>{item[0]}</h1>
              <h3>{item[2]}</h3>
              <ColourCodes emotion={item[4]} />
            </div>
          </div>
          <div
            style={{
              float: "right",
              display: "inline-block",
              width: "50%",
              background: "GhostWhite"
            }}
          >
            <div style={{ textAlign: "left", paddingLeft: "5px" }}>
              <h1>{item[3]}</h1>
              <h3>{item[5]}</h3>
              <ColourCodes emotion={item[4]} />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  });
  return <div>{listItems}</div>;
}

class TabularView1 extends React.Component {
  render() {
    return (
      <div style={{ height: "auto", border: "1px solid green" }}>
        <NumberList data={this.props.data} />
      </div>
    );
  }
}

function Row(props) {
    const emotionList = [
        "Joy",
        "Trust",
        "Fear",
        "Surprise",
        "Sadness",
        "Disgust",
        "Anger",
        "Anticipation"
    ]

    const emotionColourCodes = {
        "Joy": { backgroundColor: "yellow", color: "yellow" },
        "Trust": { backgroundColor: "green", color: "green" },
        "Fear": { backgroundColor: "violet", color: "violet" },
        "Surprise": { backgroundColor: "lightblue", color: "lightblue" },
        "Sadness": { backgroundColor: "blue", color: "blue" },
        "Disgust": { backgroundColor: "purple", color: "purple" },
        "Anger": { backgroundColor: "red", color: "red" },
        "Anticipation": { backgroundColor: "amber", color: "amber" }
    }

    const rowStyle = 
        props.leftColumn 
            ? { float: "left", display: "inline-block, table", width: "50%" } 
            : { float: "right", display: "inline-block, table", width: "50%" }
    const paneStyle = 
        props.leftColumn 
            ? { float: "right", paddingRight: "10px" } 
            : { float: "left", paddingRight: "10px" }
    const statementStyle = 
        props.leftColumn 
            ? { float: "right" } 
            : { float: "left" }

    const min = 0.0
    const max = 1.0
    const range = max - min
    const percentage = ((Math.abs(props.sentimentScore) - min) / range) * 100

    const lperc = (props.sentimentScore > 0.0) ? "0%" : percentage + "%"
    const rperc = (props.sentimentScore > 0.0) ? percentage + "%" : "0%"

    const row = <div style={rowStyle} >
        <div style={paneStyle}>
            <div class="progress-bar">
                <div style={{float: "left", display: "inline-block", width: "50%"}}>
                    <span class="progress-bar-fill" style={{ width: lperc, backgroundColor: "smoke", display: "block", float: "right", backgroundColor: "orange" }}></span>
                </div>
                <div style={{float: "right", display: "inline-block", width: "50%"}}>
                    <span class="progress-bar-fill" style={{ width: rperc, backgroundColor: "smoke" }}></span>
                </div>
            </div>
            <table style={{ textAlign: "center", tableLayout: "fixed", border: "1px solid lightgrey", width: "250px" }}>
                <tr>
                    {
                        emotionList.map((item, index) => {
                            if (props.emotion === item) {
                                return <td class="emotionIndicator"><p  style={{ color: "#181818" }}><b>{item}</b></p></td>
                            }
                            else {
                                return <td class="emotionIndicator"><p style={{ color: "grey" }}>{item}</p></td>
                            }
                        })
                    }
                </tr>
                <tr>
                    {
                        emotionList.map((item, index) => {
                            if (props.emotion === item) {
                                return <td class="emotionIndicator"><p style={emotionColourCodes[props.emotion]}><b>O</b></p></td>
                            }
                            else {
                                return <td class="emotionIndicator"><p style={{ color: "linen" }}>O</p></td>
                            }
                        })
                    }
                </tr>
            </table>
            <br></br>
        </div>
        <div style={statementStyle}>
            <h3 style={{ color: "#282828", marginLeft: "15px"}}>{props.statement}</h3>
        </div>
    </div>

    return row
}

function RenderList(props) {

    const listItems = props["data"].map((item, index) => {
        if (index > 0) {
            return <div>
                <Row leftColumn={true} emotion={item[1]} sentimentScore={item[2]} statement={item[0] + ", " + item[2]}/>
                <Row leftColumn={false} emotion={item[4]} sentimentScore={item[5]} statement={item[3] + ", " + item[5]}/>
            </div>
        }
        else {
            return null;
        }
    })

    return listItems
}

class TabularView extends React.Component {
    render() {
        return (
            <div style={{ height: "auto", background: "blue", margin: "1%" }}>
                <RenderList data={this.props.data}/>
            </div>
          )
    }
}
export default TabularView;
