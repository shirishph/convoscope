const prep = (convos) => {
    var value
    var dec
    var colour
    var acc
    var counter

    var tabularData = [
        [{
                type: 'string',
                label: 'User - Statement'
            },
            {
                type: 'string',
                label: 'User - Emotion'
            },
            {
                type: 'number',
                label: 'User - VADER score'
            },
            {
                type: 'string',
                label: 'Bot - Statement'
            },
            {
                type: 'string',
                label: 'Bot - Emotion'
            },
            {
                type: 'number',
                label: 'Bot - VADER Score'
            }
        ]
    ]

    var sentimentIntensityData = [
        [
            "x",
            "y",
            {
                type: 'string',
                role: 'tooltip',
                p: {
                    html: true
                }
            },
            {
                role: "style"
            },
            "y",
            {
                type: 'string',
                role: 'tooltip',
                p: {
                    html: true
                }
            },
            {
                role: "style"
            }
        ]
    ]

    var emotionPredictionData = [
        [
            "Sl",
            "User",
            {
                type: 'string',
                role: 'tooltip',
                p: {
                    html: true
                }
            },
            "Bot",
            {
                type: 'string',
                role: 'tooltip',
                p: {
                    html: true
                }
            }
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
        counter += 1

        t_userStatementLabel = element.user
        t_botStatementLabel = element.bot

        t_userStatementScore = element.userStatementScore
        colour = "#000000"
        if (element.userStatementScore < 0.0) {
            value = (element.userStatementScore * 0xFF) / -1.0
            if (value > 0.0) {
                dec = 0xFF - parseInt(value, 10)
                acc = dec.toString(16).padStart(2, '0')
                colour = "#FF" + acc + acc
            }
        } else {
            value = (element.userStatementScore * 0xFF)
            if (value > 0.0) {
                dec = 0xFF - parseInt(value, 10)
                acc = dec.toString(16).padStart(2, '0')
                colour = "#" + acc + acc + "FF"
            }
        }
        t_userBgColour = colour

        t_botStatementScore = element.botStatementScore
        colour = "#000000"
        if (element.botStatementScore < 0.0) {
            value = (element.botStatementScore * 0xFF) / -1.0
            if (value > 0.0) {
                dec = 0xFF - parseInt(value, 10)
                acc = dec.toString(16).padStart(2, '0')
                colour = "#FF" + acc + acc
            }
        } else {
            value = (element.botStatementScore * 0xFF)
            if (value > 0.0) {
                dec = 0xFF - parseInt(value, 10)
                acc = dec.toString(16).padStart(2, '0')
                colour = "#" + acc + acc + "FF"
            }
        }
        t_botBgColour = colour

        tabularData.push([
            t_userStatementLabel,
            element.userEmoKind,
            t_userStatementScore,
            t_botStatementLabel,
            element.botEmoKind,
            t_botStatementScore
        ])

        sentimentIntensityData.push([
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

        emotionPredictionData.push([
            t_userLabel,
            element.userEmoValue,
            combined,
            element.botEmoValue,
            combined
        ])
    })

    return {
        "tabularData": tabularData,
        "sentimentIntensityData": sentimentIntensityData,
        "emotionPredictionData": emotionPredictionData
    }

}

export default prep